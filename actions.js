exports.set = function(Action, dataToSet){
    var action = new Action({
        title: dataToSet.title,
        data: dataToSet.data
    }).save(function(){
            console.log('saved action');
        });
};

exports.get = function(Action, actions){

    Action.find({}, function(err, data) {
        if (data[0]) {

        }
    });
};