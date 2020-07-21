'use strict';
module.exports = function (app) {
    var api = require('../controllers/apiController');





	app.route('/api/sendCustomMailWithUrl')
        .post(api.sendCustomMailWithUrl)

    app.route('/api/sendNlmMailWithUrl')
        .post(api.sendNLMailWithUrl)






};
