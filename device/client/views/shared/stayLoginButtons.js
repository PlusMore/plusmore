Template.stayLoginButtons.onCreated(function() {
  this.lastError = new ReactiveVar(null);
});

Template.stayLoginButtons.helpers({
  errorMessage: function() {
    return Template.instance().lastError.get();
  },
  myLoginSchema: function() {
    return Schema.newLoginSchema;
  },
  getCustomLoginError: function () {
    return Session.get("customLoginError").reason;
  },
  hasLoginError: function () {
    if (typeof Session.get("customLoginError") === "undefined" || Session.get("customLoginError") === "" || Session.get("customLoginError") === null ){
      return false;
    } else {
      return true;
    }
  }
});

Template.stayLoginButtons.rendered = function () {
  Session.set('customLoginError','');
  // debugger;
  var $container = $("#selectLogin");
  // Set up datepicker
  this.$('[name=checkoutDate]').pickadate({
    // today: false,
    container: $container,
    clear: false,
    min: moment({hour: 12, minute: 0}).add(1, 'days').toDate(),
    today: false
  });
};


AutoForm.hooks({
  loginSchema: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      this.event.preventDefault();
      Session.set('customLoginError','');
      Meteor.loginAsAdmin = function(loginRequest) {
        Accounts.callLoginMethod({
              methodArguments: [loginRequest]
        });
      };

      insertDoc.checkoutDate=moment(insertDoc.checkoutDate).hour(12).minute(0).second(0).toISOString();

      Meteor.call('doLogin',insertDoc, function (error, result) {
        if (typeof result !== "undefined"){
            Meteor.loginAsAdmin(insertDoc);
        }  else {
            Session.set('customLoginError',error);
            setTimeout(function () {
              Session.set('customLoginError','');
            }, 5000);
        }
      });

      if (typeof Session.get('customLoginError').reason !== undefined ) {
        console.log('error logging in');
      }

      return false;
    }
  }
});
