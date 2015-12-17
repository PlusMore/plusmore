HotelImports = new Meteor.Collection('hotelImports', {
  connection: PlusMore.Services.Imports
});

PlusMore.Services.Imports.subscribe('hotelImports');

ProcessedHotelImports = new Meteor.Collection('processedHotelImports');

var importHasBeenProcessed = function(observation) {
  var processedObservation = ProcessedHotelImports.findOne(observation);
  return !!processedObservation;
};


Meteor.startup(function() {
  HotelImports.find({}).observe({
    added: function(doc) {

      if (!importHasBeenProcessed(doc)) {

        ProcessedHotelImports.insert(doc);

        Meteor.call('registerStayFromMark',
          doc,
          function(err, res) {
            if (err) {
              console.log('error registering stay');
              console.log(err);
            } else {
              console.log('Mark Stay Registered')
            }
          });

      };

    }
  });

});
