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
            auth_user: 'admin',
            auth_pwd: 'trlab123!',
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
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function(data) {
            responseString += data;
            });

            res.on('end', function() {
            var responseObject = JSON.parse(responseString);
            success(responseObject);
            });
        });
        req.write("");
        req.end();
    }

};