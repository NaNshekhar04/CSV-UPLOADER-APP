module.exports.uploader = function(req, res){
    return res.render('uploadCSV', {
        title: 'CSV | upload',
    });
    };



module.exports.viewFiles = function(req, res){
    return res.render('displayCSV', {
        title: 'CSV | view',
        });
};


module.exports.upload = function(req, res){
    console.log('Here posting new csv');
}
