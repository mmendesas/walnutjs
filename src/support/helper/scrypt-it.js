var crypto = require('crypto');

// Nodejs encryption
var ScryptIt = {

    init(algorithm, keycode) {
        this.keycode = keycode || 'qa-automation-test';
        this.algorithm = algorithm || 'aes-256-cbc';
    },

    encrypt(text) {
        var cipher = crypto.createCipher(this.algorithm, this.keycode)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt(text) {
        try {
            var decipher = crypto.createDecipher(this.algorithm, this.keycode)
            var dec = decipher.update(text, 'hex', 'utf8')
            dec += decipher.final('utf8');
            // ignore when use invalid keycode
            dec = dec.includes('�') ? '': dec;
            return dec || text;
        } catch (err) {         
            return text;
        }
    }
}

module.exports = ScryptIt;