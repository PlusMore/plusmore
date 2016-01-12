// TODO:
// dan: currently entering the id - need to do tracking on hotel app side?
// USED for tracking: http://182.73.86.222:443/TritonActivityWeb/TritonActivity.aspx?ACTION=STATUS&USER=plusmore&pswd=82296&REQID=10516478
// How do we handle errors ? When a request doesn't get sent or registered or receives an error, yet it gets added on our side?

(function() {

  var initializing = true;

  var remarksOpts = '&REMARKS=';

  Orders.find({
    "hotelId": hotelID
  }).observeChanges({
    added: function(orderId, request) {
      if (!initializing) {

        var room = Rooms.find({
          'hotelId': hotelID,
          'imported': true,
          '_id': request.roomId
        }).fetch()[0];
        var roomId = room.tritonRoomId;

        // what do we do when someone cancels a reservation?

        if (request.type === 'reservation') {
          // email reservations to concierce & adis
          reservationRequestedEmail(orderId,
            'TMNYC-concierge@themarkhotel.com');

          reservationRequestedEmail(orderId,
            'adis@plusmoretablets.com');

          reservationRequestedEmail(orderId,
            'dan@plusmoretablets.com');

          // restaurant@themarkhotel.com
          return false;
        }


        var serviceType = theMarkServiceType(request.service);

        // Luggage and Wake-up call should create email to TMNYC-FrontOffice@TheMarkHotel.com
        // while we get acclimated to the system as a backup
        // Food/Nightlife bookings need to trigger email to concierge so they
        // can add these bookings and confirm with guest after booking is done

        if (serviceType === "26721" || serviceType === "26816") { // wakeUpCall - 26721 // bellService - 26816
          serviceRequestedEmail(orderId,
            theMarkEmail(request.service));

          serviceRequestedEmail(orderId,
            'dan@plusmoretablets.com');

          console.log('end request - sent email to the mark', request.service);
          return false;
        }

        var remarks = 'date ' + request.service.date;

        if (typeof request.service.tip != "undefined") {
          remarks += ', tip ' + request.service.tip;
        }

        if (typeof request.service.options != "undefined") {

          if (typeof request.service.options.transportationType !=
            "undefined") {
            remarks += 'transportation type ' + request.service.options
              .transportationType;
          }

          if (typeof request.service.options.ticketNumber !=
            "undefined") {
            remarks += 'ticket number ' + request.service.options.ticketNumber;
          }
        }

        var call = baseURL + 'REGISTER&LOCATION=' + roomId + '&CALLID=' +
          serviceType + loginOpts + remarksOpts + remarks;

        console.log(call);

        if (inProduction() === true) {
          var response = Meteor.http.call("GET", call).content;
        } else {
          var response = 'not pushing request - in development mode';
        }

        console.log(response);

        if (response.match(/(SUCCESS)/)) {
          console.log("Succesfully added triton request");
          var knowcrossID = response.split("|")[1];

          Orders.update(orderId, {
            $set: {
              knowcrossID: knowcrossID
            }
          });

        } else if (response.match(/(DUPLICATE)/)) {

          //email DUPLICATE
          serviceRequestedEmail(orderId,
            theMarkEmail(request.service),
            'Error - Duplicate request when adding in Triton');

          serviceRequestedEmail(orderId,
            'dan@plusmoretablets.com',
            'Error - Duplicate request when adding in Triton');


          console.log("Error - Duplicate request when adding in Triton");
        } else {

          serviceRequestedEmail(orderId,
            theMarkEmail(request.service),
            'Error in adding Triton request');

          serviceRequestedEmail(orderId,
            'dan@plusmoretablets.com',
            'Error in adding Triton request');


          // email error
          console.log("Error in adding Triton request");
        }


      }
    }
  });
  initializing = false;
})();
