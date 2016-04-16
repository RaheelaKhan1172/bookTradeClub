'use strict';

var fs = require('fs'),
    https = require('https'),
    User = require('mongoose').model('User'),
    Book = require('mongoose').model('Book'),
    config = require('../../../config/configuration'),
    bookArr = [];

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

function handleIt(bookData,data) {
    data = JSON.parse(data);
    
    if (data.totalItems > 0) {
        var image = data.items[0].volumeInfo.imageLinks.thumbnail;
        var book = new Book(bookData);
        book.image = image;
        
        book.save(function(err) {
            console.log(book,'in here');
            if (err) throw err;
            
        });
    }
}

//get a name for user;
exports.getData = function() {
        read(function(name) {
            name = name.slice(10,20);
        
             getBook(function(book) {
                book = book.slice(0,10);
                
                console.log(book,name);
                 
                for (var i = 0; i < name.length; i++ ) {
                    
                    var userData = {
                        firstName: name[i],
                        lastName: name[i],
                        email: name[i]+i+'@example.com',
                        password: '123456789',
                        provider:'local'
                    }
                    
                    var user = new User(userData);
                    
                    console.log(user,'the User');
                    user.save(function(err) {
                        if (err) throw err;
                        
                        var ind = book[i].lastIndexOf('by');
                        var title = book[i].substr(0,ind);
                        var author = book[i].substr(ind+2);
                        
                        var url = 'https://www.googleapis.com/books/v1/volumes?q='+title.toLowerCase()+'+inauthor:'+author.toLowerCase()+'&key='+config.apiKey ;
                        
                        var data = '';
                        https.get(url, (res) => {
                            console.log('statuscode', res.statusCode);
                            
                            res.on('data', (d) => {
                                data += d;
                            });
                            
                            
                            res.on('end' , () => {
                                console.log('data',data);
                                var bookData = {
                                    available:true,
                                    owner: user._id,
                                    title: title,
                                    author: author
                                };
                               
                                handleIt(bookData,data);
                                
                            });
                        }).on('error', () => {
                            console.error(e);
                        }); // end inner http request
                      
                        
                    }); //end user save
                    
                    
                } //end for loop
                 
            }); //end get book function call
        }); //end get names functionc call
    
    
} //close function



