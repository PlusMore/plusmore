EmailService.Schemas.Address = new SimpleSchema({
  streetNumber: {
    type: String // 1b for example
  },
  streetName: {
    type: String
  },
  city: {
    type: String
  },
  stateCode: {
    type: String
  },
  zipcode: {
    type: String
  }
});

EmailService.Schemas.Venue = new SimpleSchema({
  name: {
    type: String
  },
  address: {
    type: EmailService.Schemas.Address
  }
});

EmailService.Schemas.ReservationParty = new SimpleSchema({
  name: {
    type: String
  },
  size: {
    type: Number
  }
});

EmailService.Schemas.ExperienceReservationEmail = new SimpleSchema({
  title: {
    type: String
  },
  when: {
    type: String
  },
  party: {
    type: EmailService.Schemas.ReservationParty
  },
  venue: {
    type: EmailService.Schemas.Venue
  },
  guestContactEmail: {
    type: String
  },
  contactPhone: {
    type: String,
    optional: true
  }
});
