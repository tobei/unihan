'use strict';

const unzip = require('unzip');
const request = require('request');
const csv = require('fast-csv');
const assert = require('assert');
const kMandarin = new (require('./fields/kMandarin'));


const handlers = new Map();
const database = Object.create(null);

request('http://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip')
    .pipe(unzip.Parse())
    .on('entry', entry => {
        entry.pipe(csv({delimiter: '\t', ignoreEmpty: true, comment: '#'}))
        .on('data', ([character, property, value, ...errors]) => {
            if (property == 'kMandarin') {
                //let val = kMandarin.test(value.normalize('NFC'));
                //if (!val) {
                    console.log(character + ' ' + property + ' ' + value);
                //}
            }
        })
    });

