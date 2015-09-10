Meteor.startup(function() {

  window.addEventListener('error', function(errorEvent) {
    // You can view the information in an alert to see things working
    // like so:
    var message = errorEvent.message;
    var fileName = errorEvent.filename;
    var line = errorEvent.lineno;

    var suppressErrorAlert = true;
    // If you return true, then error alerts (like in older versions of
    // Internet Explorer) will be suppressed.
    return suppressErrorAlert;
  });

});
