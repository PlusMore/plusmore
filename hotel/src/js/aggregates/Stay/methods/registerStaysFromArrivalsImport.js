Meteor.methods({
  'registerStaysFromOracleXMLArrivalsImport': function(hotel, resArr) {
    check(hotel, Object);
    check(hotel._id, String);
    check(resArr, Array);
    var hotelId = hotel._id;
    var hotelUtcOffset= hotel.utcOffset || -240;

    _.each(resArr, function(res) {
      var hotelArrivalMinutes = (hotel.settings && hotel.settings.arrivalMinutes) || 900;
      var startDateMoment = moment(new Date(res.ARRIVAL)).utcOffset(hotelUtcOffset).add(hotelArrivalMinutes, 'minutes');
      var startDate = startDateMoment._d;

      var hotelCheckoutMinutes = (hotel.settings && hotel.settings.departureMinutes) || 720;
      var endDateMoment = moment(new Date(res.DEPARTURE)).utcOffset(hotelUtcOffset).add(hotel.settings.departureMinutes, 'minutes');
      var endDate = endDateMoment._d;

      var name = res.FULL_NAME.split(',');
      var guestFirstName = name[1];
      var guestLastName = name[0];

      console.log('Import: ', guestLastName, res.ARRIVAL, startDate, res.DEPARTURE, endDate);

      var upcomingStay = Stays.findOne({
        hotelId: hotelId,
        "preReg.guestFirstName": guestFirstName,
        "preReg.guestLastName": guestLastName,
        "preReg.startDate": { "$gte": startDate },
        "preReg.endDate": { "$gte": endDate },
        active: false
      });

      if (! upcomingStay) {
        var stayId = Stays.insert({
          hotelId: hotelId,
          preReg: {
            guestFirstName: guestFirstName,
            guestLastName: guestLastName,
            startDate: startDate,
            endDate: endDate,
          },
          utcOffset: hotelUtcOffset,
          active: false
        });

        console.log('new arrival', name, hotelId, stayId);
      } else {
        console.log('duplicate registration', name, hotelId);
      }

    });
  }
});
