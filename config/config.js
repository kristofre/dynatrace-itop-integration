var config = {};

config.dynatrace = {};
config.itop = {};
config.dynatrace.apiToken = process.env.DTAPITOKEN || 'EMPTYTOKEN';
config.dynatrace.tenant = process.env.DTTENANT || 'EMPTYTENANT';
config.dynatrace.apiVersion = process.env.DTAPIVERSION || 'v1';
config.dynatrace.host = process.env.DTHOST || 'live.dynatrace.com';
config.dynatrace.isManaged = process.env.DTMANAGED || 0;
config.dynatrace.applicationApi = '/api/' + config.dynatrace.apiVersion + '/entity/applications'
config.dynatrace.servicesApi = '/api/' + config.dynatrace.apiVersion + '/entity/services'
config.dynatrace.hostApi = '/api/' + config.dynatrace.apiVersion + '/entity/infrastructure/hosts'
config.dynatrace.processGroupApi = '/api/' + config.dynatrace.apiVersion + '/entity/infrastructure/process-groups'

config.itop.username = process.env.ITOPUSER || 'EMPTYITOPUSER';
config.itop.password = process.env.ITOPPASS || 'EMPTYITOPUSER';
config.itop.host = process.env.ITOPHOST || 'EMPTYITOPHOST';
config.itop.port = process.env.ITOPPORT || 'EMPTYITOPPORT';
config.itop.restEndpoint = '/webservices/rest.php';
config.itop.restVersion = '1.3';

module.exports = config;