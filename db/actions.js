module.exports = function(mongoose){
        var ActionSchema = new mongoose.Schema({
            title : String,
            data : Object
        });
        var Action = mongoose.model('action', ActionSchema);
        return Action;
};