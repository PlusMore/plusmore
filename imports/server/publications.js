Meteor.publish('arrivalImports', function() {
  return ArrivalImports.find({});
});
Meteor.publish('hotelImports', function() {
  return HotelImports.find({});
});
