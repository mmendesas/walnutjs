'use strict'

var helperString = require('../helper/string');
var expNow = require('./expNow');

var mInterpreter = {

    expressionList: ['now', 'cpf', 'concatenate'],
    list: {},
    count: 0,

    resolveExpression: function (chainExpression) {

        if (!this.isSyntaxCorrect(chainExpression))
            throw 'Syntax error, check the ( and ) characters to complete expression';

        var expAux = chainExpression;
        console.log('chain: ', chainExpression);

        while (this.expressionNeedCracked(chainExpression)) {
            try {
                this.parseExpressionChain(chainExpression);
                chainExpression = this.resolveExpressionChain(chainExpression);
                console.log('MARCIO', chainExpression);
            } catch (err) {
                var res = helperString.formatString('Error in Expression: {0}. You need to inform correct arguments, try this: \n {1}', [expAux, err.message]);
                // console.log('CAGOU >', res);            
            } finally {
                // this.list = [];
            }
            break;
        }

        return chainExpression;
    },

    isSyntaxCorrect: function (chainExpression) {
        return this.countLetters(chainExpression, '(') === this.countLetters(chainExpression, ')');
    },

    countLetters: function (haystack, needle) {
        var count = 0;
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle)
                count++;
        }
        return count;
    },

    expressionNeedCracked: function (text) {
        for (var i = 0; i < this.expressionList.length; i++) {
            if (text.includes(this.expressionList[i] + '('))
                return true;
        }
        return false;
    },

    parseExpressionChain: function (text) {
        for (var i = 0; i < this.expressionList.length; i++) {
            var expName = this.expressionList[i];
            if (text.includes(expName)) {
                var expCracked = this.crackExpression(expName, text);
                this.list[this.count++] = expCracked;
                this.parseExpressionChain(expCracked[1]);
            }
        }
    },

    crackExpression: function (expName, text) {
        var aExp = {};
        var sliceStart = 0, sliceEnd = 0, startPar = 0, endPar = 0;

        var expNameStart = text.indexOf(expName);

        for (var i = expNameStart; i < text.length; i++) {
            var c = text[i];

            if (c === '(') {
                startPar++;
                if (startPar === 1) {
                    sliceStart = i;
                }
            }

            if (c === ')') {
                endPar++;
            }

            if (startPar > 0) {
                if (startPar === endPar) {
                    sliceEnd = i;
                    break;
                }
            }
        }
        var content = text.substring(sliceStart + 1, sliceEnd);

        // create the array with all data
        aExp[0] = expName;
        aExp[1] = content;
        aExp[2] = helperString.formatString('{0}({1})', [expName, content]);

        return aExp;
    },

    resolveExpressionChain: function (chainExpression) {
        var result = '';

        if (!chainExpression.includes('('))
            return chainExpression;

        for (var i = Object.keys(this.list).length - 1; i >= 0; i--) {

            var key = this.list[i][0];
            var content = this.list[i][1];
            var fullContent = this.list[i][2];

            var expression = this.findExpression(key);

            console.log('key: ', key);
            console.log('content: ', content);
            console.log('fullContent: ', fullContent);
            console.log('expression: ', expression.parseExpression(content));

            //solve expressions
            if (!this.expressionNeedCracked(content)) {
                result = expression.parseExpression(expressionContent);
                chainExpression = chainExpression.replace(fullContent, result);

                // treat when var has signal
                var itemSignal = helperString.formatString("${{0}}", [result]);

                if (chainExpression.contains(itemSignal)) {
                    chainExpression = chainExpression.replace(itemSignal, result);
                }

                this.updateExpressionList(fullContent, result);
            }
        }

        return chainExpression;
    },

    findExpression: function (name) {
        switch (name.toLowerCase()) {
            case 'now':
                return expNow;
        }
    },

    updateExpressionList: function (content, replacement) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i][1].includes(content)) {
                var textContent = this.list[i][1].replace(content, replacement);
                this.list[i][1] = textContent;

                var fullContent = this.list[i][2].replace(content, replacement);
                this.list[i][2] = fullContent;
            }
        }
    }

};

module.exports = mInterpreter;
