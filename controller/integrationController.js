var dynatrace = require('./dynatraceController');
var itop = require('./iTopController');
var helper = require('../helper/helper.js');


var dtConnectivityOk = 0;
var iTopConnectivityOk = 0;


module.exports = {
    syncApplications: function () {

    },

    syncProcessGroups: function () {
        var processGroupsFromDynatrace = dynatrace.getProcessGroups(function (dtProcessGroups) {
            dtProcessGroups.forEach(function (dtProcessGroup) {
                console.log('DT FOUND PROCESS GROUP: ', dtProcessGroup);
                var softwareTechs = dtProcessGroup.softwareTechnologies;
                if (softwareTechs != null) {
                    softwareTechs.forEach(function (tech) {
                        if (tech.type == 'APACHE_HTTPD') {

                        }
                    });
                }
            });
        })
    },

    syncServers: function () {
        var serversFromDynatrace = dynatrace.getHosts(function (dtHosts) {
            dtHosts.forEach(function (dtHost) {
                helper.printlog('Found Dynatrace Host: ' + dtHost.entityId + ' - ' + dtHost.displayName);
                //does the server exist in iTop?
                itop.getServerByDynatraceId(dtHost.entityId, function (iTopHost) {

                    if (iTopHost.objects != null) {
                        //server already exists in iTop
                        //console.log('existing itop server: ', iTopHost.objects);

                        var newServerFields = {
                            name: dtHost.displayName,
                            org_id: 1,
                            osfamily_name: dtHost.osType,
                            managementip: dtHost.ipAddresses[0],
                            serialnumber: dtHost.entityId
                        }
                        itop.updateServerByDynatraceId(dtHost.entityId, newServerFields, function (res) {
                            if (res.objects != null) {
                                console.log('ITOP SERVER UPDATED: ', res.objects.Server);
                                helper.printlog('iTop Server Updated: ')
                            } else {
                                console.log('ERROR WHILE UPDATING: ', res);
                            }
                        })
                    } else {
                        //server does not exist in iTop, create new entity
                        var newServerFields = {
                            name: dtHost.displayName,
                            description: dtHost.entityId,
                            org_id: 1,
                            osfamily_name: dtHost.osType,
                            managementip: dtHost.ipAddresses[0],
                            serialnumber: dtHost.entityId
                        }
                        itop.createServer(newServerFields, function (res) {
                            if (res.objects != null) {
                                console.log('ITOP SERVER CREATED: ', res.objects);
                            } else {
                                console.log('ERROR WHILE CREATING: ', res);
                            }
                        })
                    }
                });
            });
        });
    },
};