'use strict';

class kMandarin {

    constructor() {}



    *parse(value) {
        do {
            yield this.pattern.exec(value);
        } while(this.pattern.lastIndex < this.pattern.size - 1);
    }


    get pattern() {
        return /[a-z\u0300-\u0302\u0304\u0308\u030C]+/uy;
    }

    get field() {
        return 'kMandarin';
    }

}

module.exports = kMandarin;