baseURL = Meteor.settings.private.baseURL;
loginOpts = Meteor.settings.private.loginOpts;
hotelID = Meteor.settings.private.hotelID;

urlToJSON = function(url) {
  var tabletojson = Meteor.npmRequire('tabletojson');
  var html = Meteor.http.call("GET", url).content;
  return tabletojson.convert(html);
}


isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

inProduction = function() {
  return process.env.NODE_ENV === "production";
};


// this should be in database
friendlyServiceType = function(serviceType) {
  switch (serviceType) {
    case 'transportation':
      return 'Transportation';
    case 'bellService':
      return 'Luggage Pickup';
    case 'houseKeeping':
      return 'Housekeeping';
    case 'wakeUpCall':
      return 'Wake Up Call';
    case 'valetServices':
      return 'Valet Services';
    case 'roomService':
      return 'Room Service';
    case 'maintenance':
      return 'Maintenance';
    default:
      return undefined;
  }
};


theMarkServiceType = function(serviceType) {
  switch (serviceType.type) {
    case 'bellService':
      return "26816"; //Pick up luggages
      break;
    case 'houseKeeping':
      switch (serviceType.options.HouseKeepingRequest) {
        case 'Room Cleaning':
          return "25152";
          break;
        case 'Turndown':
          return "25170";
          break;
        case 'Rollaway':
          return "25070";
          break;
        case 'Mouthwash':
          return "25056";
          break;
        case 'Deoderant':
          return "25012"; //male - female ??
          break;
        case 'Pillow (feather)':
          return "25025";
          break;
        case 'Pillow (foam)':
          return "25030";
          break;
        case 'Slippers':
          return "25087";
          break;
        case 'Towels':
          return "25244";
          break;
        case 'Laundry Pickup':
          return "25196";
          break;
        case 'Laundry Delivery':
          return "25195";
          break;
        case 'Wool Blanket':
          return "25114";
          break;
        case 'Bathrobe':
          return "24983";
          break;
        case 'Crib':
          return "25007";
          break;
        case 'Iron & Ironing Board':
          return "25043";
          break;
        case 'Steamer':
          return "25186";
          break;
        case 'Shaving Kit':
          return "25068";
          break;
        case 'Other':
          return "25191";
          break;
        default:
          console.log(serviceType.type.options.HouseKeepingRequest);
          return "25152"; //Room to clean
      }
      break;
    case 'maintenance':
      switch (serviceType.options.MaintenanceRequest) {
        case 'Air Conditioning & Heating':
          return "24853";
          break;
        case 'In Room Safe':
          return "25216";
          break;
        case 'Light Bulb':
          return "25665";
          break;
        case 'Shower':
          return "25143";
          break;
        case 'Sink':
          return "24943";
          break;
        case 'Toilet':
          return "25461";
          break;
        case 'Other':
          return "25191";
          break;
        default:
          console.log(serviceType.type.options.HouseKeepingRequest);
          return "25191";
      }
      break;
    case 'wakeUpCall':
      return "26721"; // Courtesy call to guest //what is the proper service?
      break;
    case 'transportation':
      return "0"; //Taxi service
      break;
    case 'valetServices':
      return "0"; // Other guest service center//what is the proper service?
      break;
    case 'roomService':
      return "66348";
      break;
    default:
      console.log('The type of service requested has not been configured');
      throw new Meteor.Error(500, 'Service type is not configured',
        serviceRequest);
      break;
  }
}

theMarkFriendlyServiceType = function(serviceType) {
  switch (serviceType.type) {
    case 'bellService':
      return "Bell Service"; //Pick up luggages
      break;
    case 'houseKeeping':
      return serviceType.options.HouseKeepingRequest;
      break;
    case 'maintenance':
      return serviceType.options.MaintenanceRequest;
      break;
    case 'wakeUpCall':
      return "Wake up call"; // Courtesy call to guest //what is the proper service?
      break;
    case 'transportation':
      return "Transportation"; //Taxi service
      break;
    case 'valetServices':
      return "Valet services"; // Other guest service center//what is the proper service?
      break;
    case 'roomService':
      return "Room Service";
      break;
    default:
      return "";
      break;
  }
}


