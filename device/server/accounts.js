//How do we deal with duplicate users ?
function doLogin(loginRequest){

  if(!loginRequest.firstName || !loginRequest.lastName) {
    throw new Meteor.Error(400, "Missing Parameter");
  }

  if(!loginRequest.roomNumber && !loginRequest.checkoutDate) {
    throw new Meteor.Error(400, "Missing Parameter");
  }

  var userId = null;
  var user = Meteor.users.find({
    'profile.firstName':{$regex : new RegExp(loginRequest.firstName, "i") },
    'profile.lastName':{$regex : new RegExp(loginRequest.lastName, "i") }
  });

  user.forEach(function(doc){

    if (loginRequest.roomNumber){
      var stay = Stays.findOne({'guestId':doc._id,$text: { $search: loginRequest.roomNumber }});
    }

    if (loginRequest.checkoutDate && typeof stay === "undefined") {
      var date = new Date(loginRequest.checkoutDate);
      var stay = Stays.findOne({'guestId':doc._id,'checkoutDate': { $eq: date}});
    }

    if (typeof stay !== "undefined") {
      userId=doc._id;
      return false;
    }

  });

  if (!userId){
     throw new Meteor.Error(500, "Can't find your details.");
     return false;
  }

  return userId;

}

Meteor.methods({
  doLogin: function(loginRequest){
    return doLogin(loginRequest);
  }
});

Accounts.registerLoginHandler(function(loginRequest) {

  userId=doLogin(loginRequest);

  if (!userId){
     throw new Meteor.Error(500, "Can't find your details.");
     return false;
  }

  var stampedToken = Accounts._generateStampedLoginToken();
  var hashStampedToken = Accounts._hashStampedToken(stampedToken);

  Meteor.users.update(userId,
    {$push: {'services.resume.loginTokens': hashStampedToken}}
  );

  //sending token along with the userId
  return {
    userId: userId,
    token: stampedToken.token
  }

});
