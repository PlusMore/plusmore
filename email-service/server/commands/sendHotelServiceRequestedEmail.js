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
    },
    email: {
      type: String,
      optional: true
    },
    error: {
      type: String,
      optional: true
    },
  });

  Meteor.methods({
    sendHotelServiceRequestedEmail: function(options) {
      options = _.pick(options, [
        'guestName',
        'when',
        'location',
        'shortDescription',
        'hotelName',
        'email',
        'error'
      ]);

      if (options.email === null || options.email === "" || typeof options
        .email === "undefined") {
        options.email =
          'order-service+hotel-info@plusmoretablets.com';
      }

      if (options.error === null || options.error === "" || typeof options
        .error === "undefined") {
        lineOne =
          "This is an informational email and does not require your service\n\n";
      } else {
        lineOne = options.error + "\n\n";
      }

      check(options, commandSchema);

      // for our information
      Email.send({
        to: options.email,
        from: "noreply@plusmoretablets.com",
        subject: "Service Order: {0} | {0} - {1}.\n\n".format(
          options.hotelName, options.location, options.shortDescription
        ),
        text: lineOne +
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
