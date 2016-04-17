'use strict';

var fs = require('fs'),
    https = require('https'),
    User = require('mongoose').model('User'),
    Book = require('mongoose').model('Book'),
    config = require('../../../config/configuration'),
    bookArr = [],
    index = 0;

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

        var ind = bookArr.lastIndexOf('by');
        
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
    
    if (data.totalItems > 0) {
        index += 1;
        return cb(data.items[0].volumeInfo.imageLinks.thumbnail);
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
    console.log('now I happened');
    index += 1;
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

/*function handleIt(bookData,data,user) {
    data = JSON.parse(data);
    
    if (data.totalItems > 0) {
        var image = data.items[0].volumeInfo.imageLinks.thumbnail;
        var book = new Book(bookData);
        book.image = image;
        
        book.save(function(err) {
            console.log(book,'in here');
            if (err) {
                console.log(err);
            } else {
                saveUser(user,book);
            }
        });
    }
}*/

/*function getBookImage(url, bookData,user) {
    var data = '';
    https.get(url, (res) => {
                            console.log('statuscode', res.statusCode);
                            
                            res.on('data', (d) => {
                                data += d;
                            });
                            
                            
                            res.on('end' , () => {
                               handleIt(bookData,data,user);
                             });
                        }).on('error', (e) => {
                            console.error('error in book request',e);
                        }); // end inner http request
}*/

function saveBook(user,book,i) {
    console.log('now its my turn');
     /* fix book data to be saved **/
     var ind = book[i].lastIndexOf('by');
    
     var bookData = {
         title: book[i].substr(0,ind),
         author: book[i].substr(ind+2),
         owner: user._id,
         available:true
     };
     
  //   var title = book[i].substr(0,ind);
//     var author = book[i].substr(ind+2);
     var url = 'https://www.googleapis.com/books/v1/volumes?q='+bookData.title.toLowerCase()+'+inauthor:'+bookData.author.toLowerCase()+'&key='+config.apiKey ;

     /* * * * * *  http request for book image * * * * * * * */
      getBookImage(url, bookData,user);
    
    
}


function makeUser(name,book,i) {
    console.log('now me');
    var userData = {
        firstName: name[i],
        lastName: name[i],
        email: name[i]+i+'@EXXAMPLE.COM',
        password:'123456789',
        provider:'local'
    }
    
   var user = new User(userData);
    
    saveBook(user,book,i);
}

//get a name for user and book/
exports.getData = function() {
    var k = 0;
    var bookImageArr = [];
        read(function(name) {
            name = name.slice(0,10);
        
             getBook(function(book) {    
                console.log('hi',book,name);
                    for (var i = 0; i < 10; i++) {
                        getBookImage(book[i], function(url) {
                            makeRequest(url,function(data) {
                                handleIt(data,function(bookImage) {
                                    bookImageArr.push(bookImage);
                                    console.log(index,'index');
                                    if (index === 10) {
                                        console.log(bookImageArr);
                                    }
                                });
                            });
                        })
                    };
                 
             //   for (var i = 0; i < name.length; i++ ) {
                    
               /*     makeUser(name,book,i);
                    var userData = {
                        firstName: name[i],
                        lastName: name[i],
                        email: name[i]+'@EXAMPLE.COM',
                        password: '123456789',
                        provider:'local'
                    } */
                    
            /*        console.log('index and i ', i, index);
                    if (index === i) {
                        console.log('so I happen');
                        makeUser(name,book,i);
                    }*/
                /*    console.log(user,'the User');
                    user.save(function(err) {
                        console.log('error',err,'the user', user);
                        if (err) throw err;
                        console.log('do I happen?????');
                        var ind = book[i].lastIndexOf('by');
                        var title = book[i].substr(0,ind);
                        var author = book[i].substr(ind+2);
                        console.log('hi the error is here',err);
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
                               
                                handleIt(bookData,data,k);
                                
                            });
                        }).on('error', () => {
                            console.error(e);
                        }); // end inner http request
                      
                        
                    }); //end user save */
                    
                    
             //   } //end for loop
           
            }); //end get book function call
        }); //end get names functionc call
    
    
} //close function



