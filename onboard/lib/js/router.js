Router.configure({
  layoutTemplate: 'AppLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: '404'
});

var filters = {
  scroll: function() {
    Meteor.setTimeout(function() {
      $('.main').animate({
        scrollTop: 0
      }, 400);
    });
    this.next();
  },
  closeMenu: function() {
    Meteor.setTimeout(function() {
      return App.UI.menu && App.UI.menu.close();
    });
    this.next();
  }
};

if (Meteor.isClient) {
  Router.onRun(filters.scroll);
  Router.onBeforeAction(filters.closeMenu);
}

Router.route('/', function () {
  this.render('Loading', {});
},{
  name: 'Loading',
  onBeforeAction: function() {
    this.next();
  }
});

// Errors

Router.route('/404', function () {
  this.layout('EmptyLayout');
  this.render('404', {});
},{
  name: 'Pages.404',
  onBeforeAction: function() {
    this.next();
  }
});

Router.route('/500', function () {
  this.layout('EmptyLayout');
  this.render('500', {});
},{
  name: 'Pages.500',
  onBeforeAction: function() {
    this.next();
  }
});
