/*describe('Dashboard tests',function() {
    describe('Sign up and add a book', function() {
        it('Should sign up, navigate to add a book, and add a book', function() {
            browser.get('http://localhost:3030/#!/signup');
            
            element(by.model('user.firstName')).sendKeys('test14');
            element(by.model('user.lastName')).sendKeys('test14');
            element(by.model('user.email')).sendKeys('test18@test.com');
            element(by.model('user.password')).sendKeys('123456789');
            
            element(by.css('button[type=submit]')).click();
            
            browser.sleep(3000);
            
            browser.getCurrentUrl().then(function(url) {
                expect(url.indexOf('dashboard') !== -1).toBe(true);
            }).catch(function(error) {
                expect(error).toBe(null);
            });
            
     
            element(by.css('button[value=add]')).click();
            browser.sleep(3000);
            element(by.model('book.title')).sendKeys('a book');
            element(by.model('book.author')).sendKeys('an author');
            element(by.css('button[type=submit]')).click();
            browser.sleep(4000)
            browser.getCurrentUrl().then(function(url) {
                expect(url.indexOf('books') !== -1).toBe(true);
            }).catch(function(error) {
                expect(error).toBe(null);
            });
        });
        
        it('Should delete a book without error', function() {
            
            element(by.css('button[type=button]')).click();
            
            browser.sleep(3000);
            browser.switchTo().alert().accept();
            browser.getCurrentUrl().then(function(url) {
                expect(url.indexOf('dashboard') !== -1).toBe(true);
            }).catch(function(error) {
                expect(error).toBe(null);
            });
        }); 
    });
}); */
