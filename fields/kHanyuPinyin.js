'use strict';

class kHanyuPinyin {

    get pattern() {
        return /(\d{5}\.\d{2}0,)*\d{5}\.\d{2}0:([a-z\u0300-\u0302\u0304\u0308\u030C]+,)*[a-z\u0300-\u0302\u0304\u0308\u030C]+/g;
    }

    get field() {
        return 'kHanyuPinyin';
    }

    values(value) {
        const readings = value.normalize('NFD').match(this.pattern).map(entry => {
            entry.normalize('NFC').substring(entry.indexOf(':') + 1).split(',');
        });
        return readings;
    }

}

module.exports = new(kHanyuPinyin);