'use strict';

var fs = require('fs'),
    https = require('https'),
    User = require('mongoose').model('User'),
    Book = require('mongoose').model('Book'),
    bookArr = [],
    userArr = [];

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


//get a name for user;
exports.getData = function() {
    
    
        
        read(function(name) {
            name = name.slice(0,10);
        
             getBook(function(book) {
                book = book.slice(0,10);
                
                console.log(book,name);
            });
        });
    
    
    
    
}



