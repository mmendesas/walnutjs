const wdio = require('webdriverio');
const assert = require('assert');
const path = require('path');

const opts = {
  host: 'localhost',
  port: 4723,
  // logLevel: 'info',
  capabilities: {
    platformName: 'iOS',
    platformVersion: '12.2',
    deviceName: 'iPhone X',
    app: path.resolve(__dirname, './TestApp.app.zip'),
    automationName: 'XCUITest',
  },
};

async function main() {
  const client = await wdio.remote(opts);

  client.deleteAllCookies();
  client.refresh();



  const elementId = await client.findElement('accessibility id', 'TextField1');
  client.elementSendKeys(elementId.ELEMENT, 'Marcio Mendes');

  const elementValue = await client.findElement('accessibility id', 'TextField1');

  await client.getElementAttribute(elementValue.ELEMENT, 'value').then((attr) => {
    assert.equal(attr, 'Marcio Mendes');
  });

  const element = await client.findElement('accessibility id', 'show alert');
  await client.elementClick(element.ELEMENT);

  assert.equal(await client.getAlertText(), 'Cool title\nthis alert is so cool.');

  await client.deleteSession();
}

main();
