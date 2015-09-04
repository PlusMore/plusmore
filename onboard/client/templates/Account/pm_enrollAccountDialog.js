var token = Session.setDefault('Meteor.loginButtons.enrollAccountToken', false);
Template.pm_enrollAccountDialog.replaces("_enrollAccountDialog");

Template._enrollAccountDialog.onRendered(function () {
  console.log('enroll account rendered')
  var self = this;
  self.autorun(function () {
    var enrollAccountToken = Session.get('Meteor.loginButtons.enrollAccountToken');
    console.log(enrollAccountToken);
    if (enrollAccountToken) {
      self.subscribe('onboardInformation', enrollAccountToken);
    }
  });
});



Template.pm_enrollAccountDialog.helpers({
  user: function () {
    console.log('user?');
    var token = Session.get('Meteor.loginButtons.enrollAccountToken');
    var users = Meteor.users.find({'services.password.reset.token' : token});
    return users.collection.findOne({'services.password.reset.token' : token})
  }
});

Template._enrollAccountDialog.inheritsHelpersFrom("pm_enrollAccountDialog");
