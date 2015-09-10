Meteor.startup(function() {
  analytics.load(Meteor.settings.public.segment);
  analytics.track('PlusMore Started');

  Tracker.autorun(function(c) {
    // waiting for user subscription to load
    if (! Router.current() || ! Router.current().ready())
      return;

    var user = Meteor.user();
    if (! user)
      return;

    analytics.identify(user._id, {
      name: user.profile.firstName + user.profile.lastName,
      email: user.emails[0].address
    });

    c.stop();
  });

  HotelGuestApp.Events.on('order:experience-reservation-requested', function(eventData) {
    var order = Orders.findOne(eventData.orderId);

    if (order) {

      var orderId = order._id;
      var reservation = order.reservation;
      var experience = Experiences.findOne(reservation.experienceId);

      analytics.track('Reservation Requested', {
        name: experience.title
      });

    }
  });

  HotelGuestApp.Events.on('order:hotel-service-requested', function(eventData) {
    var order = Orders.findOne(eventData.orderId);

    // TODO: if notification preference is set, direct to the appropriate channel
    if (order) {

      var orderId = order._id;
      var serviceRequest = order.service;

      var friendlyServiceType = HotelServices.friendlyServiceType(serviceRequest.type);

      analytics.track('Hotel Service Requested', {
        name: friendlyServiceType
      });
    }
  });
});
