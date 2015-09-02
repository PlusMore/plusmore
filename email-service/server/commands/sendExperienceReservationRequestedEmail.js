Meteor.startup(function(){
  var commandSchema = _.extend(EmailService.Schemas.ExperienceReservationEmail._schema, {
    adminOrderUrl: {
      type: String
    }
  });

  Meteor.methods({
    sendExperienceReservationRequestedEmail: function(options) {
      options = _.pick(options, [
        'title',
        'when',
        'party',
        'venue',
        'guestContactEmail',
        'experienceContactPhone',
        'adminOrderUrl'
      ]);

      Email.send({
        to: 'order-service@plusmoretablets.com',
        from: "noreply@plusmoretablets.com",
        subject: "Reservation Request\n\n",
        text: "Reservation Details:\n\n" +
          "Reservation Details:\n\n" +
          "For: {0}\n".format(options.title) +
          "When: {0}\n".format(options.when) +
          "Name: {0}\n".format(options.party.name) +
          "Party Size: {0}\n".format(options.party.size) +
          "Email: {0}\n".format(options.guestContactEmail) +
          "\nVenue Info\n" +
          "\n{0}".format(options.venue.name) +
          "\n{0} {1}".format(options.venue.address.streetNumber, options.venue.address.streetName) +
          "\n{0}, {1} {2}".format(options.venue.address.city, options.venue.address.stateCode, options.venue.address.zipcode) +
          "\n{0}".format(options.contactPhone || 'N/A') +
          "\nTo respond to this request, click the link below\n\n" +
          options.adminOrderUrl
      });
    }
  });
});
