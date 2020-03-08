import isUndefined from 'lodash/isUndefined';

/**
 * Given an object, execute a function if that object is defined.
 * @param {*} obj
 * @param {Function} fn
 * @returns {*}
 */
export default function undef<T, R>(obj: T | undefined, fn: (obj: T) => R): R | undefined {
    return isUndefined(obj) ? obj : fn(obj);
}
