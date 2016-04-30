'use strict';

var fs = require('fs'),
    https = require('https'),
    mongo = require('mongodb'),
    objectId = mongo.ObjectID,
    User = require('mongoose').model('User'),
    Book = require('mongoose').model('Book'),
    config = require('../../../config/configuration'),
    bookArr = [],
    index = 0;



function getInd(book) {
    return book.lastIndexOf('by');
}

function getBook(cb) {
    https.get('https://www.gutenberg.org/browse/scores/top', (res) => {
        console.log('statuscode:', res.statusCode);
        console.log('headers:', res.headers);
        
        var str = '';
        //data event emitted
        res.on('data', (d) => {
            str+= d;
        });
        res.on('end', () => {
            str = str.slice(str.indexOf('ol'), str.indexOf('</ol>'));
            
            bookArr = str.split('<a href=').map(function(a,i) {
                return a.slice(a.indexOf('>')+1, a.indexOf('(')).trim();
            });
            bookArr.shift();
            return cb(bookArr);
            
        });
       
    }).on('error', (e) => {
        console.log(e);
    });
};

function getBookImage(bookArr,cb) {

        var ind = getInd(bookArr);
        
        var bookData = {
            title: bookArr.substr(0,ind),
            author:bookArr.substr(ind+2)
        };
        
         var url = 'https://www.googleapis.com/books/v1/volumes?q='+bookData.title.toLowerCase()+'+inauthor:'+bookData.author.toLowerCase()+'&key='+config.apiKey ;
        
        return cb(url);

}

function makeRequest(url,cb) {
    var data = '';
    https.get(url, (res) => {
                            console.log('statuscode', res.statusCode);
                            
                            res.on('data', (d) => {
                                data += d;
                            });
                            
                            
                            res.on('end' , () => {
                               return cb(data);
                             });
                        }).on('error', (e) => {
                            console.error('error in book request',e);
                        }); // end inner http request
}

function handleIt(data,cb) {
    data = JSON.parse(data);
    console.log('data',data.items[0].volumeInfo);
    if (data.totalItems > 0) {
        index += 1;
        return cb(data.items[0].volumeInfo.imageLinks.thumbnail,data.items[0].volumeInfo.title,data.items[0].volumeInfo.authors);
    }
  
}

function read(cb) {
    
    fs.readFile(__dirname+'/names.txt','ascii', function(err,data) {
        if (err) throw err;
        
        var names = data.split(/[0-9.]*/);
      
        names = names.join('').split('\n').map(function(a) {
            return a.trim();
        });
        
        return cb(names);
    });
};

function incIndex() {
    console.log('now I happened',index);
    index += 1;
    
    if (index === 10) {
        console.log('done');
    }
}

function saveUser(user,book) {
    
    user.books.push(book._id);
    user.save(function(err) {
        console.log('in user save',user);
        if (err) {
            console.log('error',err,user)
        } else {
            console.log('i happened')
            incIndex();
        }
    });
}

function saveBook(user,bookImageArr) {
    console.log('now its my turn');
    
 
    var book = new Book({
        title: bookImageArr.title,
        author: bookImageArr.author,
        available:true,
        owner: user._id,
        image: bookImageArr.image
    });
    
    book.save(function(err) {
        if (err) {
            console.log('error',err);
        } else {
            saveUser(user,book);
        }
    });
    
    
};


function makeUser(name,bookImageArr) {
    console.log('now me');
    
    var userData = {
        firstName: name,
        lastName: name,
        email: name+'@EXXAMPLE.COM',
        password:'123456789',
        provider:'local'
    }
    
   var user = new User(userData);
    
    saveBook(user,bookImageArr);
}

function userAndBook(name,bookImageArr) {
    index = 0;

    for (var i = 0; i < name.length;i++) {
        console.log(name[i],bookImageArr[i]);
        makeUser(name[i],bookImageArr[i]);
    }
}


//get a name for user and book/
exports.getData = function() {
    var bookImageArr = [];
        read(function(name) {
            name = name.slice(0,10);
        
             getBook(function(book) {    
                console.log('hi',book,name);
                    for (var i = 0; i < 10; i++) {
                        getBookImage(book[i], function(url) {
                            makeRequest(url,function(data) {
                                handleIt(data,function(bookImage,bookTitle,bookAuthor) {
                                    bookImageArr.push({
                                        title: bookTitle,
                                        author: bookAuthor,
                                        image:bookImage
                                    });
                                    console.log(index,'index');
                                    if (index === 10) {
                                      userAndBook(name,bookImageArr);
                                    }
                                });
                            });
                        })
                    };
           
            }); //end get book function call
        }); //end get names functionc call
    
    
}; //close function



