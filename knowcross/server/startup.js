Meteor.startup(function () {
    
    if (Rooms.find({'hotelId':hotelID,imported:true}).count() === 0) {
        //http://training.knowcross.com/TritonActivityService/TritonActivity.aspx?ACTION=LIST_LOCATIONS&USER=admin&pswd=
        // Import all rooms if the imported count is 0.    
        console.log("IMPORTING ROOM LIST FOR hotel "+hotelID);
        
        var roomList=urlToJSON(baseURL+'LIST_LOCATIONS&USER=admin&pswd=');

        _.each(roomList[0], function(value, key) {
            if (key!==0) {
                var room = value[0];

                if (Rooms.find({
                    hotelId: hotelID,
                    name: room
                }).count() === 0) {
                    // Only imported if not existing
                    Rooms.insert({
                        hotelId: hotelID,
                        name: room,
                        imported: true
                    });
                    
                }
            }
        });

    }

});


