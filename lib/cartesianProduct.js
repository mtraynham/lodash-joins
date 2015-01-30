var _ = require('lodash'),
    flatten = _.flatten,
    map = _.map,
    reduce = _.reduce;
/**
 * Produce the cartesian product of multiple arrays
 * @param  {*[[]]} array
 * @return {*[]}
 */
var cartesianProduct = function (array) {
    if (array.length > 0) {
        return reduce(array, function (a, b) {
            return flatten(map(a, function (x) {
                return map(b, function (y) {
                    return x.concat([y]);
                });
            }), true);
        }, [[]]);
    }
    return [];
};

module.exports = cartesianProduct;
