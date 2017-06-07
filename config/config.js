var config = {};

config.dynatrace = {};
config.itop = {};
config.dynatrace.apiToken = process.env.DTAPITOKEN || 'EMPTYTOKEN';
config.dynatrace.tenant = process.env.DTTENANT || 'EMPTYTENANT';
config.dynatrace.apiVersion = process.env.DTAPIVERSION || 'v1';
config.dynatrace.host = process.env.DTHOST || 'live.dynatrace.com';
config.dynatrace.applicationApi = '/api/' + config.dynatrace.apiVersion + '/entity/applications'
config.dynatrace.servicesApi = '/api/' + config.dynatrace.apiVersion + '/entity/services'
config.dynatrace.hostApi = '/api/' + config.dynatrace.apiVersion + '/entity/infrastructure/hosts'

config.itop.username = process.env.ITOPUSER || 'EMPTYITOPUSER';
config.itop.host = process.env.ITOPHOST || 'EMPTYITOPHOST';
config.itop.port = process.env.ITOPPORT || 'EMPTYITOPPORT';
config.itop.restEndpoint = '/webservices/rest.php';
config.itop.restVersion = '1.3';

module.exports = config;

/*module.exports = {
    
    config,

    getApiUrl: function() {
        console.log('URL:', config.dynatrace.tenant + '.' + config.dynatrace.host);
        return config.dynatrace.tenant + '.' + config.dynatrace.host;
    }
    
}*/