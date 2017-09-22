'use strict';

const { colorConsole } = require('tracer');

module.exports = colorConsole({
    format : '{{file}}:{{line}} {{message}}',
});