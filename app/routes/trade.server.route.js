'use strict';

var trade = require ('../controllers/request.server.controller');

module.exports = function(app) {
    app.route('/api/trade')
        .post(trade.post);
    
    app.route('/api/trade/:tradeId')
        .delete(trade.delete);
    
    app.route('/api/trade/accept/:tradeId')
        .put(trade.update);
    
    app.route('/api/trade/deny/:tradeId')
        .put(trade.updateDeny);
    
    app.param('tradeId', trade.getRequestID);
    
};