var querystring = require('querystring');
var https = require('https');
var config = require('./config/config.js');

function getHost()
{
  return config.dynatrace.tenant + '.' + config.dynatrace.host;
}

module.exports = function performRequest(endpoint, method, success) {
  
  var headers = {};
  headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Api-Token ' + config.dynatrace.apiToken
    };

  var options = {
    host: getHost(),
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      //console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write("");
  req.end();
};