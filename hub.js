// hub.js
// this is where we're going to put our hub together.

// our startHub function
function startHub(app, io, db){
        // io
        io.on('connection', function (socket) {
            console.log('connected');
            socket.on('disconnect', function () {
                console.log('disconnected');
            });
        });

}

exports.start = function(app, io){
  startHub(app, io);
};