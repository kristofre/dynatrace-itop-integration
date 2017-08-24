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
                                //console.log('ITOP SERVER UPDATED: ', res.objects);
                                helper.printlog('iTop Server Updated: ' + dtHost.entityId + ' - ' + dtHost.displayName + ' - ' + dtHost.ipAddresses[0])
                            } else {
                                helper.printlog('Error while updating iTop entity: ' + dtHost.entityId);
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
                                helper.printlog('iTop Server Created: ' + dtHost.entityId + ' - ' + dtHost.displayName + ' - ' + dtHost.ipAddresses[0])
                            } else {
                                helper.printlog('Error while creating entity in iTop: ' + dtHost.entityId);
                            }
                        })
                    }
                });
            });
        });
    },
};