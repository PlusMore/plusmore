Accounts.emailTemplates.siteName = "PlusMore";
Accounts.emailTemplates.from = "PlusMore <noreply@plusmoretablets.com>";
Accounts.emailTemplates.enrollAccount.subject = function(user) {
  var text = "";

  if (Roles.userIsInRole(user, ['guest'])) {
    var stay = Stays.findOne(user.stayId);
    var hotel = Hotels.findOne(stay.hotelId);

    text += "Welcome to " + hotel.name + ", ";
  } else {
    text += "Welcome to PlusMore, ";
  }

  return text + user.profile.firstName + "!";
};
Accounts.emailTemplates.enrollAccount.text = function(user, url) {
  var spliturl = url.split('/#');
  var appUrl = Cluster.discovery.pickEndpoint('hotel');
  var text = "Hi " + user.profile.firstName + ",\n\n";

  if (Roles.userIsInRole(user, ['guest'])) {
    appUrl = Cluster.discovery.pickEndpoint('onboard');
    var stay = Stays.findOne(user.stayId);
    var hotel = Hotels.findOne(stay.hotelId);
    text += "Welcome to " +  hotel.name + "!\n\n";
    text += "In order to serve your better, we've partnered with PlusMore, a digital concierge app based here in NYC.\n\n";
    text += "By using the PlusMore app you can:\n\n"
    text += "\t - Make various hotel requests like luggage pick-up or a wake up call\n"
    text += "\t - Learn about and book reservations at the city's hottest restaurants\n"
    text += "\t - Make table reservations at the most exclusive nightclubs\n"
    text += "\t - Get some great sightseeing recommendations\n"
  }

  appUrl += '#' + spliturl[1];

  text += "Click here to get started with PlusMore:\n\n" + appUrl;
  if (hotel) {
    text += "\n\nAs always, feel free to reach out to us at any time if you have any additional questions. We look forward to serving you!\n\n"
    text += "-" + hotel.name;
  }

  return text;
};

Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  var spliturl = url.split('/#');

  var appUrl = Cluster.discovery.pickEndpoint('hotel');

  if (Roles.userIsInRole(user, ['guest'])) {
    appUrl = Cluster.discovery.pickEndpoint('onboard');
  }

  appUrl += '#' + spliturl[1];

  return "To verify your account email, simply click the link below.:\n\n" +
    appUrl;
};

Accounts.validateNewUser(function(user) {
  // if adding a hotel-staff, or hotel-manager then allow creation
  var isHotelStaffOrManager = false;
  var hotelIsValid = false;
  // added ability to validate guest
  var userIsGuest = false;

  if (user.hotelId) {
    hotelIsValid = !!Hotels.findOne(user.hotelId);
  }

  if (!_.isEmpty(user.roles)) {
    isHotelStaffOrManager = _.any(user.roles, function(role) {
      return (role === 'hotel-staff' || role === 'hotel-manager');
    });
    userIsGuest = _.any(user.roles, function(role) {
      return (role === 'guest');
    });
  }

  if (hotelIsValid && isHotelStaffOrManager || userIsGuest) {
    return true;
  }
});


Accounts.onCreateUser(function(options, user) {
  if (_.contains(options.roles, 'guest', 0)) {
    //create user as guest, not staff
    user.profile = options.profile;
    user.roles = [];
    user.roles.push('guest');

  } else {
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
      user.profile = options.profile;

    var hotelIsValid = false;
    var isHotelStaff = false;
    var isHotelManager = false;

    if (options.hotelId) {
      hotelIsValid = !!Hotels.findOne(options.hotelId);
    }

    if (hotelIsValid) {
      user.hotelId = options.hotelId;
    } else {
      throw new Meteor.Error(500, 'Account creation is forbidden.');
    }

    if (!_.isEmpty(options.roles)) {
      isHotelStaff = _.any(options.roles, function(role) {
        return role === 'hotel-staff';
      });
      isHotelManager = _.any(options.roles, function(role) {
        return role === 'hotel-manager';
      });
    }

    user.roles = [];

    if (isHotelStaff) {
      user.roles.push('hotel-staff');
    }

    if (isHotelManager) {
      user.roles.push('hotel-manager');
    }

    if (!(isHotelStaff || isHotelManager)) {
      throw new Meteor.Error(500, 'Account creation is forbidden.');
    }

  }

  return user;
});

Accounts.validateLoginAttempt(function(attempt) {
  if (!attempt.allowed) {
    return false;
  }

  if (attempt.user) {
    if (!attempt.user.emails[0].verified) {
      throw new Meteor.Error(300, 'Please verify your email address by clicking the link in the verification email that was sent to ' + attempt.user.emails[0].address + '.');
    } else {
      return true;
    }
  }
});

Accounts.onLoginFailure(function(attempt) {
  if (attempt.user) {
    if (!attempt.user.emails[0].verified) {
      Accounts.sendVerificationEmail(attempt.user._id);
    }
  }
});
