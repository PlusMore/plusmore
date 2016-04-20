Meteor.startup(function() {
  console.log(inProduction());
  emailer = Cluster.discoverConnection('emailService');

  console.log(baseURL + 'LIST_LOCATIONS' + loginOpts);

  //   console.log(roomList);

  if (Rooms.find({
      'hotelId': hotelID,
      imported: true
    }).count() === 0) {
    // Import all rooms if the imported count is 0.
    console.log("IMPORTING ROOM LIST FOR hotel " + hotelID);

    // console.log(baseURL + 'LIST_LOCATIONS' + loginOpts);
    var roomList = urlToJSON(baseURL + 'LIST_LOCATIONS' + loginOpts);

    _.each(roomList[0], function(value, key) {
      if (key !== 0) {
        var room = value[0];

        // console.log(value);

        if (isNumeric(room)) {
          if (Rooms.find({
              hotelId: hotelID,
              name: room
            }).count() === 0) {
            // Only imported if not existing
            Rooms.insert({
              hotelId: hotelID,
              name: room,
              tritonRoomId: value[1],
              imported: true
            });

          }
        }
      }
    });
  }
});
