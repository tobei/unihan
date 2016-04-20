'use strict';

class kMandarin {

    constructor() {}



    *parse(value) {
        do {
            console.log(this.pattern.lastIndex + ' ' + value.length);
            yield result[0].normalize('NFC');
        } while(this.pattern.lastIndex < value.length - 1);
    }


    get pattern() {
        return /[a-z\u0300-\u0302\u0304\u0308\u030C]+/gy;
    }

    get field() {
        return 'kMandarin';
    }

}

module.exports = kMandarin;