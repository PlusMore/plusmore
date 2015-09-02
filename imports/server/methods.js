Meteor.methods({
  'insertOracleXMLArrivals': function(emailDetails, resArr) {
    check(emailDetails, Object);
    check(resArr, Array);

    _.extend(emailDetails, {
      registered: false,
      format: 'oracleXML'
    });

    return ArrivalImports.insert({
      from: emailDetails.from,
      date: emailDetails.date,
      registered: emailDetails.registered,
      format: emailDetails.format,
      reservations: resArr
    });
  }
});
