Meteor.startup(function() {
  var commandSchema = new SimpleSchema({
    guestName: {
      type: String
    },
    when: {
      type: String
    },
    location: {
      type: String
    },
    shortDescription: {
      type: String
    },
    hotelName: {
      type: String
    }
  });

  Meteor.methods({
    sendHotelServiceRequestedEmail: function(options) {
      options = _.pick(options, [
        'guestName',
        'when',
        'location',
        'shortDescription',
        'hotelName',
      ]);

      check(options, commandSchema);

      // for our information
      Email.send({
        to: 'order-service+hotel-info@plusmoretablets.com',
        from: "noreply@plusmoretablets.com",
        subject: "Service Order: {0} | {0} - {1}.\n\n".format(options.hotelName, options.location, options.shortDescription),
        text: "This is an informational email and does not require your service\n\n" +
          "Request Details:\n\n" +
          "Hotel: {0}\n".format(options.hotelName) +
          "Location: {0}\n".format(options.location) +
          "Guest Name: {0}\n".format(options.guestName) +
          "Request Service: {0}\n".format(options.shortDescription) +
          "When: {0}\n".format(options.when)
      });
    }
  });
});
