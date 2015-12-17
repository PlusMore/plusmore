Meteor.methods({
  'registerStayFromMark': function(stay) {
    console.log(stay);

    var checkoutDate = moment(stay.departure, "DD/MM/YYYY").set('hour',
      12).toDate();

    console.log('Import: ', stay.lastName, checkoutDate);
    // to fix date

    var room = Rooms.findOne({
      hotelId: stay.hotel,
      name: stay.room
    });
    if (!room) {
      throw new Meteor.Error(500, 'Not a valid room');
    }

    if (room.stayId) {
      var stay = Stays.findOne(room.stayId);

      if (stay) {
        if (moment().zone(checkoutDate.zone) < moment(stay.checkoutDate.date)
          .zone()) {
          // this room already has a registered stay
          // if no users, allow it to be overwritten

          if (stay.users.length > 0)
            throw new Meteor.Error(500,
              'This room\'s current stay has not ended.');
        }
      }
    }

    Stays.update({
      roomId: room._id
    }, {
      $set: {
        active: false
      }
    });



    var accountOptions = {
      email: stay.email,
      profile: {
        firstName: stay.firstName,
        lastName: stay.lastName,
        vip: stay.vip,
        company: stay.company
      },
      roles: ['guest'],
      stayId: stayId
    }

    if (typeof stay.email === 'undefined' || stay.email === '' || stay.email ===
      null) {
      username = stay.firstName + stay.lastName + Math.floor((
        Math.random() * 100) + 1);
      accountOptions.username = username.replace(/\W/g, '');
      // your code here.
    };


    console.log(accountOptions);


    // is guest a previous user
    var user = Meteor.users.findOne({
      'emails.address': stay.email
    });


    if (user) {
      guestId = user._id;
      // send an email here
      console.log('Existing guest checked in, should send email here');
    } else {
      // create account for new guest
      var userId = Accounts.createUser(accountOptions);
      guestId = userId;
    }


    var stayId = Stays.insert({
      checkInDate: new Date(),
      checkoutDate: checkoutDate,
      zone: 300,
      hotelId: stay.hotel,
      roomId: room._id,
      roomName: room.name, // Used frequently in UI, so denormalized
      active: true,
      users: [guestId],
      guestId: guestId
    });

    // console.log(stayId);

    Rooms.update(room._id, {
      $set: {
        stayId: stayId
      }
    });

    Meteor.users.update({
      _id: guestId
    }, {
      $set: {
        stayId: stayId
      }
    });


    var sendEnrollmentEmail = false;

    if (sendEnrollmentEmail && accountOptions && stayId) {
      Meteor.defer(function() {
        console.log('send email');
        Accounts.sendEnrollmentEmail(userId, accountOptions.email);
      });
    }


    console.log('new arrival', stay.lastName, stay.hotel, stayId);

    //     console.log(stay);
  }
});
