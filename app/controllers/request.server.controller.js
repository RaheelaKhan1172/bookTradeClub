
var Trade = require('mongoose').model('Trade'),
    User = require('mongoose').model('User'),
    Book = require('mongoose').model('Book');

'use strict';



/**
**
** @return {Object}
**
**/

exports.getRequestsForUser = function(user,cb) {
    //get requests for user first
    Trade.find({bookOwner: user}).populate('for').populate('requestedBy','-password -salt').exec(function(err,doc) {
        console.log('hi in here', doc,user);
        return cb(doc);
    });
};

exports.getUsersRequest = function(user,cb) {
  Trade.find({requestedBy:user}).populate('for').populate('bookOwner', '-password -salt').exec(function(err,doc) {
      console.log('hey in doc', doc);
      return cb(doc);
  });  
};
/**
**
** @return {Object}
**
**/


exports.post = function(req,res,next) {
  var tradeObj,bookObj,userObj,userObj2;
    var message = '';
    console.log(req.body);
    var p = new Promise(function(resolve,reject) {
    Trade.find({for:req.body.for}).populate('owner', 'requestedBy').exec()
    //start Promise chain
    .then(function(trade) {
        console.log('hit ?');
        for (var i = 0; i< trade.length; i++) {
            console.log('hi hi hi',trade);
            //fix this
            if (trade[i].requestedBy = req.body.requestedBy && trade[i].for == req.body.for) {
                console.log('does it happen?');
                
               return reject('You have already requested a trade for this book.');

            }
        };
        console.log('what is happending',trade);
        if (!trade.length) {
            console.log('in Here');
            tradeObj = new Trade(req.body);
        }
        
        return Book.findById(req.body.for).exec()
    })
    //Book schema
    .then(function(book) {
        console.log('and me?');
        if (!book.available) {
             new Error('This book is currently unavailable.');

        }
        console.log('I happened');
        bookObj = book;
        return User.findById(req.body.requestedBy).exec()
    })
    //User Schema
    .then(function(user) {
        if (tradeObj.status) {
             message = 'You and ' + tradeObj.requestedBy.length + 'others have requested a trade for this book.';
        } else {
            message = 'You are the first person to request this book!';
          tradeObj.status = "Pending";
        }
        tradeObj.bookOwner = bookObj.owner;
        bookObj.tradeRequest.push(tradeObj._id);
        user.requestMade.push(tradeObj._id);
        console.log('and now?');
        return user.save()
        
    })
    .then(function() {
        console.log('happening?')
        return bookObj.save();
    })
    .then(function() {
        console.log('hm huh huh??')
        return resolve(tradeObj.save());
    })
    });
    p.then(function(result) {
        console.log('and how about this one?');
        return res.json({message:message});
    })
    p.catch(function(error) {
        console.log('in catch', error);
        return res.status(200).send({message:error});
    });
};

 

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
    console.log('in request',id);
    Trade.findById(id).populate(' for bookOwner').exec(function(err,trade) {
        if (err) {
            return next(err);
        } 
        
        req.trade = trade;
        console.log(req.trade);
        next();
    });
};
