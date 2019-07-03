const expNow = require('./expNow');
const expConcatenate = require('./expConcatenate');
const expCPF = require('./expCPF');
const expCNPJ = require('./expCNPJ');
const expMath = require('./expMath');
const expToNumber = require('./expToNumber');
const expRandom = require('./expRandom');

const string = require('../helpers/string');
const logger = require('../helpers/logger');

/**
  * Validate the expression syntax
  */
const isSyntaxCorrect = chainExpression => string.countLetters(chainExpression, '(') === string.countLetters(chainExpression, ')');

/**
 * Return a expression by name
 */
const findExpression = (name) => {
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
    default:
      return 'no-expression-selected';
  }
};

class Interpreter {
  constructor() {
    this.expressionList = ['now', 'cpf', 'cnpj', 'concatenate', 'tonumber', 'math', 'random'];
  }

  /**
   * Solve a simple or chained expression in a string
   */
  resolveExpression(expression) {
    let chainExpression = expression;
    this.meList = {};
    this.count = 0;

    if (!isSyntaxCorrect(chainExpression)) {
      throw new Error('Syntax error, check the ( and ) characters to complete expression');
    }

    const expAux = chainExpression;

    while (this.expressionNeedToBeCracked(chainExpression)) {
      try {
        this.parseExpressionChain(chainExpression);
        chainExpression = this.resolveExpressionChain(chainExpression);
      } catch (err) {
        const msg = `\n\nInvalid use of expression >> ${expAux}.\n\n You need to inform correct arguments, try this: \n ${err.message}`;
        logger.error(msg);
      }
      break;
    }

    return chainExpression;
  }

  /**
   * Check if current has expression to be cracked
   */
  expressionNeedToBeCracked(text) {
    for (let i = 0; i < this.expressionList.length; i += 1) {
      if (text.includes(`${this.expressionList[i]}(`)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Parse the chain of expression
   */
  parseExpressionChain(text) {
    for (let i = 0; i < this.expressionList.length; i += 1) {
      const expName = this.expressionList[i];

      if (text.includes(expName)) {
        const expCracked = this.crackExpression(expName, text);

        this.meList[this.count += 1] = expCracked;
        this.parseExpressionChain(expCracked[1]);
      }
    }
  }

  /**
   * Crack a specific expression
   */
  // eslint-disable-next-line class-methods-use-this
  crackExpression(expName, text) {
    const aExp = {};
    let sliceStart = 0; let sliceEnd = 0; let startPar = 0; let
      endPar = 0;

    const expNameStart = text.indexOf(expName);

    for (let i = expNameStart; i < text.length; i += 1) {
      const letter = text[i];

      if (letter === '(') {
        startPar += 1;
        if (startPar === 1) {
          sliceStart = i;
        }
      }

      if (letter === ')') {
        endPar += 1;
      }

      if (startPar > 0) {
        if (startPar === endPar) {
          sliceEnd = i;
          break;
        }
      }
    }
    const content = text.substring(sliceStart + 1, sliceEnd);

    // create the array with all data
    aExp[0] = expName;
    aExp[1] = content;
    aExp[2] = `${expName}(${content})`;

    return aExp;
  }

  /**
   * Solve a chain of expressions
   */
  resolveExpressionChain(chain) {
    let chainExpression = chain;
    let result = '';

    if (!chainExpression.includes('(')) {
      return chainExpression;
    }

    for (let i = Object.keys(this.meList).length; i > 0; i -= 1) {
      const key = this.meList[i][0];
      const content = this.meList[i][1];
      const fullContent = this.meList[i][2];

      const expression = findExpression(key);

      // solve expressions
      if (!this.expressionNeedToBeCracked(content)) {
        result = expression.parseExpression(content);
        chainExpression = chainExpression.replace(fullContent, result);

        // treat when var has signal
        const itemSignal = `\${${result}}`;

        if (chainExpression.includes(itemSignal)) {
          chainExpression = chainExpression.replace(itemSignal, result);
        }

        this.updateExpressionList(fullContent, result);
      }
    }

    return chainExpression;
  }

  /**
   * Update a cached list of expressions (for chain expressions)
   */
  updateExpressionList(content, replacement) {
    for (let i = 1; i <= Object.keys(this.meList).length; i += 1) {
      if (this.meList[i][1].includes(content)) {
        const textContent = this.meList[i][1].replace(content, replacement);
        this.meList[i][1] = textContent;

        const fullContent = this.meList[i][2].replace(content, replacement);
        this.meList[i][2] = fullContent;
      }
    }
  }
}

module.exports = new Interpreter();
