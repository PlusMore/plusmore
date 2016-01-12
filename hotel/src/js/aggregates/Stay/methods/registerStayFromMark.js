Meteor.methods({
  'registerStayFromMark': function(myStay) {

    var checkoutDate = moment(myStay.departure, "DD/MM/YYYY").set('hour',
      12).toDate();

    console.log('Import: ', myStay.lastName, checkoutDate);
    // to fix date

    var room = Rooms.findOne({
      hotelId: myStay.hotel,
      name: myStay.room
    });
    if (!room) {
      throw new Meteor.Error(500, 'Not a valid room');
    }

    if (room.stayId) {
      var stay = Stays.findOne(room.stayId);

      if (stay) {
        if (moment().utcOffset(checkoutDate.zone) < moment(stay.checkoutDate.date)
          .utcOffset()) {
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
      email: myStay.email,
      profile: {
        firstName: myStay.firstName,
        lastName: myStay.lastName,
        vip: myStay.vip,
        company: myStay.company
      },
      roles: ['guest'],
      stayId: stayId
    }

   

    if ( myStay.email.length == 0 ) {
      var theUsername = myStay.firstName+myStay.lastName; 
      console.log(theUsername,'log username here');
      accountOptions.username = theUsername + Math.floor((Math.random() * 100) + 1);
      // your code here.
    };


    // is guest a previous user
    var user = Meteor.users.findOne({
      'emails.address': myStay.email
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
      hotelId: myStay.hotel,
      roomId: room._id,
      roomName: room.name, // Used frequently in UI, so denormalized
      active: true,
      users: [guestId],
      guestId: guestId
    });


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


    console.log('new arrival', myStay.lastName, myStay.hotel, stayId);

  }
});
