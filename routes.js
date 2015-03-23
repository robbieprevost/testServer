module.exports = function() {

    var functions = {};

    functions.home = function(req, res) {
        if (req.session.passport.user === undefined) {
            res.render('index', {title: 'home'});
        } else {
            res.redirect('/user');
        }
    };

    functions.login = function(req, res) {
        if (req.session.passport.user === undefined) {
            res.render('login', {title: 'login'});
        } else {
            res.redirect('/user');
        }
    };

    functions.register = function(req, res) {
        if (req.session.passport.user === undefined) {
            res.render('register', {title: 'register'});
        } else {
            res.redirect('/user');
        }
    };

    functions.user = function(req, res) {
        if(req.cookies.user) {
            console.log(JSON.parse(req.cookies.user).user.username);
        }
        if (req.session.passport.user === undefined) {
            res.redirect('/login');
        } else {
            res.render('user', { title: 'user' })
        }
    };

    functions.userData = function(req, res) {
        if (req.session.passport.user === undefined) {
            res.redirect('/login');
        } else {
            res.send({ user : app.locals.user });
        }
    };

    return functions;
};
