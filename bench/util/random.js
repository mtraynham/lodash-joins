module.exports = {
    generateRandomNumber: function (min, max) {
        min = min || 0;
        max = max || 0;
        return (Math.random() * (max - min)) + min;
    },
    generateRandomInteger: function (min, max) {
        return Math.floor(this.generateRandomNumber(min, max));
    },
    generateRandomDate: function (start, end) {
        var startTime = start ? start.getTime() : 0,
            endTime = end ? end.getTime() : 0;
        return new Date(this.generateRandomInteger(startTime, endTime));
    },
    generateRandomBoolean: function () {
        return Math.random() < 0.5;
    },
    generateRandomCharacter: function (domain) {
        domain = domain || [];
        return domain[Math.floor(Math.random() * domain.length)];
    },
    generateRandomString: function (domain, length) {
        var i = length || 0,
            out = '';
        while (i--) {
            out += this.generateRandomString(domain);
        }
        return out;
    },
    generateRandom: function (spec) {
        switch (spec.type) {
            case 'number':
                return this.generateRandomNumber(spec.min, spec.max);
            case 'integer':
                return this.generateRandomInteger(spec.min, spec.max);
            case 'date':
                return this.generateRandomDate(spec.start, spec.end);
            case 'character':
                return this.generateRandomCharacter(spec.domain);
            case 'string':
                return this.generateRandomString(spec.domain, spec.length);
            default: // boolean or other
                return this.generateRandomBoolean();
        }
    },
    generateRandomObject: function (specs) {
        var i = specs.length,
            out = {},
            spec;
        while (i--) {
            spec = specs[i];
            out[spec.field] = this.generateRandom(spec);
        }
        return out;
    },
    generateRandomObjectArray: function (specs, length) {
        var i = length,
            out = [];
        while (i--) {
            out[i] = this.generateRandomObject(specs);
        }
        return out;
    }
};