/**
 * Generate a random number
 * @param  {Number} min (optional)
 * @param  {Number} max (optional)
 * @return {Number}
 */
var generateRandomNumber = function (min, max) {
    min = min || 0;
    max = max || 0;
    return (Math.random() * (max - min)) + min;
};

/**
 * Generate a random integer
 * @param  {Number} min (optional)
 * @param  {Number} max (optional)
 * @return {Number}
 */
var generateRandomInteger = function (min, max) {
    return Math.floor(generateRandomNumber(min, max));
};

/**
 * Generate a random date
 * @param  {Date} start (optional)
 * @param  {Date} end   (optional)
 * @return {Date}
 */
var generateRandomDate = function (start, end) {
    var startTime = start ? start.getTime() : 0,
        endTime = end ? end.getTime() : 0;
    return new Date(generateRandomInteger(startTime, endTime));
};

/**
 * Generate a random boolean
 * @return {Boolean}
 */
var generateRandomBoolean = function () {
    return Math.random() < 0.5;
};

/**
 * Generate a random character
 * @param  {String[]} domain (optional)
 * @return {String}
 */
var generateRandomCharacter = function (domain) {
    domain = domain || [];
    return domain[Math.floor(Math.random() * domain.length)];
};

/**
 * Generate a random string
 * @param  {String[]} domain
 * @param  {Number} length
 * @return {String}
 */
var generateRandomString = function (domain, length) {
    var i = length || 0,
        out = '';
    while (i--) {
        out += generateRandomCharacter(domain);
    }
    return out;
};

/**
 * Generate a random from spec
 * @param  {{type: String, options...}} spec
 * @return {*}
 */
var generateRandom = function (spec) {
    switch (spec.type) {
        case 'number':
            return generateRandomNumber(spec.min, spec.max);
        case 'integer':
            return generateRandomInteger(spec.min, spec.max);
        case 'date':
            return generateRandomDate(spec.start, spec.end);
        case 'character':
            return generateRandomCharacter(spec.domain);
        case 'string':
            return generateRandomString(spec.domain, spec.length);
        default: // boolean or other
            return generateRandomBoolean();
    }
};

/**
 * Generate a random object from a list of specs
 * @param  {[{field: String, type: String, options...}]} specs
 * @return {Object}
 */
var generateRandomObject = function (specs) {
    var i = specs.length,
        out = {},
        spec;
    while (i--) {
        spec = specs[i];
        out[spec.field] = generateRandom(spec);
    }
    return out;
};

/**
 * Generate a random array of objects from a list of specs
 * @param  {[{field: String, type: String, options...}]} specs
 * @param  {Number} length
 * @return {Object[]}
 */
var generateRandomObjectArray = function (specs, length) {
    var i = length,
        out = [];
    while (i--) {
        out[i] = generateRandomObject(specs);
    }
    return out;
};

module.exports = {
    rand: generateRandom,
    randBool: generateRandomBoolean,
    randChar: generateRandomCharacter,
    randDate: generateRandomDate,
    randInt: generateRandomInteger,
    randNum: generateRandomNumber,
    randObject: generateRandomObject,
    randObjectArray: generateRandomObjectArray,
    randString: generateRandomString
};