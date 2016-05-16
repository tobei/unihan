'use strict';

class kHanyuPinlu {

    get pattern() {
        return /[a-z\u0300-\u0302\u0304\u0308\u030C]+\([0-9]+\)/g;
    }

    get field() {
        return 'kHanyuPinlu';
    }

    values(value) {
        const readings = value.normalize('NFD').match(this.pattern).map(entry => {
            const match = entry.match(/(.+)\(([0-9]+)\)/);
            return {
                pinyin: match[1].normalize('NFC'),
                ratio: parseInt(match[2], 10)
            }
        });
        function sum(previous, current) {
            const value = previous || 0;
            return value + current.ratio;
        }
        const occurrences = readings.reduce(sum, 0)
        return readings.map(element => {
            element.ratio = element.ratio / occurrences;
            return element;
        });

    }

}

module.exports = new(kHanyuPinlu);