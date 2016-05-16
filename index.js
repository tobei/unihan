'use strict';

const unzip = require('unzip');
const request = require('request');
const csv = require('fast-csv');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const handlers = new Map();
registerField('kMandarin');
registerField('kDefinition');
registerField('kHanyuPinlu');
registerField('kHanyuPinyin');
registerField('kXHC1983');

function registerField(name) {
    handlers.set(name, require(`./fields/${name}`));
}


const database = Object.create(null);

fs.createReadStream('unihan.zip')
    .pipe(unzip.Parse()).on('entry', entry => {
        entry.pipe(csv({delimiter: '\t', ignoreEmpty: true, comment: '#'})).on('data', ([character, property, value, ...errors]) => {
            const action = handlers.get(property);
            if (action != null) {
                action.values(value);
            }
        })
    }
);

