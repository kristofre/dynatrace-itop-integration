var dynatraceApi = require('./dynatraceApiController');
var iTopApi = require('./iTopApiController');
var config = require('./config/config.js');

module.exports = { 
    getHosts: function(success) {
        dynatraceApi(config.dynatrace.hostApi, 'GET', success)
    },
};
