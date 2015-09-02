ArrivalImports = new Meteor.Collection('arrivalImports');

// Allow/Deny

ArrivalImports.allow({
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
