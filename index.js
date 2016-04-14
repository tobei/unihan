'use strict';

const unzip = require('unzip');
const request = require('request');
const csv = require('fast-csv');
const assert = require('assert');

const handlers = new Map();
const database = Object.create(null);

request('http://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip')
    .pipe(unzip.Parse())
    .on('entry', entry => {
        entry.pipe(csv({delimiter: '\t', ignoreEmpty: true, comment: '#'}))
        .on('data', ([character, property, value, ...errors]) => {
            assert(errors.length == 0);
            console.log(character.slice(2));
            character = parseInt(character.slice(2)), 16;
            console.log(character);
            console.log(value);
        })
    });

