var dynatraceApi = require('./dynatraceApiController');
var iTopApi = require('./iTopApiController');
var config = require('../config/config.js');

module.exports = { 
    getHosts: function(success) {
        dynatraceApi(config.dynatrace.hostApi, 'GET', success);
    },

    getProcessGroups: function(success) {
        dynatraceApi(config.dynatrace.processGroupApi, 'GET', success);
    },

    verifyConnecion: function(res) {
        dynatraceApi(config.dynatrace.hostApi, 'GET', res);
    }
};
