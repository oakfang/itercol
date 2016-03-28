'use strict';

const Iterator = require('./');

module.exports = function xrange(start, end, step) {
    if (!step) step = 1;
    if (!end) {
        end = start;
        start = 0;
    }
    return new Iterator(function* () {
        for (let x=start; x < end; x+=step) yield x;
    }());
};