const path = require('path');
const config = require('../config');
const fs = require('fs-plus');

module.exports = {

  getTreatedFilename: function (folder_path, name) {
    const filename = path.join(this.getTreatedPath(config.evidencesPath), folder_path.join('/'), name);

    this.ensureDirectoryExistence(filename);

    return filename;
  },

  ensureDirectoryExistence: function (filePath) {
    const dirname = path.dirname(filePath);

    if (fs.existsSync(dirname)) {
      return true;
    }
    this.ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  },

  getTreatedPath: function (filepath) {
    if (filepath.startsWith('{default}') || filepath == '') {
      filepath = filepath.replace('{default}', '');
      filepath = path.join(process.cwd(), 'test', filepath);
    } else {
      filepath = path.resolve(filepath);
    }

    return filepath;
  },

  writePNGToFile: function (data, filename) {
    const pngStream = fs.createWriteStream(filename + '.png');
    pngStream.write(new Buffer(data, 'base64'));
    pngStream.end();
  },

  readContentFromFile: function (filename) {
    return fs.readFileSync(filename, 'utf8');
  },

  writeContentToFile: function (data, filename) {
    fs.writeFileSync(filename, data, 'utf8');
  }
}
