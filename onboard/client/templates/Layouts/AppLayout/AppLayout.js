Template.AppLayout.helpers({
  onboarded: function() {
    var user = Meteor.user();

    console.log('Render Onboarded Layout?', user.onboarded);
    return user.onboarded;
  },
  ios: function() {
    return Session.get('iOS-standalone') ? 'ios' : '';
  }
});

Tracker.autorun(function() {
  var user = Meteor.user();

  if (user) {
    Session.set('redirect', true);
  }
});

Meteor.startup(function() {
  Meteor.setTimeout(function() {
    var token = Session.get('Meteor.loginButtons.enrollAccountToken');
    if (! token) {
      Session.set('showManualRedirect', true);
    }
  }, 2000);
});

Template.logo.helpers({
  showManualRedirect: function() {
    var show = Session.get('showManualRedirect');

    return show;
  },
  redirecting: function () {
    return Session.get('redirect');
  }
});

Template.logo.events({
  'tap .js-open-app': function () {
    Session.set('redirect', true);
    Session.set('showManualRedirect', false);
  }
});

Template.redirect.rendered = function () {
  if (navigator.userAgent.toLowerCase().indexOf("android") > -1){
    return document.location = 'https://play.google.com/store/apps/details?id=com.plusmoretablets.device&hl=en';
  } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1){
    return document.location = 'https://itunes.apple.com/us/app/plusmore-hotels/id948792804?mt=8';
  } else {
    return document.location = 'https://device.plusmoretablets.com';
  }
};
