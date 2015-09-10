Meteor.startup(function() {
  App = {};
  var isUserAgentBlacklisted = function() {
    var blacklist = ['PhantomJS', 'Googlebot', 'Bing', 'Yahoo'];

    var userAgent = navigator.userAgent;

    if (!userAgent)
      return false;

    for (var i = 0; i < blacklist.length; i++) {
      if (~userAgent.indexOf(blacklist[i]))
        return true;
    }

    return false;
  };

  _.extend(App, {
    go: function() {
      Menu.show();
    },
    kioskMode: function() {
      return LocalStore.get('kiosk');
    },
    // forceReflow forces DOM to reflow and properly render
    // this is to fix a bug present on iPhone (ios 8.1 - 8.3)
    forceReflow: function($el) {
      $el.css('display', 'none');
      Meteor.setTimeout(function() {
        $el.css('display', 'block');
      }, 0);
    },
    pickerOpenedHax: function() {
      console.log('picker opened');
      var picker = this;
      // hax to force reflow cause ios bugs
      App.forceReflow(picker.$root);

      // hax to force blur off input
      // fixed in next version of pickadate
      // remove when updating
      $(picker.$node).blur();
    },
    pickerClosedHax: function() {
      console.log('picker closed');
      var picker = this;

      // hax to force blur off input
      // fixed in next version of pickadate
      // remove when updating
      $(picker.$node).blur();
    }
  });

  App.helpers = {};

  _.each(App.helpers, function(helper, key) {
    Handlebars.registerHelper(key, helper);
  });

});
