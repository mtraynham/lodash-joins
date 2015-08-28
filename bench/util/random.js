/**
 * Random number generator between 0-1.  Uses `Math.random` for now.
 *
 * @type {Function}
 */
let rand = Math.random;

/**
 * Generate a random number.
 *
 * @param  {Number} [min=0]
 * @param  {Number} [max=0]
 * @return {Number}
 */
export function generateRandomNumber (min = 0, max = 0) {
    return (rand() * (max - min)) + min;
}

/**
 * Generate a random integer.
 *
 * @param  {Number} [min=0]
 * @param  {Number} [max=0]
 * @return {Number}
 */
export function generateRandomInteger (min = 0, max = 0) {
    return Math.floor(generateRandomNumber(min, max));
}

/**
 * Generate a random date.
 *
 * @param  {Date} [start=new Date(0)]
 * @param  {Date} [end=new Date(0)]
 * @return {Date}
 */
export function generateRandomDate (start = new Date(0), end = new Date(0)) {
    return new Date(generateRandomInteger(start.getTime(), end.getTime()));
}

/**
 * Generate a random boolean.
 *
 * @return {Boolean}
 */
export function generateRandomBoolean () {
    return rand() < 0.5;
}

/**
 * Generate a random character.
 *
 * @param  {String[]} [domain=[]]
 * @return {String}
 */
export function generateRandomCharacter (domain = []) {
    return domain[Math.floor(rand() * domain.length)];
}

/**
 * Generate a random string.
 *
 * @param  {String[]} [domain=[]]
 * @param  {Number} [length=0]
 * @return {String}
 */
export function generateRandomString (domain = [], length = 0) {
    let out = '';
    while (length--) {
        out += generateRandomCharacter(domain);
    }
    return out;
}

/**
 * Generate a random from spec.
 *
 * @param  {{type: String, options: Object}} [spec={type: 'Boolean'}]
 * @return {*}
 */
export function generateRandom (spec = {}) {
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
}

/**
 * Generate a random object from a list of specs.
 *
 * @param  {{field: String, type: String, options: Object}[]} [specs=[]]
 * @return {Object}
 */
export function generateRandomObject (specs = []) {
    let i = specs.length,
        out = {},
        spec;
    while (i--) {
        spec = specs[i];
        out[spec.field] = generateRandom(spec);
    }
    return out;
}

/**
 * Generate a random array of objects from a list of specs.
 *
 * @param  {{field: String, type: String, options: Object}[]} [specs=[]]
 * @param  {Number} [length=0]
 * @return {Object[]}
 */
export function generateRandomObjectArray (specs = [], length = 0) {
    let out = [];
    while (length--) {
        out[length] = generateRandomObject(specs);
    }
    return out;
}
