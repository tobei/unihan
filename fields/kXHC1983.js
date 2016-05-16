'use strict';

class kXHC1983 {

    get pattern() {
        return /[0-9]{4}\.[0-9]{3}\*?(,[0-9]{4}\.[0-9]{3}\*?)*:[a-z\u0300\u0301\u0304\u0308\u030C]+/g;
    }

    get field() {
        return 'kXHC1983';
    }

    values(value) {
        const readings = value.normalize('NFD').match(this.pattern).map(entry => {
            return entry.normalize('NFC').substring(entry.indexOf(':') + 1);
        });
        console.log(readings);
        return readings;
    }

}

module.exports = new(kXHC1983);