const { Then } = require('cucumber');

const { common, element } = helpers;

/**
  * Validate if the element is enabled or disabled
  */
Then(/^user sees the '(.+)-(.+)' (enabled|disabled)$/, (container, key, isOrNot) => {
  const elementFinder = element.getElementFinder(container, key);

  return elementFinder.isEnabled().then((isEnabled) => {
    const compare = (isOrNot === 'enabled');
    const res = (isOrNot === 'enabled') ? 'DISABLED' : 'ENABLED';

    if (isEnabled !== compare) {
      throw new Error(`Element present but ${res}`);
    }
  });
});

/**
 * Validate if the element is not present or displayed on the screen
 */
Then(/^user does not sees the '(.+)-(.+)' on the screen$/, (container, key) => {
  element.getElementFinder(container, key).catch((err) => {
    throw new Error('Element found on the current screen');
  });
});

/**
* Validate text in element
*/
Then(/^the '(.+)-(.+)' has text (equals to|not equals to|which contains|which not contains) '(.*)'$/, (container, key, comparison, text) => {
  const elementFinder = element.getElementFinder(container, key);
  text = common.getTreatedValue(text);

  elementFinder.getText().then((elementText) => {
    switch (comparison) {
      case 'which contains':
        assert(elementText.includes(text), `Expected [${elementText}] not contains [${text}]`);
        break;

      case 'which not contains':
        assert(!elementText.includes(text), `Expected [${elementText}] contains [${text}]`);
        break;

      case 'equals to':
        assert.equal(elementText, text, `Expected [${elementText}] not equals to [${text}]`);
        break;

      case 'not equals to':
        assert.notEqual(elementText, text, `Expected [${elementText}] is equals to [${text}]`);
        break;

      default:
        break;
    }
  });
});

/**
 * Validate value in element
 */
Then(/^the '(.+)-(.+)' has value (equals to|not equals to|which contains|which not contains) '(.*)'$/, (container, key, comparison, text) => {
  const elementFinder = element.getElementFinder(container, key);
  text = common.getTreatedValue(text);

  elementFinder.getAttribute('value').then((elementText) => {
    switch (comparison) {
      case 'which contains':
        assert(elementText.includes(text), `Expected [${elementText}] not contains [${text}]`);
        break;

      case 'which not contains':
        assert(!elementText.includes(text), `Expected [${elementText}] contains [${text}]`);
        break;

      case 'equals to':
        assert.equal(elementText, text, `Expected [${elementText}] not equals to [${text}]`);
        break;

      case 'not equals to':
        assert.notEqual(elementText, text, `Expected [${elementText}] is equals to [${text}]`);
        break;

      default:
        break;
    }
  });
});

/**
* Validate text length in element
*/
Then(/^the '(.+)-(.+)' has text length (equals to|not equals to|greater than|greater than or equals to|less than|less than or equals to) '([0-9]+)'$/, (container, key, comparison, count) => {
  const elementFinder = element.getElementFinder(container, key);

  elementFinder.getText().then((elementText) => {
    switch (comparison) {
      case 'equals to':
        assert.equal(elementText.length, count, `Text length [${elementText}] is not equals to [${count}]`);
        break;

      case 'not equals to':
        assert.notEqual(elementText.length, count, `Text length[${elementText}] is equals to[${count}]`);
        break;

      case 'greater than':
        assert(elementText.length > count, `Text length [${elementText}] is not greater than [${count}]`);
        break;

      case 'greater than or equal to':
        assert(elementText.length >= count, `Text length[${elementText}] is not greater than or equal to[${count}]`);
        break;

      case 'less than':
        assert(elementText.length < count, `Text length [${elementText}] is not less than [${count}]`);
        break;

      case 'less than or equal to':
        assert(elementText.length <= count, `Text length[${elementText}] is not less than or equal to[${count}]`);
        break;

      default:
        break;
    }
  });
});

/**
 * Validate value length in element
*/
Then(/^the '(.+)-(.+)' has value length (equals to|not equals to|greater than|greater than or equals to|less than|less than or equals to) '([0-9]+)'$/, (container, key, comparison, count) => {
  const elementFinder = element.getElementFinder(container, key);

  elementFinder.getAttribute('value').then((elementText) => {
    const { length } = elementText;

    switch (comparison) {
      case 'equals to':
        assert.equal(length, count, `Value length [${length}] is not equals to [${co$ucount}]`);
        break;

      case 'not equals to':
        assert.notEqual(length, count, `Value length[${length}] is equals to[${count}]`);
        break;

      case 'greater than':
        assert(length > count, `Value length [${length}] is not greater than [${count}]`);
        break;

      case 'greater than or equals to':
        assert(length >= count, `Value length[${length}] is not greater than or equal to[${count}]`);
        break;

      case 'less than':
        asserrt(length < count, `Value length [${length}] is not less than [${count}]`);
        break;

      case 'less than or equals to':
        asserrt(length <= count, `Value length[${length}] is not less than or equal to[${count}]`);
        break;

      default:
        break;
    }
  });
});

/**
 * Validate attribute in element
 */
Then(/^the '(.+)-(.+)' has attribute '(.+)' (equals to|not equals to|which contains|which not contains) '(.*)'$/, (container, key, attributeName, comparison, text) => {
  const elementFinder = element.getElementFinder(container, key);

  text = common.getTreatedValue(text);

  elementFinder.getAttribute(attributeName).then((elementText) => {
    switch (comparison) {
      case 'which contains':
        assert(elementText.includes(text), `Expected [${elementText}] not contains [${text}]`);
        break;

      case 'which not contains':
        assert(!elementText.includes(text), `Expected[${elementText}] contains[${text}]`);
        break;

      case 'equals to':
        assert.equal(elementText, text, `Expected[${elementText}]not equals to [${text}]`);
        break;

      case 'not equals to':
        assert.notEqual(elementText, text, `Expected[${elementText}] is equals to[${text}]`);
        break;

      default:
        break;
    }
  });
});

/**
* Compare two string values, can be used with expressions ${x}
*/
Then(/^the '([^-]+)' has value (equals to|not equals to|which contains|which not contains) '(.*)'$/, (text1, comparison, text2) => {
  text1 = common.getTreatedValue(text1);
  text2 = common.getTreatedValue(text2);

  switch (comparison) {
    case 'which contains':
      assert(text1.includes(text2), `Expected[${text1}] not contains[${text2}]`);
      break;

    case 'which not contains':
      assert(!text1.includes(text2), `Expected[${text1}] contains[${text2}]`);
      break;

    case 'equals to':
      assert.equal(text1, text2, `Expected[${text1}] not equals to[${text2}]`);
      break;

    case 'not equals to':
      assert.notEqual(text1, text2, `Expected[${text1}] is equals to[${text2}]`);
      break;

    default:
      break;
  }
});
