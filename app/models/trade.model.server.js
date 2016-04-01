var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TradeSchema = new Schema({
   status: String,
   requestedBy: [{
       type: Schema.ObjectId,
       ref: 'User'
   }],
    for: {
        type: Schema.ObjectId,
        ref: 'Book'
    },
    bookOwner: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Trade', TradeSchema);