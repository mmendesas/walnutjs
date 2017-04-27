var xpath = require('xpath');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var serializer = new XMLSerializer();

var xmlparser = {

    xmlContent: null,
    xmlContentEdited: '',

    /**
     * Set the current xmlContent
     */
    init: function (xmlContent) {
        this.xmlContent = xmlContent;
    },

    /**
     * Returns the value from a Tag (find by xpath)
     */
    getTagValue: function (xpath_expression) {
        var doc = new DOMParser().parseFromString(this.xmlContent);
        var node = xpath.select(xpath_expression, doc);
        return node[0].textContent;
    },

    /**
     * Set the value for a Tag (find by xpath)
     */
    setTagValue: function (path, value) {
        var mdoc = new DOMParser().parseFromString(this.xmlContent, 'text/xml');
        var mnode = xpath.select(path, mdoc);
        mnode[0].textContent = value;
        this.xmlContentEdited = serializer.serializeToString(mdoc);
    }
}

module.exports = xmlparser;