'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
});
dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;
