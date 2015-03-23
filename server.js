var http = require('http'),
    mongoose = require('mongoose'),
    db = require('./db/db')(mongoose),
    User = require('./db/users')(mongoose),
    Action = require('./db/actions')(mongoose),
    hub = require('./hub'),
    app = require('./app')(db, User, Action);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    var io = require('socket.io').listen(server);
    hub.start(app, io, db);

});