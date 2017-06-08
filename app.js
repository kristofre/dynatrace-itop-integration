var querystring = require('querystring');
var https = require('https');
var dynatraceApi = require('./controller/dynatraceApiController');
var integration = require('./controller/integrationController');

var config = require('./config/config.js');
var CronJob = require('cron').CronJob;

integration.syncServers();
//integration.syncProcessGroups();


/*var CronJob = require('cron').CronJob;
new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');*/
