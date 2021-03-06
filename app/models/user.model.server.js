var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    city: String,
    state: String,
    email: {
        type: String,
        required:[true, 'Email cannot be blank'],

        match: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/,
        validate: [
            function(email) {
                return email.match(/^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/);
            },
             'Please input a valid email address'
        ]
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password.length >= 6;
            },
            'Password should be atleast 6 letters'
        ],
        required: true
    },
    salt: {
        type: String
    },
    provider: {
        type: String
    },
    providerId: String,
    providerData: {},
    books: [{
        type: Schema.ObjectId,
        ref: 'Book'
    }],
    requestMade: [{
        type:Schema.ObjectId,
        ref: 'Trade'
    }],
    requestBy: [{
        type: Schema.ObjectId,
        ref:'Trade'
    }]
}, {collection:'userschema'});


UserSchema.pre('save', function(next) {
    if (this.email) {
        console.log('this', this.email);
        this.email = this.email.toUpperCase();
    }
    next();
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
        
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password,this.salt,10000,64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

mongoose.model('User',UserSchema);