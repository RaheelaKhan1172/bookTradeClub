describe('View', function() {
    it('Should have a background on main page, signin and signup', function() {
        browser.get('http://localhost:3030/#!/');
        
        
        var elem = element(by.tagName('body'));
        
         var img = elem.getCssValue("background-image").then(function(e) {
             expect(e.indexOf('books_texture3014.jpg')).not.toBe(-1);
         });
        browser.sleep(3000);
        
        browser.get('http://localhost:3030/#!/signin');
        
        var elem = element(by.tagName('body'));
        
         var img = elem.getCssValue("background-image").then(function(e) {
             expect(e.indexOf('books_texture3014.jpg')).not.toBe(-1);
         });
        
        browser.sleep(2000);
        
        browser.get('http://localhost:3030/#!/signup');
        
        var elem = element(by.tagName('body'));
        
         var img = elem.getCssValue("background-image").then(function(e) {
             expect(e.indexOf('books_texture3014.jpg')).not.toBe(-1);
         });
    });
});
    

describe('User E2E Tests:', function() {
    describe('New User Page', function() {
        it('Should be able to create a new user', function() {
            browser.get('http://localhost:3030/#!/signup');
            
            element(by.model('user.firstName')).sendKeys('cool');
            element(by.model('user.lastName')).sendKeys('test');
            element(by.model('user.email')).sendKeys('cooltest18@something.com');
            element(by.model('user.password')).sendKeys('123456789');
            
            element(by.css('button[type=submit]')).click();
            
            // peek at browser for a few seconds to see what's going on
            browser.sleep(5000);
            
            
            
            browser.getCurrentUrl().then(function(url) {
                expect(url.indexOf('signup') === -1).toBe(true);
            }).catch(function(error) {
                expect(error).toBe(null);
            });
        });
        
        it('Should be able to sign back in without errors', function() {
            
            element(by.css('button[ng-click="signOut()"]')).click();
            
            browser.executeScript('return window.localStorage;').then(function(store) {
                expect(store.length === 0).toBe(true);
            });
            
            
            browser.get('http://localhost:3030/#!/signin');
            
            element(by.model('userLogin.username')).sendKeys('cooltest18@something.com');
            element(by.model('userLogin.password')).sendKeys('123456789');
            browser.sleep(3000);
            element(by.css('button[type=submit]')).click();
            
            browser.getCurrentUrl().then(function(url) {
                expect(url.indexOf('signin') === -1).toBe(true);
            });
            
            
            
        });
        
        it('Should not have the same background as main page', function() {
        browser.get("http://localhost:3030/#!/dashboard");
        
        var elem = element(by.tagName('body'));
        
         var img = elem.getCssValue("background-image").then(function(e) {
             expect(e.indexOf('books_texture3014.jpg')).toBe(-1);
         });
        
        browser.sleep(4000);
        });
        
        it('Should navigate to books and make a request on an available book', function() {
            browser.get("http://localhost:3030/#!/books");
            
            
            element(by.css('button[type=button]')).click();
            
            browser.sleep(5000);
            
            browser.get("http://localhost:3030/#!/dashboard");
            browser.sleep(3000);
            
            element(by.css('button[value=tradeUser]')).click();
            
            browser.sleep(2000);
            
            element(by.binding('trade.status')).getText().then(function(status) {
                expect(status).toBe('Pending');
            });
            
            
        });
        
        it('Should be able to cancel a trade request without errors', function() {
            browser.sleep(3000);
            
            element(by.css('button[class=cancel]')).click();
            
            expect(by.css('span[class=null]')).isPresent().toBe(true);
            });
        })
    }); 
