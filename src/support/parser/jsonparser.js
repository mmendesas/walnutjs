'use strict';

var jp = require('jsonpath');

var jsonparser = {

    jsonObj: null,

    /**
     * Set the current JSON
     */
    init: function (jsonObj) {
        this.jsonObj = jsonObj;
    },

    /**
    * Returns the value from a Key (find by jsonpath)
    */
    getValue: function (path) {
        return jp.query(this.jsonObj, path);
    },

    /**
    * Set the value for a Key (find by jsonpath)
    */
    setValue: function (path, value) {
        jp.value(this.jsonObj, path, value);
    },

    /**
    * Delete the Key (find by jsonpath)
    */
    deleteKey: function (path) {
        let parent = jp.parent(this.jsonObj, path);
        const paths = jp.paths(this.jsonObj, path);
        const item = paths[0].pop();

        if (Array.isArray(parent)) {
            parent.splice(item, 1);
        } else {
            delete parent[item];
        }
    }
}

module.exports = jsonparser;