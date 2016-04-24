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
