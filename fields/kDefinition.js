'use strict';

class kDefinition {

    get pattern() {
        return /[^\t"]+/g;
    }

    get field() {
        return 'kDefinition';
    }

    values(value) {
        const majorDefinitions = value.match(this.pattern)[0].split(';');
        return majorDefinitions.map(majorDefinition => majorDefinition.split(','));
    }

}

module.exports = new(kDefinition);