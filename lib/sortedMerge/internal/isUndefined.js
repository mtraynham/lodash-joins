import isUndefined from 'lodash/isUndefined';

/**
 * Given an object, execute a function if that object is defined.
 * @param {*} obj
 * @param {Function} fn
 * @return {*}
 */
export default function undef (obj, fn) {
    return isUndefined(obj) ? obj : fn(obj);
}
