const helperString = require('../helper/string');
const interpreter = require('./interpreter');

describe('NOW Tests', () => {
    it('should be validate the expression NOW', () => {
        var date = new Date();
        var hour = helperString.addZero(date.getHours());
        var min = helperString.addZero(date.getMinutes());
        var sec = helperString.addZero(date.getSeconds());

        var expected = helperString.formatString('{0}:{1}:{2}', [hour, min, sec]);
        var received = interpreter.resolveExpression('now(HH:mm:ss)');

        expect(expected).toEqual(received);
    });

    it('should be validate the expression NOW with operators', () => {
        var date = new Date();
        var hour = helperString.addZero(date.getHours() + 2);
        var min = helperString.addZero(date.getMinutes());
        var sec = helperString.addZero(date.getSeconds());

        var expected = helperString.formatString('{0}:{1}:{2}', [hour, min, sec]);
        var received = interpreter.resolveExpression('now(HH:mm:ss|+2h)');

        expect(expected).toEqual(received);
    });

});