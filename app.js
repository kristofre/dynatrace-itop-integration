var integration = require('./controller/integrationController');

var config = require('./config/config.js');

var CronJob = require('cron').CronJob;

if(process.env.REPEATEVERY5=='1')
{
  new CronJob('*/5 * * * *', function() {
    console.log('This runs every 5 mins');
    integration.syncServers();
    //integration.syncProcessGroups();
  }, null, true, 'America/Los_Angeles');
}

else {
  integration.syncServers();
}
