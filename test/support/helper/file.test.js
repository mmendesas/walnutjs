const file = require('../../../src/support/helpers/file');
const fs = require('fs');

describe('FILE Tests', () => {
  const folder_path = ['my', 'folder'];

  describe('getTreatedPath', () => {
    it('should process path with empty param', () => {
      const path = file.getTreatedPath('');
      expect(path).toEqual(`${process.cwd()}/test`);
    });

    it('should process path with default param', () => {
      const path = file.getTreatedPath('{default}/grosa');
      expect(path).toEqual(`${process.cwd()}/test/grosa`);
    });
  });

  describe('write and read files', () => {
    const filename = './test.txt';
    const content = 'test 123';

    afterAll((done) => {
      fs.unlinkSync(filename);
      done()
    });

    it('should write simple file', () => {
      file.writeContentToFile(content, filename);
      const exists = fs.existsSync(filename);
      expect(exists).toBeTruthy();
    });

    it('should read simple file', () => {
      const value = file.readContentFromFile(filename);
      expect(value).toEqual(content);
    });
  });

  describe('ensureDirectoryExistence', () => {
    it('check if directory exist', () => {
      const exists = file.ensureDirectoryExistence(`${process.cwd()}`);
      expect(exists).toBeTruthy();
    });
  });
});
