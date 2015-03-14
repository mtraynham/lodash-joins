/**
 * A utility wrapper for join functions
 * @param {Function} joinFn a join function
 * @return {*[]}
 */
var joinWrapper = function (joinFn) {
    return function (a, aAccessor, b, bAccessor) {
        if (!a) {
            throw new Error('Missing required left array');
        } else if (!aAccessor) {
            throw new Error('Missing required left accessor');
        }
        if (!b) {
            b = a;
        }
        if (!bAccessor) {
            bAccessor = aAccessor;
        }
        return joinFn(a, aAccessor, b, bAccessor);
    };
};

module.exports = joinWrapper;
