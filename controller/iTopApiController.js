var querystring = require('querystring');
var http = require('http');
var config = require('../config/config.js');



module.exports = {

    performRequest: function (jsondata, success) {
        var endpoint = config.itop.restEndpoint;
        var version = config.itop.restVersion;
        
        var headers = {
            'Content-Type': 'application/json'
        };

        var params = {
            auth_user: config.itop.username,
            auth_pwd: config.itop.password,
            json_data: JSON.stringify(jsondata)
        };

        var options = {
            host: config.itop.host,
            port: config.itop.port,
            path: endpoint + '?version=' + version + '&' + querystring.stringify(params),
            method: 'GET',
            headers: headers
        };

        
        var req = http.request(options, function(res) {
            //console.log(res);
            if (('' + res.statusCode).match(/^2\d\d$/)) {
            // Request handled, happy
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function(data) {
                responseString += data;
            });

            res.on('end', function() {
                var responseObject = JSON.parse(responseString);
                // code 0 means successful action
                if(responseObject.code == '0'){
                    success(responseObject);
                }
                else{
                    console.log("ERROR RETURNED FROM ITOP: ", responseObject);
                }
            });
            } else {
            console.log('COULD NOT CONNECT TO ITOP:', res.statusCode, res.statusMessage);
            }
            
        });
        req.write("");
        req.end();
    }

};