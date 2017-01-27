'use strict';

module.exports = function StringHelper() {
    return {
        slugify: function (string) {
            return string.toLowerCase().replace(/[^a-z0-9]+/gi, '-');
        }        
    };
} ();