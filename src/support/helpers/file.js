/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs-plus');

module.exports = {

  getTreatedFilename: (folderPath, name) => {
    const filename = path.join(this.getTreatedPath(config.evidencesPath), folderPath.join('/'), name);
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
    return true;
  },

  getTreatedPath: (mypath) => {
    let filepath = mypath;
    if (filepath.startsWith('{default}') || filepath === '') {
      filepath = filepath.replace('{default}', '');
      filepath = path.join(process.cwd(), 'test', filepath);
    } else {
      filepath = path.resolve(filepath);
    }

    return filepath;
  },

  writePNGToFile: (data, filename) => {
    const pngStream = fs.createWriteStream(`${filename}.png`);
    pngStream.write(Buffer.from(data, 'base64'));
    pngStream.end();
  },

  readContentFromFile: filename => fs.readFileSync(filename, 'utf8'),

  writeContentToFile: (data, filename) => {
    fs.writeFileSync(filename, data, 'utf8');
  },
};
