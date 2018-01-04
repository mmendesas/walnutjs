'use strict'

var helperString = require('../helper/string');
var expNow = require('./expNow');
var expConcatenate = require('./expConcatenate');
var expCPF = require('./expCPF');
var expCNPJ = require('./expCNPJ');
var expMath = require('./expMath');
var expToNumber = require('./expToNumber');
var expRandom = require('./expRandom');

var mInterpreter = {

    expressionList: ['now', 'cpf', 'cnpj', 'concatenate', 'tonumber', 'math', 'random'],
    melist: null,
    count: null,

    /**
     * Solve a simple or chained expression in a string
     */
    resolveExpression: function (chainExpression) {

        this.meList = {};
        this.count = 0;

        if (!this.isSyntaxCorrect(chainExpression))
            throw 'Syntax error, check the ( and ) characters to complete expression';

        var expAux = chainExpression;

        while (this.expressionNeedCracked(chainExpression)) {
            try {
                this.parseExpressionChain(chainExpression);
                chainExpression = this.resolveExpressionChain(chainExpression);
            } catch (err) {
                var res = helperString.formatString('Error in Expression: {0}. You need to inform correct arguments, try this: \n {1}', [expAux, err.message]);
                console.log('CAGOU >', res);
            }
            break;
        }
        return chainExpression;
    },

    /**
     * Return a expression by name
     */
    findExpression: function (name) {
        switch (name.toLowerCase()) {
            case 'now':
                return expNow;
            case 'concatenate':
                return expConcatenate;
            case 'cpf':
                return expCPF;
            case 'cnpj':
                return expCNPJ;
            case 'math':
                return expMath;
            case 'tonumber':
                return expToNumber;
            case 'random':
                return expRandom;
        }
    },

    /**
     * Validate the expression syntax
     */
    isSyntaxCorrect: function (chainExpression) {
        return helperString.countLetters(chainExpression, '(') === helperString.countLetters(chainExpression, ')');
    },

    /**
     * Check if current has expression to be cracked
     */
    expressionNeedCracked: function (text) {
        for (var i = 0; i < this.expressionList.length; i++) {
            if (text.includes(this.expressionList[i] + '('))
                return true;
        }
        return false;
    },

    /**
     * Parse the chain of expression
     */
    parseExpressionChain: function (text) {
        for (var i = 0; i < this.expressionList.length; i++) {
            var expName = this.expressionList[i];
            if (text.includes(expName)) {
                var expCracked = this.crackExpression(expName, text);
                this.meList[this.count++] = expCracked;
                this.parseExpressionChain(expCracked[1]);
            }
        }
    },

    /**
     * Crack a specific expression
     */
    crackExpression: function (expName, text) {
        var aExp = {};
        var sliceStart = 0, sliceEnd = 0, startPar = 0, endPar = 0;

        var expNameStart = text.indexOf(expName);

        for (var i = expNameStart; i < text.length; i++) {
            var letter = text[i];

            if (letter === '(') {
                startPar++;
                if (startPar === 1) {
                    sliceStart = i;
                }
            }

            if (letter === ')') {
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

    /**
     * Solve a chain of expressions
     */
    resolveExpressionChain: function (chainExpression) {
        var result = '';

        if (!chainExpression.includes('('))
            return chainExpression;

        for (var i = Object.keys(this.meList).length - 1; i >= 0; i--) {

            var key = this.meList[i][0];
            var content = this.meList[i][1];
            var fullContent = this.meList[i][2];

            var expression = this.findExpression(key);

            //solve expressions
            if (!this.expressionNeedCracked(content)) {
                result = expression.parseExpression(content);
                chainExpression = chainExpression.replace(fullContent, result);

                // treat when var has signal
                var itemSignal = helperString.formatString("${{0}}", [result]);
                if (chainExpression.includes(itemSignal)) {
                    chainExpression = chainExpression.replace(itemSignal, result);
                }

                this.updateExpressionList(fullContent, result);
            }
        }

        return chainExpression;
    },

    /**
     * Update a cached list of expressions (for chain expressions)
     */
    updateExpressionList: function (content, replacement) {
        for (var i = 0; i < Object.keys(this.meList).length; i++) {
            // console.log('mteste ', i, this.list[1][1]);
            if (this.meList[i][1].includes(content)) {
                var textContent = this.meList[i][1].replace(content, replacement);
                this.meList[i][1] = textContent;

                var fullContent = this.meList[i][2].replace(content, replacement);
                this.meList[i][2] = fullContent;
            }
        }
    }
};

module.exports = mInterpreter;
