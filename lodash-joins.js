(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tcnQ2NDY3L0RvY3VtZW50cy9Qcm9qZWN0cy9sb2Rhc2gtam9pbnMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4vLyB2YXIgXyA9IHJlcXVpcmUoJy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gnKTtcbnZhciBfID0gZ2xvYmFsLl87XG5cbnZhciB1bmRlZiA9IGZ1bmN0aW9uIChvYmosIGZuKSB7XG4gICAgcmV0dXJuIF8uaXNVbmRlZmluZWQob2JqKSA/IG9iaiA6IGZuKG9iaik7XG59O1xuXG4vKipcbiAqIFByb2R1Y2UgdGhlIGNhcnRlc2lhbiBwcm9kdWN0IG9mIG11bHRpcGxlIGFycmF5c1xuICogQHBhcmFtICB7KltbXV19IGFycmF5XG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbl8uY2FydGVzaWFuUHJvZHVjdCA9IGZ1bmN0aW9uIChhcnJheSkge1xuICAgIGlmIChhcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBfLnJlZHVjZShhcnJheSwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBfLmZsYXR0ZW4oXy5tYXAoYSwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5tYXAoYiwgZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguY29uY2F0KFt5XSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIH0sIFtbXV0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59O1xuXG4vKipcbiAqIE5lc3RlZCBsb29wIGlubmVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbl8ubmVzdGVkTG9vcElubmVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciByID0gW10sXG4gICAgICAgIGkgPSBhLmxlbmd0aCxcbiAgICAgICAgYURhdHVtLFxuICAgICAgICBiRGF0dW0sXG4gICAgICAgIGFWYWwsXG4gICAgICAgIGJWYWw7XG4gICAgd2hpbGUgKChhVmFsID0gdW5kZWYoYURhdHVtID0gYVtpLS1dLCBhQWNjZXNzb3IpKSkge1xuICAgICAgICB2YXIgaiA9IGIubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoKGJWYWwgPSB1bmRlZihiRGF0dW0gPSBhW2otLV0sIGJBY2Nlc3NvcikpKSB7XG4gICAgICAgICAgICBpZiAoYVZhbCA9PT0gYlZhbCkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChfLmFzc2lnbih7fSwgYURhdHVtLCBiRGF0dW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbn07XG5cbi8qKlxuICogTmVzdGVkIGxvb3AgbGVmdCBzZW1pIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbl8ubmVzdGVkTG9vcExlZnRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciByID0gW10sXG4gICAgICAgIGkgPSBhLmxlbmd0aCxcbiAgICAgICAgYURhdHVtLFxuICAgICAgICBiRGF0dW0sXG4gICAgICAgIGFWYWwsXG4gICAgICAgIGJWYWw7XG4gICAgd2hpbGUgKChhVmFsID0gdW5kZWYoYURhdHVtID0gYVtpLS1dLCBhQWNjZXNzb3IpKSkge1xuICAgICAgICB2YXIgaiA9IGIubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoKGJWYWwgPSB1bmRlZihiRGF0dW0gPSBhW2otLV0sIGJBY2Nlc3NvcikpKSB7XG4gICAgICAgICAgICBpZiAoYVZhbCA9PT0gYlZhbCkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChhRGF0dW0sIGJEYXR1bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG59O1xuXG4vKipcbiAqIE5lc3RlZCBsb29wIGxlZnQgb3V0ZXIgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xuXy5uZXN0ZWRMb29wTGVmdE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciByID0gW10sXG4gICAgICAgIGkgPSBhLmxlbmd0aCxcbiAgICAgICAgYURhdHVtLFxuICAgICAgICBiRGF0dW0sXG4gICAgICAgIGFWYWwsXG4gICAgICAgIGJWYWw7XG4gICAgd2hpbGUgKChhVmFsID0gdW5kZWYoYURhdHVtID0gYVtpLS1dLCBhQWNjZXNzb3IpKSkge1xuICAgICAgICB2YXIgaiA9IGIubGVuZ3RoLFxuICAgICAgICAgICAgayA9IHIubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoKGJWYWwgPSB1bmRlZihiRGF0dW0gPSBhW2otLV0sIGJBY2Nlc3NvcikpKSB7XG4gICAgICAgICAgICBpZiAoYVZhbCA9PT0gYlZhbCkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChfLmFzc2lnbih7fSwgYURhdHVtLCBiRGF0dW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoci5sZW5ndGggPT09IGspIHtcbiAgICAgICAgICAgIHIudW5zaGlmdChhRGF0dW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xufTtcblxuLyoqXG4gKiBOZXN0ZWQgbG9vcCByaWdodCBvdXRlciBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG5fLm5lc3RlZExvb3BSaWdodE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHJldHVybiB0aGlzLm5lc3RlZExvb3BMZWZ0T3V0ZXJKb2luKGIsIGJBY2Nlc3NvciwgYSwgYUFjY2Vzc29yKTtcbn07XG5cbi8vIHRoaXMubmVzdGVkTG9vcEZ1bGxPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbi8vICAgICAvLyBUT0RPIFNVUFBPUlQgRk9SIFNFTUkgQU5EIEFOVEktU0VNSSBKT0lOU1xuLy8gfTtcblxuLyoqXG4gKiBIYXNoIGlubmVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbl8uaGFzaElubmVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciBpZHggPSBudWxsLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgciA9IFtdLFxuICAgICAgICBkYXR1bSA9IG51bGwsXG4gICAgICAgIHZhbCA9IG51bGw7XG4gICAgaWYgKGEubGVuZ3RoIDwgYi5sZW5ndGgpIHtcbiAgICAgICAgaWR4ID0gXy5pbmRleEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgICAgIGkgPSBiLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgZGF0dW0gPSBiW2ldO1xuICAgICAgICAgICAgdmFsID0gYkFjY2Vzc29yKGRhdHVtKTtcbiAgICAgICAgICAgIGlmICh2YWwgaW4gaWR4KSB7XG4gICAgICAgICAgICAgICAgci51bnNoaWZ0KF8uYXNzaWduKHt9LCBpZHhbdmFsXSwgZGF0dW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlkeCA9IF8uaW5kZXhCeShiLCBiQWNjZXNzb3IpO1xuICAgICAgICBpID0gYS5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGRhdHVtID0gYVtpXTtcbiAgICAgICAgICAgIHZhbCA9IGFBY2Nlc3NvcihkYXR1bSk7XG4gICAgICAgICAgICBpZiAodmFsIGluIGlkeCkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChfLmFzc2lnbih7fSwgZGF0dW0sIGlkeFt2YWxdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG59O1xuXG4vKipcbiAqIEhhc2ggbGVmdCBzZW1pIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbl8uaGFzaExlZnRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciBpZHggPSBudWxsLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgciA9IFtdLFxuICAgICAgICBkYXR1bSA9IG51bGwsXG4gICAgICAgIHZhbCA9IG51bGw7XG4gICAgaWYgKGEubGVuZ3RoIDwgYi5sZW5ndGgpIHtcbiAgICAgICAgaWR4ID0gXy5pbmRleEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgICAgIGkgPSBiLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgZGF0dW0gPSBiW2ldO1xuICAgICAgICAgICAgdmFsID0gYkFjY2Vzc29yKGRhdHVtKTtcbiAgICAgICAgICAgIGlmICh2YWwgaW4gaWR4KSB7XG4gICAgICAgICAgICAgICAgci51bnNoaWZ0KGlkeFt2YWxdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlkeCA9IF8uaW5kZXhCeShiLCBiQWNjZXNzb3IpO1xuICAgICAgICBpID0gYS5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGRhdHVtID0gYVtpXTtcbiAgICAgICAgICAgIHZhbCA9IGFBY2Nlc3NvcihkYXR1bSk7XG4gICAgICAgICAgICBpZiAodmFsIGluIGlkeCkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChkYXR1bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG59O1xuXG4vKipcbiAqIEhhc2ggbGVmdCBvdXRlciBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG5fLmhhc2hMZWZ0T3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgdmFyIGlkeCA9IF8uaW5kZXhCeShiLCBiQWNjZXNzb3IpLFxuICAgICAgICBpID0gYS5sZW5ndGgsXG4gICAgICAgIHIgPSBbXSxcbiAgICAgICAgZGF0dW0gPSBudWxsLFxuICAgICAgICB2YWwgPSBudWxsO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgZGF0dW0gPSBhW2ldO1xuICAgICAgICB2YWwgPSBhQWNjZXNzb3IoZGF0dW0pO1xuICAgICAgICByW2ldID0gdmFsIGluIGlkeCA/IF8uYXNzaWduKHt9LCBkYXR1bSwgaWR4W3ZhbF0pIDogZGF0dW07XG4gICAgfVxuICAgIHJldHVybiByO1xufTtcblxuLyoqXG4gKiBIYXNoIHJpZ2h0IG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbl8uaGFzaFJpZ2h0T3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzaExlZnRKb2luKGIsIGJBY2Nlc3NvciwgYSwgYUFjY2Vzc29yKTtcbn07XG5cbi8qKlxuICogSGFzaCBmdWxsIG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbl8uaGFzaEZ1bGxPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICB2YXIgYWlkeCA9IF8uaW5kZXhCeShhLCBhQWNjZXNzb3IpLFxuICAgICAgICBiaWR4ID0gXy5pbmRleEJ5KGIsIGJBY2Nlc3NvciksXG4gICAgICAgIHIgPSBbXTtcbiAgICBmb3IgKHZhciBhS2V5IGluIGFpZHgpIHtcbiAgICAgICAgaWYgKGFLZXkgaW4gYmlkeCkge1xuICAgICAgICAgICAgci5wdXNoKF8uYXNzaWduKHt9LCBhaWR4W2FLZXldLCBiaWR4W2FLZXldKSk7XG4gICAgICAgICAgICBkZWxldGUgYmlkeFthS2V5XTsgLy8gTm90IHBlcmZvcm1hbnRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHIucHVzaChhaWR4W2FLZXldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gci5jb25jYXQoXy52YWx1ZXMoYmlkeCkpO1xufTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgaW5uZXIgam9pbi4gIFJlc3R1cm5zIGEgbmV3IGFycmF5LlxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xuXy5zb3J0ZWRNZXJnZUlubmVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIGlmIChhLmxlbmd0aCA8IDEgfHwgYi5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgYSA9IF8uc29ydEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgYiA9IF8uc29ydEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgdmFyIHIgPSBbXSxcbiAgICAgICAgYURhdHVtID0gYS5wb3AoKSxcbiAgICAgICAgYkRhdHVtID0gYi5wb3AoKSxcbiAgICAgICAgYVZhbCA9IGFBY2Nlc3NvcihhRGF0dW0pLFxuICAgICAgICBiVmFsID0gYkFjY2Vzc29yKGJEYXR1bSk7XG4gICAgd2hpbGUgKGFEYXR1bSAmJiBiRGF0dW0pIHtcbiAgICAgICAgaWYgKGFWYWwgPiBiVmFsKSB7XG4gICAgICAgICAgICBhVmFsID0gdW5kZWYoYURhdHVtID0gYS5wb3AoKSwgYUFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIGlmIChhVmFsIDwgYlZhbCkge1xuICAgICAgICAgICAgYlZhbCA9IHVuZGVmKGJEYXR1bSA9IGIucG9wKCksIGJBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByLnVuc2hpZnQoXy5hc3NpZ24oe30sIGFEYXR1bSwgYkRhdHVtKSk7XG4gICAgICAgICAgICBhVmFsID0gdW5kZWYoYURhdHVtID0gYS5wb3AoKSwgYUFjY2Vzc29yKTtcbiAgICAgICAgICAgIGJWYWwgPSB1bmRlZihiRGF0dW0gPSBiLnBvcCgpLCBiQWNjZXNzb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xufTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgbGVmdCBzZW1pIGpvaW4uICBSZXN0dXJucyBhIG5ldyBhcnJheS5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbl8uc29ydGVkTWVyZ2VMZWZ0U2VtaUpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICBpZiAoYS5sZW5ndGggPCAxIHx8IGIubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGEgPSBfLnNvcnRCeShhLCBhQWNjZXNzb3IpO1xuICAgIGIgPSBfLnNvcnRCeShiLCBiQWNjZXNzb3IpO1xuICAgIHZhciByID0gW10sXG4gICAgICAgIGFEYXR1bSA9IGEucG9wKCksXG4gICAgICAgIGJEYXR1bSA9IGIucG9wKCksXG4gICAgICAgIGFWYWwgPSBhQWNjZXNzb3IoYURhdHVtKSxcbiAgICAgICAgYlZhbCA9IGJBY2Nlc3NvcihiRGF0dW0pO1xuICAgIHdoaWxlIChhRGF0dW0gJiYgYkRhdHVtKSB7XG4gICAgICAgIGlmIChhVmFsID4gYlZhbCkge1xuICAgICAgICAgICAgYVZhbCA9IHVuZGVmKGFEYXR1bSA9IGEucG9wKCksIGFBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoYVZhbCA8IGJWYWwpIHtcbiAgICAgICAgICAgIGJWYWwgPSB1bmRlZihiRGF0dW0gPSBiLnBvcCgpLCBiQWNjZXNzb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgci51bnNoaWZ0KGFEYXR1bSwgYkRhdHVtKTtcbiAgICAgICAgICAgIGFWYWwgPSB1bmRlZihhRGF0dW0gPSBhLnBvcCgpLCBhQWNjZXNzb3IpO1xuICAgICAgICAgICAgYlZhbCA9IHVuZGVmKGJEYXR1bSA9IGIucG9wKCksIGJBY2Nlc3Nvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG59O1xuXG4vKipcbiAqIFNvcnRlZCBtZXJnZSBsZWZ0IG91dGVyIGpvaW4uIFJldHVybnMgdGhlIGEtYXJyYXkgcmVmZXJlbmNlLlxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xuXy5zb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICBpZiAoYS5sZW5ndGggPCAxIHx8IGIubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgYSA9IF8uc29ydEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgYiA9IF8uc29ydEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgdmFyIHIgPSBbXSxcbiAgICAgICAgYURhdHVtID0gYS5wb3AoKSxcbiAgICAgICAgYkRhdHVtID0gYi5wb3AoKSxcbiAgICAgICAgYVZhbCA9IGFBY2Nlc3NvcihhRGF0dW0pLFxuICAgICAgICBiVmFsID0gYkFjY2Vzc29yKGJEYXR1bSk7XG4gICAgd2hpbGUgKGFEYXR1bSAmJiBiRGF0dW0pIHtcbiAgICAgICAgaWYgKGFWYWwgPiBiVmFsKSB7XG4gICAgICAgICAgICByLnVuc2hpZnQoYURhdHVtKTtcbiAgICAgICAgICAgIGFWYWwgPSB1bmRlZihhRGF0dW0gPSBhLnBvcCgpLCBhQWNjZXNzb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKGFWYWwgPCBiVmFsKSB7XG4gICAgICAgICAgICBiVmFsID0gdW5kZWYoYkRhdHVtID0gYi5wb3AoKSwgYkFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHIudW5zaGlmdChfLmFzc2lnbih7fSwgYURhdHVtLCBiRGF0dW0pKTtcbiAgICAgICAgICAgIGFWYWwgPSB1bmRlZihhRGF0dW0gPSBhLnBvcCgpLCBhQWNjZXNzb3IpO1xuICAgICAgICAgICAgYlZhbCA9IHVuZGVmKGJEYXR1bSA9IGIucG9wKCksIGJBY2Nlc3Nvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFEYXR1bSkge1xuICAgICAgICByLnVuc2hpZnQoYURhdHVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGEuY29uY2F0KHIpO1xufTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgcmlnaHQgb3V0ZXIgam9pbi4gIFJldHVybnMgdGhlIGItYXJyYXkgcmVmZXJlbmNlLlxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xuXy5zb3J0ZWRNZXJnZVJpZ2h0T3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgcmV0dXJuIHRoaXMuc29ydGVkTWVyZ2VMZWZ0Sm9pbihiLCBiQWNjZXNzb3IsIGEsIGFBY2Nlc3Nvcik7XG59O1xuXG4vKipcbiAqIFNvcnRlZCBtZXJnZSBmdWxsIG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbl8uc29ydGVkTWVyZ2VGdWxsT3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgaWYgKGEubGVuZ3RoIDwgMSB8fCBiLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICAgIH1cbiAgICBhID0gXy5zb3J0QnkoYSwgYUFjY2Vzc29yKTtcbiAgICBiID0gXy5zb3J0QnkoYiwgYkFjY2Vzc29yKTtcbiAgICB2YXIgciA9IFtdLFxuICAgICAgICBhRGF0dW0gPSBhLnBvcCgpLFxuICAgICAgICBiRGF0dW0gPSBiLnBvcCgpLFxuICAgICAgICBhVmFsID0gYUFjY2Vzc29yKGFEYXR1bSksXG4gICAgICAgIGJWYWwgPSBiQWNjZXNzb3IoYkRhdHVtKTtcbiAgICB3aGlsZSAoYURhdHVtICYmIGJEYXR1bSkge1xuICAgICAgICBpZiAoYVZhbCA+IGJWYWwpIHtcbiAgICAgICAgICAgIHIudW5zaGlmdChhRGF0dW0pO1xuICAgICAgICAgICAgYVZhbCA9IHVuZGVmKGFEYXR1bSA9IGEucG9wKCksIGFBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoYVZhbCA8IGJWYWwpIHtcbiAgICAgICAgICAgIHIudW5zaGlmdChiRGF0dW0pO1xuICAgICAgICAgICAgYlZhbCA9IHVuZGVmKGJEYXR1bSA9IGIucG9wKCksIGJBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByLnVuc2hpZnQoXy5hc3NpZ24oe30sIGFEYXR1bSwgYkRhdHVtKSk7XG4gICAgICAgICAgICBhVmFsID0gdW5kZWYoYURhdHVtID0gYS5wb3AoKSwgYUFjY2Vzc29yKTtcbiAgICAgICAgICAgIGJWYWwgPSB1bmRlZihiRGF0dW0gPSBiLnBvcCgpLCBiQWNjZXNzb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChiRGF0dW0pIHtcbiAgICAgICAgci51bnNoaWZ0KGJEYXR1bSk7XG4gICAgfVxuICAgIGlmIChhRGF0dW0pIHtcbiAgICAgICAgci51bnNoaWZ0KGFEYXR1bSk7XG4gICAgfVxuICAgIHJldHVybiBhLmNvbmNhdChiLCByKTtcbn07XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiXX0=
