var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
    available: Boolean,
    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    tradeRequest: {
        type: Schema.ObjectId,
        ref: 'Trade'
    },
    title: String,
    author: String
});

mongoose.model('Book', BookSchema);