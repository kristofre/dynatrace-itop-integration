var integration = require('./controller/integrationController');
var helper = require('./helper/helper.js');

var config = require('./config/config.js');

var CronJob = require('cron').CronJob;

if(process.env.REPEATEVERY5=='1')
{
  helper.printlog('Repeated run started - this run will start on the 5min mark (10:15, 10:20, 10:25,...');
  new CronJob('*/5 * * * *', function() {
    helper.printlog('Repeated run started');
    integration.syncServers();
  }, null, true, 'America/Los_Angeles');
}

else {
  helper.printlog('Single run started')
  integration.syncServers();
}
