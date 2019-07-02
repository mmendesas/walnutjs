const path = require('path');
const fs = require('fs-plus');

module.exports = {

  getTreatedFilename: (folder_path, name) => {
    const filename = path.join(this.getTreatedPath(config.evidencesPath), folder_path.join('/'), name);
    this.ensureDirectoryExistence(filename);
    return filename;
  },

  ensureDirectoryExistence: (filePath) => {
    const dirname = path.dirname(filePath);

    if (fs.existsSync(dirname)) {
      return true;
    }
    this.ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  },

  getTreatedPath: (filepath) => {
    if (filepath.startsWith('{default}') || filepath == '') {
      filepath = filepath.replace('{default}', '');
      filepath = path.join(process.cwd(), 'test', filepath);
    } else {
      filepath = path.resolve(filepath);
    }

    return filepath;
  },

  writePNGToFile: (data, filename) => {
    const pngStream = fs.createWriteStream(`${filename}.png`);
    pngStream.write(new Buffer(data, 'base64'));
    pngStream.end();
  },

  readContentFromFile: filename => fs.readFileSync(filename, 'utf8'),

  writeContentToFile: (data, filename) => {
    fs.writeFileSync(filename, data, 'utf8');
  },
};
