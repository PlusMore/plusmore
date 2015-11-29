//How do we deal with duplicate users ?
Accounts.registerLoginHandler(function(loginRequest) {

  if(!loginRequest.firstName || !loginRequest.lastName || !loginRequest.roomNumber) {
    throw new Meteor.Error(400, "Missing Parameter");
  }

  var userId = null;
  var user = Meteor.users.find({'profile.firstName':loginRequest.firstName, 'profile.lastName':loginRequest.lastName});

  user.forEach(function(doc){
    var stay = Stays.findOne({'guestId':doc._id,$text: { $search: loginRequest.roomNumber }});
    if (stay!=undefined) {
      userId=doc._id;
      return false;
    }
  });

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
