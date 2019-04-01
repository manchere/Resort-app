const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findOne({
        _id: id
    }, (err, user) => {
        done(err, user);
    })
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'mobilenumber'
}, (mobilenumber, password, done) => {
    User.findOne({
        'mobileNumber': mobilenumber
    }, (err, user) => {
        if (err) return done(err);
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username or password'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Incorrect username or password'
            });
        }
        return done(null, user);
    })
}))

module.exports = passport;
