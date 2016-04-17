'use strict';

class kMandarin {

    constructor() {}

    test(value) {
        return this.pattern.test(value);
    }

    parse(value) {
        

    }

    get pattern() {
        return /^[a-z\u0300-\u0302\u0304\u0308\u030C]+$/u;
    }

    get field() {
        return 'kMandarin';
    }

}

module.exports = kMandarin;