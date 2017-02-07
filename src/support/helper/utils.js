var lastStyleValue = '';
// var lastStyleElement;

var utils = {

    lastStyleElement: null,

    nutHighlightElement: function (elementFinder) {
        var pattern = "border: 3px solid red;";

        elementFinder.getAttribute('style').then(function getAttr(attribute) {
            var newStyle = attribute + pattern;
            if (this.lastStyleElement) {
                this.lastStyleElement.getAttribute('style').then(function getOldStyle(oldStyle) {
                    oldStyle = oldStyle.replace(pattern, '');
                    if (lastStyleValue === '') {
                        console.log('entrou aqui');
                        browser.executeScript("arguments[0].removeAttribute('style');", this.lastStyleElement);
                    } else {
                        browser.executeScript("arguments[0].setAttribute('style', '{0}');".format(oldStyle), this.lastStyleElement);
                    }
                });
            }
            browser.executeScript("arguments[0].setAttribute('style', '{0}');".format(newStyle), elementFinder);
            lastStyleValue = attribute;
            lastStyleElement = elementFinder;
        });
    }
};

module.exports = utils;