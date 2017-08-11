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

    getTreatedPath: function (filepath) {
        if (filepath.startsWith('{default}') || filepath == '') {
            filepath = filepath.replace('{default}', '');
            filepath = process.cwd() + '/test/' + filepath;
        } else {
            filepath = path.resolve(filepath);
        }
        return filepath;
    },

    writePNGToFile: function (data, filename) {
        var pngStream = fs.createWriteStream(filename + '.png');
        pngStream.write(new Buffer(data, 'base64'));
        pngStream.end();
    },

    readContentFromFile: function (filename) {
        return fs.readFileSync(filename, 'utf8');
    },

    writeContentToFile: function (data, filename) {
        fs.writeFile(filename, data, 'utf8');
    }
}

module.exports = file;