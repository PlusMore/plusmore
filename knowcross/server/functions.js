baseURL = Meteor.settings.private.baseURL;
loginOpts = Meteor.settings.private.loginOpts;
hotelID = Meteor.settings.private.hotelID;

urlToJSON = function(url) {
  var tabletojson = Meteor.npmRequire('tabletojson');
  var html = Meteor.http.call("GET", url).content;
  return tabletojson.convert(html);
}

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
        case 'Bath amenities':
          return "678"; // ??
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
        case 'Additional sheets':
          return "25235"; // ?? type of room?
          break;
        case 'Laundry Pickup (standard)':
          return "25196";
          break;
        case 'Laundry Pickup (express)':
          return "25196"; //???
          break;
        case 'Laundry Delivery (standard)':
          return "25195";
          break;
        case 'Laundry Delivery (express)':
          return "25195"; //??
          break;
        case 'Blanket':
          return "24986"; // ?? type of room?
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
          return "25121";
          break;
        case 'In Room Safe':
          return "888";
          break;
        case 'Light Bulb':
          return "52";
          break;
        case 'Shower':
          return "84";
          break;
        case 'Sink':
          return "354";
          break;
        case 'Toilet':
          return "401";
          break;
        case 'Other':
          return "294";
          break;
        default:
          console.log(serviceType.type.options.HouseKeepingRequest);
          return "294";
      }
      break;
    case 'wakeUpCall':
      return "26721"; // Courtesy call to guest //what is the proper service?
      break;
    case 'transportation':
      return "45"; //Taxi service
      break;
    case 'valetServices':
      return "899"; // Other guest service center//what is the proper service?
      break;
    default:
      console.log('The type of service requested has not been configured');
      throw new Meteor.Error(500, 'Service type is not configured',
        serviceRequest);
      break;
  }
}
