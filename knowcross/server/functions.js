hotelID='6FEjegHjX6Lq2YLYn';
baseURL = 'http://training.knowcross.com/TritonActivityService/TritonActivity.aspx?ACTION=';

urlToJSON = function(url){
  var tabletojson = Meteor.npmRequire('tabletojson');
  var html = Meteor.http.call("GET", url).content;
  return tabletojson.convert(html);
}

//http://training.knowcross.com/TritonActivityService/TritonActivity.aspx?ACTION=LIST_CALL_DESCRIPTIONS&USER=admin&pswd=
theMarkServiceType = function(serviceType) {
  switch (serviceType) {
      case 'bellService':
          return "Luggage Handling";
          break;
      case 'houseKeeping':
          return "Room to clean";
          break;
      case 'wakeUpCall':
        // Nothing extra needed
        return "Wake up call";
        break;
      case 'transportation':   
          return "Transportation";
        break;
      case 'valetServices':
          return "Valet Parking";
        break;
      default:
        console.log('The type of service requested has not been configured');
        throw new Meteor.Error(500, 'Service type is not configured', serviceRequest);
        break;
    }
}


