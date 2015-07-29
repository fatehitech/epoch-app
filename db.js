var low = require('lowdb')
var homedir = require('homedir')();
var path = require('path');
var dbPath = path.join(homedir, 'epoch.json');
var db = low(dbPath);

module.exports = db;
