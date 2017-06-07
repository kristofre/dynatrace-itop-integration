var dynatrace = require('./dynatraceController');
var itop = require('./iTopController');


module.exports = {
    syncApplications: function() {

    },

    syncServers: function() {
        var serversFromDynatrace = dynatrace.getHosts(function(dtHosts) {
            dtHosts.forEach (function (dtHost) {

                //does the server exist in iTop?
                itop.getServerByDynatraceId(dtHost.entityId, function(iTopHost) {
                    
                    if(iTopHost.objects != null) {
                        //server already exists in iTop
                        console.log('existing itop server: ', iTopHost.objects);

                        var newServerFields = {
                            name: dtHost.displayName,
                            org_id: 1,
                            osfamily_name: dtHost.osType
                        }
                        itop.updateServerByDynatraceId(dtHost.entityId, newServerFields, function (res) {
                            if(res.objects!=null) {
                                console.log('ITOP SERVER UPDATED: ', res.objects);
                            }
                            else{
                                console.log('ERROR WHILE UPDATING: ', res);
                            }
                        })
                    }
                    else {
                        //server does not exist in iTop, create new entity
                        var newServerFields = {
                            name: dtHost.displayName,
                            description: dtHost.entityId,
                            org_id: 1,
                            osfamily_name: dtHost.osType
                        }
                        itop.createServer(newServerFields, function (res) {
                            if(res.objects!=null) {
                                console.log('ITOP SERVER CREATED: ', res.objects);
                            }
                            else{
                                console.log('ERROR WHILE CREATING: ', res);
                            }
                        })
                    }
                });
            });
        });
    }
};