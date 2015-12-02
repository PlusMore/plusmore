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
          return "0";
          break;
        case 'In Room Safe':
          return "0";
          break;
        case 'Light Bulb':
          return "0";
          break;
        case 'Shower':
          return "0";
          break;
        case 'Sink':
          return "0";
          break;
        case 'Toilet':
          return "0";
          break;
        case 'Other':
          return "0";
          break;
        default:
          console.log(serviceType.type.options.HouseKeepingRequest);
          return "0";
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
    default:
      console.log('The type of service requested has not been configured');
      throw new Meteor.Error(500, 'Service type is not configured',
        serviceRequest);
      break;
  }
}
