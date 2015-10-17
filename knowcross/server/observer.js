//TODO: 
// ACTION == STATUS, REQID == 
// UPDATE REQ ID - currently getting "No guest checked in for this room" for all rooms so I am unable to test the response.
// PAT: When we create an order we should put the knowcross request id in the order data, and if it is present, than poll knowcross to get current status information when viewed. 

(function() {

    var initializing = true;

    var loginOpts ='&USER=admin&pswd=';
    
    var remarksOpts='&REMARKS=';

    Orders.find({"hotelId": hotelID}).observeChanges({
        added: function(id, request) {
            if (!initializing) {

                // var roomNumber=Rooms.find({request.roomId});
                // when we find a new order, we log to console for debugging. 
                console.log(request);
                var room=Rooms.find({'hotelId':hotelID,'imported':true,'_id':request.roomId}).fetch()[0];
                var roomId=room.name;
                var serviceType=theMarkServiceType(request.service.type);
                var remarks='date '+request.service.date;
                
                if ( typeof request.service.tip != "undefined"){
                    remarks+=', tip '+request.service.tip;
                }
                
                
                
                if ( typeof request.service.options != "undefined"){
                    
                    if ( typeof request.service.options.transportationType != "undefined"){
                        remarks+=', transportation type '+request.service.options.transportationType;
                    }
                    
                    if ( typeof request.service.options.ticketNumber != "undefined"){
                        remarks+=', ticket number '+request.service.options.ticketNumber;
                    }
                }

                var call=baseURL+'REGISTER&LOCATION='+roomId+'&CALLID='+serviceType+loginOpts+remarksOpts+remarks;
                console.log(call);
                var response=Meteor.http.call("GET", call).content;
                console.log(response);
            }
        }
    });
    initializing = false;
})();
