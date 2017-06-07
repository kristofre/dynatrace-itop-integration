var iTopApi = require('./iTopApiController');

module.exports = {
    getServers: function(success) {
        var jsondata = {
            operation: 'core/get',
            class: 'Server',
            key: 'SELECT Server'
        };
        iTopApi.performRequest(jsondata, success);
    },

    getServerById: function(serverId, success) {
        var jsondata = {
            operation: 'core/get',
            class: 'Server',
            key: serverId
        };
        iTopApi.performRequest(jsondata, success);
    },

    getServerByName: function(name, success) {
        var jsondata = {
            operation: 'core/get',
            class: 'Server',
            key: 'SELECT Server WHERE name=\"' + name + '\"'
        };
        iTopApi.performRequest(jsondata, success);
    },

    getServerByDynatraceId: function(id, success) {
        var jsondata = {
            operation: 'core/get',
            class: 'Server',
            key: 'SELECT Server WHERE description LIKE \"' + id + '\"'
        };
        iTopApi.performRequest(jsondata, success);
    },

    getItem: function(key, id, success) {
        
    },

    createServer: function(fields, success) {
        var jsondata = {
            operation: 'core/create',
            class: 'Server',
            comment: 'created from Dynatrace Integration',
            fields: fields
        };
        iTopApi.performRequest(jsondata, success);
    },

    updateServerByDynatraceId: function(id, fields, success) {
        var jsondata = {
            operation: 'core/update',
            class: 'Server',
            key: 'SELECT Server WHERE description LIKE \"' + id + '\"',
            comment: 'updated from Dynatrace Integration',
            fields: fields
        };
        iTopApi.performRequest(jsondata, success);
    }
};