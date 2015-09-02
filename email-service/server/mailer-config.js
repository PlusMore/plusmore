// Documentation: https://atmospherejs.com/lookback/emails

Mailer.config({
  from: 'John Doe <from@domain.com',
  replyTo: 'John Doe <from@domain.com'
});

Meteor.startup(function() {

  Mailer.init({
    templates: EmailService.Templates,     // Global Templates namespace, see lib/templates.js.
    helpers: EmailService.TemplateHelpers, // Global template helper namespace.
    layout: {
      name: 'metro',
      path: 'emails/themes/metro/layouts/header-footer.html',   // Relative to 'private' dir.
      scss: 'emails/themes/metro/layouts/layout.scss'
    }
  });

});
