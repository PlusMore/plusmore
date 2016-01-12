Template.menuItems.helpers({
  hasMenuItems: function() {
    return MenuItems.find({
      menuCategoryId: this._id
    }).count();
  },
  hasSubMenuItems: function(options) {

    if (this.value === '') {
      return MenuItems.find({
        menuCategoryId: options.hash.menuCategoryId,
        category: {
          $exists: false
        }
      }, {
        sort: {
          active: -1
        }
      }).count();

    } else {

      return MenuItems.find({
        menuCategoryId: options.hash.menuCategoryId,
        category: this.value
      }).count();

    }


  },
  menuItemsForCategory: function(options) {

    if (this.value === '') {
      return MenuItems.find({
        menuCategoryId: options.hash.menuCategoryId,
        category: {
          $exists: false
        }
      }, {
        sort: {
          active: -1
        }
      });

    } else {
      return MenuItems.find({
        menuCategoryId: options.hash.menuCategoryId,
        category: this.value
      }, {
        sort: {
          active: -1
        }
      });
    }

  },
  menuItemsForSubCategory: function(options) {
    //   console.log('asd', options,this.hotelId);
    return MenuSubCategories.find({
      hotelId: this.hotelId
    });
  },
  enabledClass: function() {
    return this.active ? 'enabled' : 'disabled';
  },
  isActive: function() {
    return this.active ? '' : '(Disabled)';
  }
});
