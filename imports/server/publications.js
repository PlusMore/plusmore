Meteor.publish('arrivalImports', function() {
  return ArrivalImports.find({});
});
