import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import property from 'lodash/property';

/**
 * Get an accessor function from an object.  If it's a string or an array, use _.property.
 * @param {*} obj
 * @return {AccessorFunction}
 */
function getAccessor (obj) {
    return isString(obj) || isArray(obj) ?
        property(obj) :
        obj;
}

/**
 * Wrap a join function to process inputs in a more succinct manner.
 * @param {JoinFunction} joinFn
 * @return {JoinFunction}
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
