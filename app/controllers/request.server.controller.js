
var Trade = require('mongoose').model('Trade'),
    User = require('mongoose').model('User'),
    Book = require('mongoose').model('Book');

'use strict';



/**
**
** @return {Object}
**
**/

exports.get = function(req,res,next) {
    
};

/**
**
** @return {Object}
**
**/

// too many callbacks
exports.post = function(req,res,next) {
  var tradeObj,bookObj,userObj,userObj2;
    var message = '';
    var p = new Promise(function(resolve,reject) {
    Trade.find({for:req.body.for}).populate('owner', 'requestedBy').exec()
    //start Promise chain
    .then(function(trade) {
        console.log('hit ?');
        for (var i = 0; i< trade.length; i++) {
            console.log('hi hi hi');
            if (trade[i].requestedBy.indexOf(req.body.requestedBy) !== -1 && trade[i].for == req.body.for) {
                console.log('does it happen?');
                
               return reject('You have already requested a trade for this book.');

            }
        };
        
        if (!trade.length) {
            console.log('in Here');
            tradeObj = new Trade(req.body);
        }
        
        return p.resolve(Book.findById(req.body.for).exec())
    })
    });
    //Book schema
    p.then(function(book) {
        console.log('and me?');
        if (!book.available) {
             new Error('This book is currently unavailable.');

        }
        
        bookObj = book;
        return User.findById(req.body.requestedBy).exec()
    })
    //User Schema
    p.then(function(user) {
        console.log('does it exist?',trade);
        
        if (tradeObj.status) {
             message = 'You and ' + tradeObj.requestedBy.length + 'others have requested a trade for this book.';
        } else {
            message = 'You are the first person to request this book!';
          tradeObj.status = "Pending";
        }
        
        tradeObj.bookOwner = bookObj.owner;
        bookObj.tradeRequest.push(tradeObj._id);
        userObj.requestMade.push(tradeObj._id);
        
        return User.findById(bookObj.owner).exec()
        
    })
    //Owner of book
    p.then(function(user) {
        user.requestBy.push(tradeObj._id);
        
        return user.save();
    })
    p.then(function() {
        return userObj.save();
    })
    p.then(function() {
        return bookObj.save();
    })
    p.then(function() {
        return tradeObj.save();
    })
    p.then(function(result) {
        console.log('and how about this one?');
        return res.json({message:message});
    })
    p.catch(function(error) {
        console.log('in catch', error);
        return res.status(200).send({message:error});
    });
    };
 /*  Trade.find({for:req.body.for}).populate('owner', 'requestedBy').exec(function(err,trade) {
       if (err) {
           return res.status(400).send({
               message:err
           });
       } 
       console.log('the trade',trade);
       for (var i = 0; i < trade.length; i++) {
           console.log(trade[i].requestedBy, trade[i].for,req.body.requestedBy,req.body.for);
               if (trade[i].requestedBy.indexOf(req.body.requestedBy) !== -1 && trade[i].for == req.body.for) {
                   return res.json({mes: 'You have already requested a trade for this book.'});
               };
       }
       
       console.log('it exists');
       // no trade found,
       if (!trade.length) {
           trade = new Trade(req.body);
           
           var message = '';
           Book.findById(req.body.for).exec(function(err,book) {
        if (err) {
            return res.status(400).send({
                message:err
            });
        } else {
            if (!book.available) {
                return res.json({message:'This book is currently unavailable for trading'});
            };
            
            User.findById(req.body.requestedBy).exec(function(err, user) {
                if (err) {
                    return res.status(400).send({
                        message:err
                    });
                } else {
                    trade.status = 'Pending';
                    trade.bookOwner = book.owner;
                    book.tradeRequest.push(trade._id);
                    user.requestMade.push(trade._id);
                    
                    if (trade.status) {
                        message = 'You and ' + trade.requestedBy.length + " other people have requested a trade for this book.";
                    } else {
                        message = 'You are the first person to request this book!';
                    }
                    
                    User.findById(book.owner).exec(function(err,user1) {
                        if (err) {
                            return res.status(400).send({
                                message: err
                            });
                        } else {
                            user1.requestBy.push(trade._id);
                        }
                        
                        user1.save(function(err) {
                            console.log('user1',user1)
                            if (err) {
                                return res.status(400).send({
                                    message:err
                                });
                            } else {
                                console.log(user,'user');
                                user.save(function(err) {
                                    if (err) {
                                        return res.status(400).send({
                                            message:err
                                        });
                                    } else {
                                        book.save(function(err) {
                                            if (err) {
                                                return res.status(400).send({
                                                    message:err
                                                });
                                            } else {
                                                trade.save(function(err) {
                                                    if (err) {
                                                        return res.status(400).send({
                                                            message:err
                                                        });
                                                    } else {
                                                        return res.json({mes:message});
                                                    }
                                                });
                                            }
                                        });
                                    };
                                });
                            };
                        });
                    });
                };
            });
        }
    });
  }
}); */

           

            

/**
**
** @return {Object}
**
**/

exports.update = function(req,res,next) {
    var trade = req.trade;
    
    trade.status = 'Accepted';
    trade.acceptedFor = req.headers.selected;
    Book.findById(trade.book._id).exec(function(err,book) {
        if (err) {
            return res.status(400).send({
                message:err
            })
        } else {
            book.available = false;
            book.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message:err
                    });
                } else {
                    trade.save(function(err) {
                        if (err) {
                            if (err) {
                                return res.status(400).send({
                                    message:err
                                }); 
                            } else {
                                return res.json(trade);
                            }
                        }
                    });
                };
            });
        };
    });
};

/**
**
** @return {Object}
**
**/



exports.getRequestID = function(req,res,next,id) {
    Trade.findById(id).populate('requestedBy for bookOwner').exec(function(err,trade) {
        if (err) {
            return next(err);
        } 
        if (!trade.length) {
            return next(new Error('Could not complete the task'));
        }
        req.trade = trade;
        next();
    });
};