theMarkEmail = function(serviceType) {
  switch (serviceType.type) {
    case 'bellService':
      return "TMNYC-concierge@themarkhotel.com"; //Pick up luggages
      break;
    case 'houseKeeping':
      return "TMNYC-housekeeping@themarkhotel.com";
      break;
    case 'maintenance':
      return "TMNYC-engineering@themarkhotel.com";
      break;
    case 'wakeUpCall':
      return "TMNYC-concierge@themarkhotel.com"; // Courtesy call to guest //what is the proper service?
      break;
    case 'transportation':
      return "TMNYC-frontoffice@themarkhotel.com"; //Taxi service
      break;
    case 'valetServices':
      return "TMNYC-frontoffice@themarkhotel.com"; // Other guest service center//what is the proper service?
      break;
    case 'roomService':
      return "TMNYC-concierge@themarkhotel.com";
      break;
    default:
      return "TMNYC-frontoffice@themarkhotel.com";
      break;
  }
}

serviceRequestedEmail = function(orderId, emailAddress, error) {
  var order = Orders.findOne(orderId);

  // TODO: if notification preference is set, direct to the appropriate channel
  if (order) {

    var orderId = order._id;
    var serviceRequest = order.service;
    var room = Rooms.findOne(order.roomId);
    var hotel = Hotels.findOne(room.hotelId);
    var user = Meteor.users.findOne(order.userId);

    var adminEndpoint = Cluster.discovery.pickEndpoint('admin');
    var url;

    if (adminEndpoint) {
      url = stripTrailingSlash(adminEndpoint) + "/patron-order/{0}".format(
        orderId);
    } else {
      url =
        'ERROR: Admin endpoint could not be reached. The url could not be generated. Please login to the admin application and search for the order.';
    }

    var when = moment(serviceRequest.date).zone(serviceRequest.zone);
    when = when.format('MMMM Do YYYY, h:mm a') + " (" + when.calendar() + ")";

    var options = {
      location: room.name,
      shortDescription: friendlyServiceType(serviceRequest.type) + " " +
        theMarkFriendlyServiceType(serviceRequest),
      guestName: user.profile.firstName + ' ' + user.profile.lastName,
      when: when,
      hotelName: hotel.name,
      email: emailAddress,
      error: error
    };

    return emailer.call('sendHotelServiceRequestedEmail', options);
  }
};



reservationRequestedEmail = function(orderId, emailAddress) {
  var order = Orders.findOne(orderId);
  var email = true; // TODO: if notification preference is set, direct to the appropriate channel

  if (order) {
    if (email && emailer) {
      var orderId = order._id;
      var reservation = order.reservation;
      var experience = Experiences.findOne(reservation.experienceId);

      var adminEndpoint = Cluster.discovery.pickEndpoint('admin');
      var url;

      if (adminEndpoint) {
        url = stripTrailingSlash(adminEndpoint) + "/patron-order/{0}".format(
          orderId);
      } else {
        url =
          'ERROR: Admin endpoint could not be reached. The url could not be generated. Please login to the admin application and search for the order.';
      }

      var when = moment(reservation.date).zone(reservation.zone);
      when = when.format('MMMM Do YYYY, h:mm a') + " (" + when.calendar() +
        ")";

      var options = {
        title: experience.title,
        when: when,
        party: {
          name: reservation.partyName,
          size: reservation.partySize
        },
        venue: {
          name: experience.venueName,
          address: _.pick(experience.geo, [
            'streetNumber',
            'streetName',
            'city',
            'stateCode',
            'zipcode',
          ])
        },
        guestContactEmail: reservation.emailAddress,
        contactPhone: experience.phone,
        adminOrderUrl: url,
        email: emailAddress
      };

      return emailer.call('sendExperienceReservationRequestedEmail', options);
    }
  }
}
