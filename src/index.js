// var _ = require('../node_modules/lodash');
var _ = global._;

var undef = function (obj, fn) {
    return _.isUndefined(obj) ? obj : fn(obj);
};

/**
 * Produce the cartesian product of multiple arrays
 * @param  {*[[]]} array
 * @return {*[]}
 */
_.cartesianProduct = function (array) {
    if (array.length > 0) {
        return _.reduce(array, function (a, b) {
            return _.flatten(_.map(a, function (x) {
                return _.map(b, function (y) {
                    return x.concat([y]);
                });
            }), true);
        }, [[]]);
    }
    return [];
};

/**
 * Nested loop inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.nestedLoopInnerJoin = function (a, aAccessor, b, bAccessor) {
    var r = [],
        i = a.length,
        aDatum,
        bDatum,
        aVal,
        bVal;
    while ((aVal = undef(aDatum = a[i--], aAccessor))) {
        var j = b.length;
        while ((bVal = undef(bDatum = a[j--], bAccessor))) {
            if (aVal === bVal) {
                r.unshift(_.assign({}, aDatum, bDatum));
            }
        }
    }
    return r;
};

/**
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.nestedLoopLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    var r = [],
        i = a.length,
        aDatum,
        bDatum,
        aVal,
        bVal;
    while ((aVal = undef(aDatum = a[i--], aAccessor))) {
        var j = b.length;
        while ((bVal = undef(bDatum = a[j--], bAccessor))) {
            if (aVal === bVal) {
                r.unshift(aDatum, bDatum);
            }
        }
    }
    return r;
};

/**
 * Nested loop left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.nestedLoopLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    var r = [],
        i = a.length,
        aDatum,
        bDatum,
        aVal,
        bVal;
    while ((aVal = undef(aDatum = a[i--], aAccessor))) {
        var j = b.length,
            k = r.length;
        while ((bVal = undef(bDatum = a[j--], bAccessor))) {
            if (aVal === bVal) {
                r.unshift(_.assign({}, aDatum, bDatum));
            }
        }
        if (r.length === k) {
            r.unshift(aDatum);
        }
    }
    return r;
};

/**
 * Nested loop right outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.nestedLoopRightOuterJoin = function (a, aAccessor, b, bAccessor) {
    return this.nestedLoopLeftOuterJoin(b, bAccessor, a, aAccessor);
};

// this.nestedLoopFullOuterJoin = function (a, aAccessor, b, bAccessor) {
//     // TODO SUPPORT FOR SEMI AND ANTI-SEMI JOINS
// };

/**
 * Hash inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.hashInnerJoin = function (a, aAccessor, b, bAccessor) {
    var idx = null,
        i = 0,
        r = [],
        datum = null,
        val = null;
    if (a.length < b.length) {
        idx = _.indexBy(a, aAccessor);
        i = b.length;
        while (i--) {
            datum = b[i];
            val = bAccessor(datum);
            if (val in idx) {
                r.unshift(_.assign({}, idx[val], datum));
            }
        }
    } else {
        idx = _.indexBy(b, bAccessor);
        i = a.length;
        while (i--) {
            datum = a[i];
            val = aAccessor(datum);
            if (val in idx) {
                r.unshift(_.assign({}, datum, idx[val]));
            }
        }
    }
    return r;
};

/**
 * Hash left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.hashLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    var idx = null,
        i = 0,
        r = [],
        datum = null,
        val = null;
    if (a.length < b.length) {
        idx = _.indexBy(a, aAccessor);
        i = b.length;
        while (i--) {
            datum = b[i];
            val = bAccessor(datum);
            if (val in idx) {
                r.unshift(idx[val]);
            }
        }
    } else {
        idx = _.indexBy(b, bAccessor);
        i = a.length;
        while (i--) {
            datum = a[i];
            val = aAccessor(datum);
            if (val in idx) {
                r.unshift(datum);
            }
        }
    }
    return r;
};

/**
 * Hash left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.hashLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    var idx = _.indexBy(b, bAccessor),
        i = a.length,
        r = [],
        datum = null,
        val = null;
    while (i--) {
        datum = a[i];
        val = aAccessor(datum);
        r[i] = val in idx ? _.assign({}, datum, idx[val]) : datum;
    }
    return r;
};

/**
 * Hash right outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.hashRightOuterJoin = function (a, aAccessor, b, bAccessor) {
    return this.hashLeftJoin(b, bAccessor, a, aAccessor);
};

/**
 * Hash full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.hashFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    var aidx = _.indexBy(a, aAccessor),
        bidx = _.indexBy(b, bAccessor),
        r = [];
    for (var aKey in aidx) {
        if (aKey in bidx) {
            r.push(_.assign({}, aidx[aKey], bidx[aKey]));
            delete bidx[aKey]; // Not performant
        } else {
            r.push(aidx[aKey]);
        }
    }
    return r.concat(_.values(bidx));
};

/**
 * Sorted merge inner join.  Resturns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.sortedMergeInnerJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = _.sortBy(a, aAccessor);
    b = _.sortBy(b, bAccessor);
    var r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum);
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            aVal = undef(aDatum = a.pop(), aAccessor);
        } else if (aVal < bVal) {
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            r.unshift(_.assign({}, aDatum, bDatum));
            aVal = undef(aDatum = a.pop(), aAccessor);
            bVal = undef(bDatum = b.pop(), bAccessor);
        }
    }
    return r;
};

/**
 * Sorted merge left semi join.  Resturns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.sortedMergeLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = _.sortBy(a, aAccessor);
    b = _.sortBy(b, bAccessor);
    var r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum);
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            aVal = undef(aDatum = a.pop(), aAccessor);
        } else if (aVal < bVal) {
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            r.unshift(aDatum, bDatum);
            aVal = undef(aDatum = a.pop(), aAccessor);
            bVal = undef(bDatum = b.pop(), bAccessor);
        }
    }
    return r;
};

/**
 * Sorted merge left outer join. Returns the a-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.sortedMergeLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    a = _.sortBy(a, aAccessor);
    b = _.sortBy(b, bAccessor);
    var r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum);
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            r.unshift(aDatum);
            aVal = undef(aDatum = a.pop(), aAccessor);
        } else if (aVal < bVal) {
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            r.unshift(_.assign({}, aDatum, bDatum));
            aVal = undef(aDatum = a.pop(), aAccessor);
            bVal = undef(bDatum = b.pop(), bAccessor);
        }
    }
    if (aDatum) {
        r.unshift(aDatum);
    }
    return a.concat(r);
};

/**
 * Sorted merge right outer join.  Returns the b-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.sortedMergeRightOuterJoin = function (a, aAccessor, b, bAccessor) {
    return this.sortedMergeLeftJoin(b, bAccessor, a, aAccessor);
};

/**
 * Sorted merge full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
_.sortedMergeFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a.concat(b);
    }
    a = _.sortBy(a, aAccessor);
    b = _.sortBy(b, bAccessor);
    var r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum);
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            r.unshift(aDatum);
            aVal = undef(aDatum = a.pop(), aAccessor);
        } else if (aVal < bVal) {
            r.unshift(bDatum);
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            r.unshift(_.assign({}, aDatum, bDatum));
            aVal = undef(aDatum = a.pop(), aAccessor);
            bVal = undef(bDatum = b.pop(), bAccessor);
        }
    }
    if (bDatum) {
        r.unshift(bDatum);
    }
    if (aDatum) {
        r.unshift(aDatum);
    }
    return a.concat(b, r);
};