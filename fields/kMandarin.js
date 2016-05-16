'use strict';

class kMandarin {

    get pattern() {
        return /[a-z\u0300-\u0302\u0304\u0308\u030C]+/g;
    }

    get field() {
        return 'kMandarin';
    }

    values(value) {
        const readings = value.normalize('NFD').match(this.pattern).map(entry => {
            return entry.normalize('NFC');
        });

        const returnValue = {
            cn : readings[0],
            tw : readings.length > 1 ? readings[1] : readings[0]
        }
        
        return returnValue;
    }
}

module.exports = new(kMandarin);