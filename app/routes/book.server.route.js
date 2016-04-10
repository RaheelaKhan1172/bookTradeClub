var book = require('../controllers/book.server.controller');

module.exports = function(app) {
    
    app.route('/api/books')
    .get(book.books)
    .post(book.addBook);
    
    
    app.route('/api/books/:id')
    .get(book.getBook)
    .delete(book.remove);
    
    app.param('id', book.bookById);
    
};