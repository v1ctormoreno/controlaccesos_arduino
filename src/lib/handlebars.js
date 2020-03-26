//const {format} = require('timeago.js');
const moment = require('moment');
const helpers = {};

helpers.timeago = (savedTimestamp) => {    
    return moment(savedTimestamp).format('DD/MM/YYYY h:mm:ss a');
};

module.exports = helpers;