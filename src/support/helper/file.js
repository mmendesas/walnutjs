var path = require('path');
var config = require('../config');
var fs = require('fs');

var file = {

    getTreatedFilename: function (folder_path, name) {
        var filename = path.join(this.getTreatedPath(config.evidencesPath), folder_path.join('/'), name);
        this.ensureDirectoryExistence(filename);
        return filename;
    },

    ensureDirectoryExistence: function (filePath) {
        var dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }
        this.ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    },

    getTreatedPath: function (path) {
        if (path.startsWith('.') || path == '') {
            path = path.replace('.', '');

            return process.cwd() + '/test/logs' + path;
        }
        return path;
    },

    writeToFile: function (data, filename) {
        var pngStream = fs.createWriteStream(filename + '.png');
        pngStream.write(new Buffer(data, 'base64'));
        pngStream.end();
    }
}

module.exports = file;