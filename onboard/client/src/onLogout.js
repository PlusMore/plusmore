Tracker.autorun(function() {
  var user = Meteor.user();

  if (!Meteor.user()) {
    Router.go('/');
  }
});
