var Book = require('mongoose').model('Book'),
    User = require('mongoose').model('User'),
    Trade = require('mongoose').model('Trade'),
    busboy = require('connect-busboy'),
    fs = require('fs'),
    path = require('path');
    

// function that saves book 
var saveBook = function(req,res,title,author,img) {
    var book;
    if(!title && !author) {
        book = new Book(req.body);
        //insert image url for book here book.image = 
    } else {
        book = new Book({title:title, author:author, image: img});
    }
    
    User.findOne({email:req.headers.data}, function(err,user) {
        if(err) {
            return res.status(400).send({
                message: 'Whoops, something went wrong! Try again'
            }); 
        } else {
            book.owner = user._id;
            book.available = true;
            user.books.push(book._id);
            
            user.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    book.save(function(err) {
                        if (err) {
                            return res.status(400).send({
                                message:err
                            });
                        } else {
                            console.log('saved',book);
                            return res.json(book);
                        }
                    });
                }
            });
        }
    });
}; 
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
    Book.find({}).populate('owner', 'tradeRequest').exec(function(err,books) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(books);
        }
    });
};
/**
**
*add a new book @return {Object} --new book
**
**/

exports.addBook = function(req,res,next) {
    console.log(req.headers);
    if (req.headers.mult === true) {
        console.log('so which one?')
        var fstream;
        var title,author,imgToSave;
        req.pipe(req.busboy);
        req.busboy.on('field' , function(fieldname, val) {
            console.log('fieldname, val', fieldname, val);
            if (fieldname === 'author') {
                author = val;
            } else {
                title = val;
            }
        });
        req.busboy.on('file', function(fieldname,file,fileName) {
           var dir = path.dirname(require.main.filename);
            imgToSave = Date.now() + fileName;
            fstream = fs.createWriteStream(dir + '/public/images/' + imgToSave);
            file.pipe(fstream);
            fstream.on('end', function() {
                console.log('finished');
            });
        });
        req.busboy.on('finish', function() {
            //add db stuff here
            console.log('last one', title, author,imgToSave);
            saveBook(req,res,title,author,imgToSave);
        });
         /*       var book = new Book(req.body);

                User.findOne({email: req.headers.data}, function(err,user) {
                    console.log('the user', user);
                    if (err) {
                        return res.status(400).send({
                            message:err
                        });
                    } else {
                        book.owner = user._id;
                        book.available = true;
                        user.books.push(book._id);

                        user.save(function(err) {
                            if (err) {
                                var message = getErrorMessage(err);
                                return res.status(400).send({
                            message: message
                                });
                            } else {
                                book.save(function(err) {
                                    if (err) {
                                        var message = getErrorMessage(err);
                                        return res.status(400).send({
                                            message: message
                                        });
                                    } else {
                                        return res.json(book);
                                    }
                                });
                            }
                        });
                    }
                });
            }); */
    } else {
        console.log('so I hapen',req.body,req.headers);
        saveBook(req,res);
    }
};

exports.remove = function(req,res,next) {
    var book = req.book;
    
    book.remove(function(err) {
        console.log('hi remove me!');
        if (err) {
            console.log('what th fuck is the error',err);
            return res.status(400).send({
                message:err
            });
        } else {
            User.findOne({_id:book.owner}, function(error,user) {
                if (error) {
                    return res.status(400).send({
                        message:err
                    });
                } else {

                    var ind = user.books.indexOf(book.id);
                    user.books = user.books.splice(ind,1);
                    user.save(function(err) {
                        if (err) {
                            return res.status(400).send({
                                message:err
                            });
                        } else {
                            console.log('done', user);
                            return res.status(200).json(book);
                        }
                    });
                }
            });
        } 
   
    });
};

//display a single book @return{Object} --book
exports.getBook = function(req,res,next) {
    res.json(req.book);
};

// retrieve the correct book from DB based 
exports.bookById = function(req,res,next,id) {
    console.log('hi in book id')
    Book.findById(id).populate('owner','firstName, city,state').exec(function(err,book) {
            if (err) {
                return next(err);
            }
            if (!book) {
                return next(new Error('Failed to load book'));
            }
        req.book = book;
        next();    
    });
};