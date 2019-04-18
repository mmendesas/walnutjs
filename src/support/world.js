const selenium = require('selenium-webdriver');
const expect = require('chai').expect;
const assert = require('chai').assert;

const createWorld = () => {
    const props = {
        driver: null,
        selenium: selenium,
        until: selenium.until,
        By: selenium.By,
        by: selenium.By,
        expect: expect,
        assert: assert,
        grosa: 'grosa'
    }

    // expose to step definitions methods
    Object.keys(props).forEach(key => {
        global[key] = runtime[key];
    });
}


// export the "World" required by cucumber to allow it to expose methods within step def's
module.exports = function () {
    createWorld();
    this.World = createWorld;
}
