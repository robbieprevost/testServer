var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
function configPassport(User) {
    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true
    },
        function (req, username, password, done) {
            User.findOne({ username:username },function(err, user){
                console.log(user + ' login');
                if(user) {
                    if (user && user.validPassword(password)) {
                        app.locals.user = user;
                        app.locals.user.password = '';
                        return done(null, user);
                    }else {
                        return done(null, false);
                    }
                }else {
                    return done(null, false);
                }
            });

        }
    ));

    passport.use('local-signup', new LocalStrategy({
            passReqToCallback : true
        },
            function (username, password, done) {
            User.findOne( {username:username },function(err, user){
                console.log(user + ' signup');
                if(user) {
                    if (user && user.validPassword(password)) {
                        return done(null, user);
                    }else {
                        return done(null, false);
                    }
                }else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        app.locals.user = {
                            username: username
                        };
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

        }
    ));

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });



    return passport;
}
module.exports = function (User) {
        var passportConfig = configPassport(User);
        return passportConfig;
};
