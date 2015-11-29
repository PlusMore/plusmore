
Template.stayLoginButtons.onCreated(function() {
  this.lastError = new ReactiveVar(null);
});


Template.stayLoginButtons.helpers({
  errorMessage: function() {
    return Template.instance().lastError.get();
  }
});


Template.stayLoginButtons.events({
    'click #loginRoom': function (e,t) {
        Meteor.loginAsAdmin = function(loginRequest) {

            //send the login request
            Accounts.callLoginMethod({
                methodArguments: [loginRequest],
                userCallback: function (error) {

                    if (error!=undefined){
                      console.log(error.reason);
                      console.log(t);
                      t.lastError.set(error.reason);
                      return false;
                    } else {
                      console.log('success');
                      return true;
                    }
            }
          });

        };

        e.preventDefault();

        var firstName = t.$("form#login-form-room input[name=firstName]").val(),
        lastName = t.$("form#login-form-room input[name=lastName]").val(),
        roomNumber = t.$("form#login-form-room input[name=roomNumber]").val();

        var loginRequest = {firstName:firstName,lastName: lastName,roomNumber: roomNumber};

        if(!loginRequest.firstName || !loginRequest.lastName || !loginRequest.roomNumber) {
          t.lastError.set("Missing Parameter");
          return false;
        }

        Meteor.loginAsAdmin(loginRequest);

    }
});
