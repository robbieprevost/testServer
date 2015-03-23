module.exports = function (db, User, Action) {
    var express = require('express');
    var session = require('express-session');
    var MongoStore = require('connect-mongo')(session);
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var passport = require('./auth')(User);
    var routes = require('./routes')();
    var path = require('path');
    var flash = require('connect-flash');
    var app = express();
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(__dirname + '/views'));
    app.set('views', __dirname + '/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.use(cookieParser());
    app.use(session({
        store: new MongoStore({ mongooseConnection: db }),
        secret : 'blahblahblahyaketysmackety',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', routes.home);

    app.get('/login', routes.login);
    app.post('/login', passport.authenticate('local-login', {
        failureRedirect: '/login',
        successRedirect: '/user'
    }));

    app.get('/register', routes.register);
    app.post('/register', passport.authenticate('local-signup', {
        failureRedirect: '/register',
        successRedirect: '/user'
    }));

    app.get('/user', routes.user);

    app.get('/user/data', routes.userData);

    app.get('/auth/google',
        passport.authorize('google',{ scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/gmail.modify',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/youtube'],
            accessType: 'offline', approvalPrompt: 'force'}));

    app.get('/auth/google/callback',
        passport.authorize('google', { failureRedirect: '/profile' }),
        function(req, res) {

            res.redirect('/');
        });

    return app;
};


