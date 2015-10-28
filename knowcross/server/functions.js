baseURL = Meteor.settings.private.baseURL;
loginOpts = Meteor.settings.private.loginOpts;
hotelID = Meteor.settings.private.hotelID;

urlToJSON = function(url){
    var tabletojson = Meteor.npmRequire('tabletojson');
    var html = Meteor.http.call("GET", url).content;
    return tabletojson.convert(html);
}

theMarkServiceType = function(serviceType) {
    switch (serviceType.type) {
        case 'bellService':
            return "812"; //Pick up luggages
            break;
        case 'houseKeeping':
            switch (serviceType.options.HouseKeepingRequest) {
                case 'Room Cleaning':
                    return "485"; 
                    break;          
                case 'Turndown':
                    return "537"; 
                    break;          
                case 'Bath amenities':
                    return "678"; 
                    break;          
                case 'Rollaway':
                    return "751";
                    break;          
                case 'Mouthwash':
                    return "000";
                    break;          
                case 'Deoderant':
                    return "000";
                    break;          
                case 'Pillow (feather)':
                    return "629";
                    break;   
                case 'Pillow (foam)':
                    return "626"; 
                    break;          
                case 'Slippers':
                    return "505"; 
                    break;          
                case 'Towels':
                    return "714"; 
                    break;          
                case 'Additional sheets':
                    return "557";
                    break;          
                case 'Laundry Pickup (standard)':
                    return "448";
                    break;          
                case 'Laundry Pickup (express)':
                    return "453";
                    break;          
                case 'Laundry Delivery (standard)':
                    return "000";
                    break;   
                case 'Laundry Delivery (express)':
                    return "000"; 
                    break;          
                case 'Blanket':
                    return "538"; 
                    break;          
                case 'Bathrobe':
                    return "646"; 
                    break;          
                case 'Crib':
                    return "605";
                    break;          
                case 'Iron & Ironing Board':
                    return "566";
                    break;          
                case 'Steamer':
                    return "000";
                    break;          
                case 'Shaving Kit':
                    return "589";
                    break;     
                case 'Other':
                    return "899";
                    break;                       
                default:
                    console.log(serviceType.type.options.HouseKeepingRequest);
                    return "485"; //Room to clean  
            }
            break;
        case 'maintenance':
            switch (serviceType.options.MaintenanceRequest) {
                case 'Air Conditioning & Heating':
                    return "139"; 
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


