# dynatrace-itop-integration
Showcase Dynatrace iTop CMDB Integration

Currently does the following:
- create and update server CI in iTop based on Dynatrace Hosts

Run as follows:
For SaaS instance: DTTENANT=[tenant] DTAPITOKEN=[token] ITOPHOST=[itophost] ITOPPORT=[itopport] ITOPUSER=[username] ITOPPASS=[pass] node app.js
For Managed instance: DTTENANT=[tenant] DTAPITOKEN=[token] DTMANAGED=1 DTHOST=[host] ITOPHOST=[itophost] ITOPPORT=[itopport] ITOPUSER=[username] ITOPPASS=[pass] node app.js

Running with REPEATEVERY5=1 runs it as cron job every 5 mins

Building docker:

docker build -t kristofre/dynatrace-itop-integration .


Running docker

docker run --env-file .env kristofre/dynatrace-itop-integration

.env file can be created with exampleEnv as guide