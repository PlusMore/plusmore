Schema.newLoginSchema = new SimpleSchema({
  firstName: {
    type: String,
    label: 'First Name'
  },
  lastName: {
    type: String,
    label: 'Last Name'
  },
  checkoutDate: {
    type: String,
    label: 'Checkout Date',
    optional: true
  },
  roomNumber: {
    type: String,
    label: 'Room Number',
    optional: true,
    custom: function () {
      if (( this.value === null || this.value === "" || typeof this.value === "undefined")  &&
          ( this.field('checkoutDate').value === null || this.field('checkoutDate').value === "" || typeof this.field('checkoutDate').value === "undefined") ){
             return "roomorcheckout";
      }
    }
  }
});

SimpleSchema.messages({
  "roomorcheckout": "Please enter your room number or select your checkout date.",
  "loginfailed": "Log in failed."
});
