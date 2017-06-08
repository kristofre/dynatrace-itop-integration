var querystring = require('querystring');
var https = require('https');
var dynatraceApi = require('./dynatraceApiController');
var integration = require('./integrationController');

var config = require('./config/config.js');
var CronJob = require('cron').CronJob;

/*var host = 'hfh56977.live.dynatrace.com';
var apiToken = 'dkj7WRGuQNaFqNkPs7qhr';
var tenant = 'hfh56977';
var apiVersion = 'v1';*/

//getServersFromItop();
//getServerFromItopById(2);
//getHosts();
//getApps();
//getServices();

/*function getHosts() {
  dynatraceApi(config.dynatrace.hostApi, 'GET', function(data) {
    data.forEach (function (host) {
      console.log('Host Entity: ' + host.entityId);
      var fromRel = host.fromRelationships;
      console.log('Rel: ', fromRel);
    });
    //console.log('Services:', data);
  });
}*/

//integration.syncServers();
integration.syncProcessGroups();

/*function getApps() {
  dynatraceApi(config.dynatrace.applicationApi, 'GET', function(data) {
    data.forEach (function (app) {
      console.log('App Entity: ' + app.entityId);
      var fromRel = app.fromRelationships;
      console.log('Rel: ', fromRel);
    });
    console.log('Apps:', data);
  });
}
/*function getServices() {
  dynatraceApi(config.dynatrace.servicesApi, 'GET', function(data) {
    
    console.log('Services:', data);
  });
}*/


/*function getServersFromItop(){  
  iTopApi.getServers(function(data) {
    console.log('itop: ', data);
  });
}

function getServerFromItopById(id){
  iTopApi.getServerById(id, function(data) {
    console.log('itop: ', data);
  });
}*/



/*var CronJob = require('cron').CronJob;
new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');*/
