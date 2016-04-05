describe('User E2E Tests:', function() {
    describe('New User Page', function() {
        it('Should be able to create a new user', function() {
            browser.get('http://localhost:3030/#!/signup');
            
            element(by.model('user.firstName')).sendKeys('cool');
            element(by.model('user.lastName')).sendKeys('test');
            element(by.model('user.email')).sendKeys('cooltest1@something.com');
            element(by.model('user.password')).sendKeys('123456789');
            
            element(by.css('button[type=submit]').click();
            
            browser.sleep(5000);
            browser.getCurrentUrl().then(function(url) {
                expect(url.indexOf('signup') === -1).toBe(true);
            }).catch(function(error) {
                expect(error).toBe(true);
            });
            
            
        });
    });
});