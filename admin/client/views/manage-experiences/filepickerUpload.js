Template.filepickerUpload.events({
  'click button' : function (e, tmpl) {
    e.preventDefault();
    var that = this;

    filepicker.pick(function(InkBlob) {
      Meteor.call('createExperienceForFilepickerUpload', InkBlob, that._id);
    });
  }
});
