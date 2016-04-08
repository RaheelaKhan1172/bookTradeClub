var Book = require('mongoose').model('Book'),
    User = require('mongoose').model('User');


//retrieve error message 
var getErrorMessage = function(err) {
    
    var message = '';
    
    if (err.code) {
        message = 'Something went wrong! Please try again';
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
};

//get all books
exports.books = function(req,res,next) {
    Book.find({}).populate('owner , tradeRequest').exec(function(err,books) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(books);
        }
    });
};


