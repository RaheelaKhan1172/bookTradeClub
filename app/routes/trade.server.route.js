'use strict';

var trade = require ('../controllers/request.server.controller');

module.exports = function(app) {
    app.route('/api/trade')
        .post(trade.post);
    
    app.route('/api/trade/:id')
        .put(trade.update)
    
    app.param('id', trade.getRequestID);
    
};