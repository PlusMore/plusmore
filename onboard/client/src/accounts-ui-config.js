Accounts.ui.config({
  forceEmailLowercase: true,
  extraSignupFields: [
    {
      fieldName: 'firstName',
      fieldLabel: 'First name',
      inputType: 'text',
      visible: true,
      saveToProfile: true,
      validate: function(value, errorFunction) {
        if (!value) {
          sAlert.error("Please provide your first name");
          return false;
        } else {
          return true;
        }
      }
    },
    {
      fieldName: 'lastName',
      fieldLabel: 'Last name',
      inputType: 'text',
      visible: true,
      saveToProfile: true,
      validate: function(value, errorFunction) {
        if (!value) {
          sAlert.error("Please provide your last name");
          return false;
        } else {
          return true;
        }
      }
    }
  ]
});
