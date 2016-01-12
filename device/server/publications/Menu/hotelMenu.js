Meteor.publish('hotelMenu', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  var hotel = Hotels.find(hotelId);
  if (hotel) {

    var menuCategoriesCursor = MenuCategories.find({
      hotelId: hotelId,
      active: true
    });

    var categoryIds = [];

    menuCategoriesCursor.map(function(category) {
      categoryIds.push(category._id);
    });

    return [
      menuCategoriesCursor,
      MenuItems.find({
        menuCategoryId: {
          $in: categoryIds
        },
        active: true
      })
    ];
  }
});

Meteor.publish('menusubcategories', function(hotelId) {
  // hotelid
  return MenuSubCategories.find({});
});


Meteor.startup(function() {
  MenuItems._ensureIndex({
    menuCategoryId: 1
  });
});

Meteor.startup(function() {
  MenuCategories._ensureIndex({
    hotelId: 1
  });
});
