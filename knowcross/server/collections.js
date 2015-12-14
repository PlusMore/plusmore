/* ---------------------------------------------------- +/

## Collections ##

/+ ---------------------------------------------------- */

Hotels = new Meteor.Collection('hotels');

Hotels.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return false;
  },
  remove: function(userId, doc) {
    return false;
  }
});


Orders = new Meteor.Collection('orders');

// Allow/Deny

Orders.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return false;
  },
  remove: function(userId, doc) {
    return false;
  }
});

Rooms = new Meteor.Collection('rooms');

Rooms.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return false;
  },
  remove: function(userId, doc) {
    return false;
  }
});

Experiences = new Meteor.Collection('experiences');

Experiences.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return false;
  },
  remove: function(userId, doc) {
    return false;
  }
});
