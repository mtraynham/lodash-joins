import isUndefined from 'lodash/lang/isUndefined';

/**
 * Given an object, execute a function if that object is defined.
 * @param {*} obj
 * @param {Function} fn
 * @returns {*}
 */
export default function undef (obj, fn) {
    return isUndefined(obj) ? obj : fn(obj);
}
