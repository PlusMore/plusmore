baseURL = Meteor.settings.private.baseURL;
loginOpts = Meteor.settings.private.loginOpts;
hotelID = Meteor.settings.private.hotelID;

urlToJSON = function(url){
  var tabletojson = Meteor.npmRequire('tabletojson');
  var html = Meteor.http.call("GET", url).content;
  return tabletojson.convert(html);
}

theMarkServiceType = function(serviceType) {
  switch (serviceType) {
      case 'bellService':
          return "812"; //Pick up luggages
          break;
      case 'houseKeeping':
          return "485"; //Room to clean
          break;
      case 'wakeUpCall':
        return "1"; // Courtesy call to guest //what is the proper service?
        break;
      case 'transportation':   
          return "45"; //Taxi service
        break;
      case 'valetServices':
          return "899"; // Other guest service center//what is the proper service?
        break;
      default:
        console.log('The type of service requested has not been configured');
        throw new Meteor.Error(500, 'Service type is not configured', serviceRequest);
        break;
    }
}


