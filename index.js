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

const unzipStream = unzip.Parse();

const permcsvStream = csv({delimiter: '\t', ignoreEmpty: true, comment: '#'})
    .on('data', process)
    .on('end', merge);

permcsvStream.end = () => {}

fs.createReadStream('unihan.zip').pipe(unzipStream).on('entry', entry => {
    console.log(entry.path);
    //const csvStream = csv({delimiter: '\t', ignoreEmpty: true, comment: '#'}).on('data', process);
    //entry.unpipe(permcsvStream);
    //permcsvStream.writable = true;
    //permcsvStream._writableState.ending = false;
    //permcsvStream._writableState.ended = false;
    //permcsvStream._writableState.finished = false;
    entry.pipe(permcsvStream);
});


const result = Object.create(null);

function process([character, property, value, ...errors]) {
    const action = handlers.get(property);
    if (action != null) {
        const informations = database.get(character) || Object.create(null);
        informations[property] = action.values(value);
        database.set(character, informations);
    }
}

function merge() {
    console.log('now MERFGING');
    for (let [code, informations] of database) {
        const character = String.fromCodePoint(parseInt(code.substring(2), 16));
        result[character] = {
            pinyin: readings(informations),
            definition: informations.kDefinition
        };
    }
    fs.writeFileSync('./data.json', JSON.stringify(result) , 'utf-8');
}

