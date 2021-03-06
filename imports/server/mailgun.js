var mailgunAuth = function(api_key, token, timestamp, sig) {
  var msg = timestamp + token;
  return sig === CryptoJS.HmacSHA256(msg, api_key).toString();
};

var processReservations = function(emailDetails, resArr) {
  console.log('Number of reservations to process: ', resArr.length);
  Meteor.call('insertOracleXMLArrivals', emailDetails, resArr, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("Inserted arrivals");
    }
  });
};

JsonRoutes.add("post", "/arrivals/mailgun", function(req, res, next) {
  console.log('INCOMING EMAIL\n===========');
  console.log('From: '+req.body['From']);
  console.log('Subject: '+req.body['Subject']);
  console.log('Date: '+req.body['Date']);

  // for testing
  // if (mailgunAuth(Meteor.settings.mailgun.key, "93ebb35370edd2edc6f44cc4e62f25c12c83a45e622b7822ab", "1433969067", "c3125ef05474e2abf7b6924dcf48dcd65d8eeddd1142b7193c46559eef2691c8")) {
  if (mailgunAuth(Meteor.settings.mailgun.key, req.body.token, req.body.timestamp, req.body.signature)) {

    console.log('Mailgun Auth: true');
    JsonRoutes.sendResult(res, 200);

    var emailDetails = {
      from: req.body['sender'],
      date: new Date(req.body['Date'])
    };

    if (req.body.attachments) {
      console.log('Attachments: true');
      var attachments = JSON.parse(req.body.attachments);

      _.each(attachments, function(attachment) {
        if (attachment["content-type"] === "file/xml") {
          console.log('Found XML attachment: downloading...');
          var file = HTTP.get(attachment.url, {auth: "api:"+Meteor.settings.mailgun.key}),
              fileJson,
              reservationGroupsByDate;

          console.log('Attempting to parse XML...');

          try {
            fileJson = xml2js.parseStringSync(file.content, {explicitArray: false});
            reservationGroupsByDate = fileJson.RES_DETAIL.LIST_G_GROUP_BY1.G_GROUP_BY1;
          } catch (e) {
            console.log('Error parsing XML.');
          }

          console.log('Parsed XML Successfully. Attempting to process reservations...')
          // sometimes it's an array, other times, it's just an object.
          if (Array.isArray(reservationGroupsByDate)) {
            console.log('Multiple Dates found.')
            _.each(reservationGroupsByDate, function(dateGroup) {
              console.log('Processing reservations for ', dateGroup.GROUPBY1_COL);
              processReservations(emailDetails, dateGroup.LIST_G_RESERVATION.G_RESERVATION);
            });
          } else {
            console.log('Single Day import.')
            console.log('Processing reservations for ', reservationGroupsByDate.GROUPBY1_COL);
            processReservations(emailDetails, reservationGroupsByDate.LIST_G_RESERVATION.G_RESERVATION);
          }

        } else {
          console.log('Found non-XML attachment: ignoring...')
        }
      });
    }

  } else {
    console.log('Mailgun Auth: false');
    console.log('Email Rejected\n===========');
    JsonRoutes.sendResult(res, 401, {});

  }
});
