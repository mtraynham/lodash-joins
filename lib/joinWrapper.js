import isString from 'lodash/lang/isString';
import isArray from 'lodash/lang/isArray';
import property from 'lodash/utility/property';

/**
 * Get an accessor function from an object.  If it's a string or an array, use _.property.
 *
 * @param {*} obj
 * @returns {Function}
 */
function getAccessor (obj) {
    return isString(obj) || isArray(obj) ?
        property(obj) :
        obj;
}

/**
 * Wrap a join function to process inputs in a more succinct manner.
 *
 * @param {Function} joinFn
 * @returns {Function}
 */
export default function joinWrapper (joinFn) {
    return (a, aAccessor, b = a, bAccessor = aAccessor) => {
        if (!a) {
            throw new Error('Missing required left array');
        } else if (!aAccessor) {
            throw new Error('Missing required left accessor');
        }
        return joinFn(a, getAccessor(aAccessor), b, getAccessor(bAccessor));
    };
}
