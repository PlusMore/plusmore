Meteor.publish('onboardInformation', function(token) {
  check(token, String);

  console.log('publishing onboard information for ', token);

  return Meteor.users.find({
    'services.password.reset.token' : token
  },
  {
    fields: {
      'services.password.reset.token': 1,
      'services.password.reset.email': 1,
      'profile': 1,
      'roles': 1,
      '_id': 1
    }
  });
});
