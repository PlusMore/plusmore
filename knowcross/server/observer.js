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

        // when we find a new order, we log to console for debugging.
        // console.log(request);
        var room = Rooms.find({
          'hotelId': hotelID,
          'imported': true,
          '_id': request.roomId
        }).fetch()[0];
        var roomId = room.tritonRoomId;
        // console.log(request);
        var serviceType = theMarkServiceType(request.service);

        if (serviceType === "0") {
          console.log('end request - send email');
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
        var response = Meteor.http.call("GET", call).content;
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
          console.log("Error - Duplicate request when adding in Triton");
        } else {
          console.log("Error in adding Triton request");
        }


      }
    }
  });
  initializing = false;
})();
