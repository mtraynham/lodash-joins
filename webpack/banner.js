var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    date = new Date();

module.exports = _.template(fs.readFileSync(path.join(__dirname, '..') + '/LICENSE_BANNER', 'utf8'))({
    pkg: require('../package.json'),
    date: date,
    year: date.getFullYear()
});
