var fs = require('fs');
var path = require("path");

init =  function(router){
    router.get('/cache', function (req, res) {
        res.json("sdfsdfsdfsfs")
    });

    router.get('/streams', function (req, res) {
        const testFolder = './streams/';
        const fs = require('fs');

        fs.readdir(testFolder, (err, files) => {
            files = files.map( file => file.split('.')[0]);
            res.json(files)
        })
    });

    router.get('/stream/:id', function (req, res) {
        let file = req.params.id + ".log"
        res.download(path.resolve(__dirname+ '/../streams/' + file), file)
    });


}

module.exports.init = init;