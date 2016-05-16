'use strict';

const unzip = require('unzip');
const request = require('request');
const csv = require('fast-csv');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const readings = require('./modules/readings');

const handlers = new Map();
registerField('kMandarin');
registerField('kDefinition');
registerField('kHanyuPinlu');
registerField('kHanyuPinyin');
registerField('kXHC1983');

function registerField(name) {
    handlers.set(name, require(`./fields/${name}`));
}

const database = new Map();

fs.createReadStream('unihan.zip')
    .pipe(unzip.Parse()).on('entry', file => {
        file.pipe(csv({delimiter: '\t', ignoreEmpty: true, comment: '#'})).on('data', ([character, property, value, ...errors]) => {
            const action = handlers.get(property);
            if (action != null) {
                const informations = database.get(character) || Object.create(null);
                informations[property] = action.values(value);
                database.set(character, informations);
            }
        })
    }
);

setTimeout(merge, 10000);

const result = Object.create(null);

function merge() {
    for (let [code, informations] of database) {

        //console.log(parseInt(code.substring(2), 16));
        const character = String.fromCodePoint(parseInt(code.substring(2), 16));
        //console.log(character);
        result[character] = {
            pinyin: readings(informations),
            definition: informations.kDefinition
        };
    }
    fs.writeFileSync('./data.json', JSON.stringify(result) , 'utf-8');
}

