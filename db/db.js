
function connectMongoose(mongoose) {
    mongoose.connect('localhost:27017');
    return mongoose.connection;
}
module.exports = function(mongoose){
    var connection = connectMongoose(mongoose);
    return connection;
};