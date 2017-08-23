var querystring = require('querystring');
var https = require('https');
var config = require('../config/config.js');

function getHost()
{
  if(config.dynatrace.isManaged=='1') {
    return config.dynatrace.host;
  }
  else {
    return config.dynatrace.tenant + '.' + config.dynatrace.host;
  }
}

function getPath()
{
    if(config.dynatrace.isManaged=='1') {
      return '/e/' + config.dynatrace.tenant;
    }
    return '';
}

module.exports = function performRequest(endpoint, method, success) {
  
  var headers = {};
  headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Api-Token ' + config.dynatrace.apiToken
    };

  var options = {
    host: getHost(),
    path: getPath() + endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    //console.log(res);
    if (('' + res.statusCode).match(/^2\d\d$/)) {
      
      // Request handled, happy
      res.setEncoding('utf-8');

      var responseString = '';

      res.on('data', function(data) {
        responseString += data;
      });

      res.on('end', function() {
        //console.log(res);
        var responseObject = JSON.parse(responseString);

        success(responseObject);
      });
    } else {
      console.log('COULD NOT CONNECT TO DYNATRACE:', res.statusCode, res.statusMessage);
    }
    
  });

  req.write("");
  req.end();
};