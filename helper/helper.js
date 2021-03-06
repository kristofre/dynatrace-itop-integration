var moment = require('moment');

module.exports = { 
    printlog: function(message) {
        console.log(getTimeStamp(),message);
    },
};

function getTimeStamp(date){
    if(date) return moment(date).format('YYYYMMDD HH:mm:ss');
    else return moment(new Date()).format('YYYYMMDD HH:mm:ss');
}
