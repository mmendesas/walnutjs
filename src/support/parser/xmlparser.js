const xpath = require('xpath');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const serializer = new XMLSerializer();

var xmlparser = {

  xmlContent: null,
  xmlContentEdited: '',

  /**
   * Set the current xmlContent
   */
  init: (xmlContent) => {
    this.xmlContent = xmlContent;
  },

  /**
   * Returns the value from a Tag (find by xpath)
   */
  getTagValue: (xpath_expression) => {
    const doc = new DOMParser().parseFromString(this.xmlContent);
    const node = xpath.select(xpath_expression, doc);
    return node[0].textContent;
  },

  /**
   * Set the value for a Tag (find by xpath)
   */
  setTagValue: function (path, value) {
    const mdoc = new DOMParser().parseFromString(this.xmlContent, 'text/xml');
    const mnode = xpath.select(path, mdoc);

    mnode[0].textContent = value;
    this.xmlContentEdited = serializer.serializeToString(mdoc);
  }
};

module.exports = xmlparser;
