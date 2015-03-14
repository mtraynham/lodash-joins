(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

var joinWrapper = require('./lib/joinWrapper');

_.mixin({'cartesianProduct': require('./lib/cartesianProduct')});

_.mixin({'hashFullOuterJoin': joinWrapper(require('./lib/hash/hashFullOuterJoin'))});
_.mixin({'hashInnerJoin': joinWrapper(require('./lib/hash/hashInnerJoin'))});
_.mixin({'hashLeftOuterJoin': joinWrapper(require('./lib/hash/hashLeftOuterJoin'))});
_.mixin({'hashLeftSemiJoin': joinWrapper(require('./lib/hash/hashLeftSemiJoin'))});
_.mixin({'hashRightOuterJoin': joinWrapper(require('./lib/hash/hashRightOuterJoin'))});
_.mixin({'hashRightSemiJoin': joinWrapper(require('./lib/hash/hashRightSemiJoin'))});

_.mixin({'sortedMergeFullOuterJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeFullOuterJoin'))});
_.mixin({'sortedMergeInnerJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeInnerJoin'))});
_.mixin({'sortedMergeLeftOuterJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeLeftOuterJoin'))});
_.mixin({'sortedMergeLeftSemiJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeLeftSemiJoin'))});
_.mixin({'sortedMergeRightOuterJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeRightOuterJoin'))});
_.mixin({'sortedMergeRightSemiJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeRightSemiJoin'))});

_.mixin({'nestedLoopFullOuterJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopFullOuterJoin'))});
_.mixin({'nestedLoopInnerJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopInnerJoin'))});
_.mixin({'nestedLoopLeftOuterJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopLeftOuterJoin'))});
_.mixin({'nestedLoopLeftSemiJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopLeftSemiJoin'))});
_.mixin({'nestedLoopRightOuterJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopRightOuterJoin'))});
_.mixin({'nestedLoopRightSemiJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopRightSemiJoin'))});

module.exports = _;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lib/cartesianProduct":2,"./lib/hash/hashFullOuterJoin":3,"./lib/hash/hashInnerJoin":4,"./lib/hash/hashLeftOuterJoin":5,"./lib/hash/hashLeftSemiJoin":6,"./lib/hash/hashRightOuterJoin":7,"./lib/hash/hashRightSemiJoin":8,"./lib/joinWrapper":9,"./lib/nestedLoop/nestedLoopFullOuterJoin":10,"./lib/nestedLoop/nestedLoopInnerJoin":11,"./lib/nestedLoop/nestedLoopLeftOuterJoin":12,"./lib/nestedLoop/nestedLoopLeftSemiJoin":13,"./lib/nestedLoop/nestedLoopRightOuterJoin":14,"./lib/nestedLoop/nestedLoopRightSemiJoin":15,"./lib/sortedMerge/sortedMergeFullOuterJoin":16,"./lib/sortedMerge/sortedMergeInnerJoin":17,"./lib/sortedMerge/sortedMergeLeftOuterJoin":18,"./lib/sortedMerge/sortedMergeLeftSemiJoin":19,"./lib/sortedMerge/sortedMergeRightOuterJoin":20,"./lib/sortedMerge/sortedMergeRightSemiJoin":21}],2:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    filter = _.filter,
    flatten = _.flatten,
    groupBy = _.groupBy,
    has = _.has,
    map = _.map,
    reduceRight = _.reduceRight,
    values = _.values;

/**
 * Hash full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    var idx,
        markedVals = {},
        result,
        val;
    if (a.length < b.length) {
        idx = groupBy(a, aAccessor);
        result = reduceRight(b, function (previous, datum) {
            markedVals[val = bAccessor(datum)] = true;
            if (has(idx, val)) {
                return map(idx[val], function (oDatum) {
                    return assign({}, oDatum, datum);
                }).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    } else {
        idx = groupBy(b, bAccessor);
        result = reduceRight(a, function (previous, datum) {
            markedVals[val = aAccessor(datum)] = true;
            if (has(idx, val)) {
                return map(idx[val], function (oDatum) {
                    return assign({}, datum, oDatum);
                }).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    }
    return result.concat(flatten(values(filter(idx, function (value, key) {
        return !has(markedVals, key);
    }))));
};

module.exports = hashFullOuterJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    groupBy = _.groupBy,
    has = _.has,
    map = _.map,
    reduceRight = _.reduceRight;

/**
 * Hash inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashInnerJoin = function (a, aAccessor, b, bAccessor) {
    var idx,
        result,
        val;
    if (a.length < b.length) {
        idx = groupBy(a, aAccessor);
        result = reduceRight(b, function (previous, datum) {
            if (has(idx, (val = bAccessor(datum)))) {
                return map(idx[val], function (oDatum) {
                    return assign({}, oDatum, datum);
                }).concat(previous);
            }
            return previous;
        }, []);
    } else {
        idx = groupBy(b, bAccessor);
        result = reduceRight(a, function (previous, datum) {
            if (has(idx, (val = aAccessor(datum)))) {
                return map(idx[val], function (oDatum) {
                    return assign({}, datum, oDatum);
                }).concat(previous);
            }
            return previous;
        }, []);
    }
    return result;
};

module.exports = hashInnerJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    filter = _.filter,
    flatten = _.flatten,
    groupBy = _.groupBy,
    has = _.has,
    map = _.map,
    reduceRight = _.reduceRight,
    values = _.values;

/**
 * Hash left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    var idx,
        val;
    if (a.length < b.length) {
        var markedVals = {};
        idx = groupBy(a, aAccessor);
        return reduceRight(b, function (previous, datum) {
            markedVals[val = bAccessor(datum)] = true;
            if (has(idx, val)) {
                return map(idx[val], function (oDatum) {
                    return assign({}, oDatum, datum);
                }).concat(previous);
            }
            return previous;
        }, []).concat(flatten(values(filter(idx, function (value, key) {
            return !has(markedVals, key);
        }))));
    } else {
        idx = groupBy(b, bAccessor);
        return reduceRight(a, function (previous, datum) {
            if (has(idx, (val = aAccessor(datum)))) {
                return map(idx[val], function (oDatum) {
                    return assign({}, datum, oDatum);
                }).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    }
};

module.exports = hashLeftOuterJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    filter = _.filter,
    has = _.has,
    indexBy = _.indexBy;

/**
 * Hash left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    var idx = indexBy(b, bAccessor);
    return filter(a, function (datum) {
        return has(idx, aAccessor(datum));
    });
};

module.exports = hashLeftSemiJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],7:[function(require,module,exports){
var hashLeftOuterJoin = require('./hashLeftOuterJoin');

/**
 * Hash right outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashRightOuterJoin = function (a, aAccessor, b, bAccessor) {
    return hashLeftOuterJoin(b, bAccessor, a, aAccessor);
};

module.exports = hashRightOuterJoin;

},{"./hashLeftOuterJoin":5}],8:[function(require,module,exports){
var hashLeftSemiJoin = require('./hashLeftSemiJoin');

/**
 * Hash right semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashRightSemiJoin = function (a, aAccessor, b, bAccessor) {
    return hashLeftSemiJoin(b, bAccessor, a, aAccessor);
};

module.exports = hashRightSemiJoin;

},{"./hashLeftSemiJoin":6}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    filter = _.filter,
    has = _.has,
    reduceRight = _.reduceRight;

/**
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    var val,
        cval,
        found = {},
        tmpLength;
    return reduceRight(a, function (previous, datum) {
        val = aAccessor(datum);
        tmpLength = previous.length;
        previous = reduceRight(b, function (oPrevious, oDatum, index) {
            cval = bAccessor(oDatum);
            if (val <= cval && val >= cval) {
                found[index] = true;
                oPrevious.unshift(assign({}, datum, oDatum));
            }
            return oPrevious;
        }, []).concat(previous);
        if (tmpLength === previous.length) {
            previous.unshift(datum);
        }
        return previous;
    }, []).concat(filter(b, function (datum, index) {
        return !has(found, index);
    }));
};

module.exports = nestedLoopFullOuterJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],11:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    reduceRight = _.reduceRight;

/**
 * Nested loop inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopInnerJoin = function (a, aAccessor, b, bAccessor) {
    var val,
        cval;
    return reduceRight(a, function (previous, datum) {
        val = aAccessor(datum);
        return reduceRight(b, function (oPrevious, oDatum) {
            cval = bAccessor(oDatum);
            if (val <= cval && val >= cval) {
                oPrevious.unshift(assign({}, datum, oDatum));
            }
            return oPrevious;
        }, []).concat(previous);
    }, []);
};

module.exports = nestedLoopInnerJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],12:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    reduceRight = _.reduceRight;

/**
 * Nested loop left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    var val,
        cval,
        tmpLength;
    return reduceRight(a, function (previous, datum) {
        val = aAccessor(datum);
        tmpLength = previous.length;
        previous = reduceRight(b, function (oPrevious, oDatum) {
            cval = bAccessor(oDatum);
            if (val <= cval && val >= cval) {
                oPrevious.unshift(assign({}, datum, oDatum));
            }
            return oPrevious;
        }, []).concat(previous);
        if (tmpLength === previous.length) {
            previous.unshift(datum);
        }
        return previous;
    }, []);
};

module.exports = nestedLoopLeftOuterJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],13:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    filter = _.filter,
    some = _.some;

/**
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    var val,
        cval;
    return filter(a, function (datum) {
        val = aAccessor(datum);
        return some(b, function (oDatum) {
            cval = bAccessor(oDatum);
            return val <= cval && val >= cval;
        });
    });
};

module.exports = nestedLoopLeftSemiJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
var nestedLoopLeftOuterJoin = require('./nestedLoopLeftOuterJoin');

/**
 * Nested loop right outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopRightOuterJoin = function (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftOuterJoin(b, bAccessor, a, aAccessor);
};

module.exports = nestedLoopRightOuterJoin;

},{"./nestedLoopLeftOuterJoin":12}],15:[function(require,module,exports){
var nestedLoopLeftSemiJoin = require('./nestedLoopLeftSemiJoin');

/**
 * Nested loop right semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopRightSemiJoin = function (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftSemiJoin(b, bAccessor, a, aAccessor);
};

module.exports = nestedLoopRightSemiJoin;

},{"./nestedLoopLeftSemiJoin":13}],16:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    sortBy = _.sortBy,
    reduceRight = _.reduceRight,
    yieldRightSubList = require('../util/yieldRightSubList');

/**
 * Sorted merge left outer join.  Returns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
    var r = [],
        aDatums = yieldRightSubList(a, aAccessor),
        bDatums = yieldRightSubList(b, bAccessor);
    while (aDatums && bDatums) {
        if (aDatums.val > bDatums.val) {
            r = aDatums.r.concat(r);
            aDatums = yieldRightSubList(a, aAccessor);
        } else if (aDatums.val < bDatums.val) {
            r = bDatums.r.concat(r);
            bDatums = yieldRightSubList(b, bAccessor);
        } else {
            r = reduceRight(aDatums.r, function (orevious, datum) {
                return reduceRight(bDatums.r, function (prev, cDatum) {
                    prev.unshift(assign({}, datum, cDatum));
                    return prev;
                }, []).concat(orevious);
            }, []).concat(r);
            aDatums = yieldRightSubList(a, aAccessor);
            bDatums = yieldRightSubList(b, bAccessor);
        }
    }
    if (bDatums) {
        r = bDatums.r.concat(r);
    }
    if (aDatums) {
        r = aDatums.r.concat(r);
    }
    return a.concat(b, r);
};

module.exports = sortedMergeLeftOuterJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../util/yieldRightSubList":23}],17:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    sortBy = _.sortBy,
    reduceRight = _.reduceRight,
    yieldRightSubList = require('../util/yieldRightSubList');

/**
 * Sorted merge inner join.  Returns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeInnerJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
    var r = [],
        aDatums = yieldRightSubList(a, aAccessor),
        bDatums = yieldRightSubList(b, bAccessor);
    while (aDatums && bDatums) {
        if (aDatums.val > bDatums.val) {
            aDatums = yieldRightSubList(a, aAccessor);
        } else if (aDatums.val < bDatums.val) {
            bDatums = yieldRightSubList(b, bAccessor);
        } else {
            r = reduceRight(aDatums.r, function (orevious, datum) {
                return reduceRight(bDatums.r, function (prev, cDatum) {
                    prev.unshift(assign({}, datum, cDatum));
                    return prev;
                }, []).concat(orevious);
            }, []).concat(r);
            aDatums = yieldRightSubList(a, aAccessor);
            bDatums = yieldRightSubList(b, bAccessor);
        }
    }
    return r;
};

module.exports = sortedMergeInnerJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../util/yieldRightSubList":23}],18:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    sortBy = _.sortBy,
    reduceRight = _.reduceRight,
    yieldRightSubList = require('../util/yieldRightSubList');

/**
 * Sorted merge left outer join.  Returns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
    var r = [],
        aDatums = yieldRightSubList(a, aAccessor),
        bDatums = yieldRightSubList(b, bAccessor);
    while (aDatums && bDatums) {
        if (aDatums.val > bDatums.val) {
            r = aDatums.r.concat(r);
            aDatums = yieldRightSubList(a, aAccessor);
        } else if (aDatums.val < bDatums.val) {
            bDatums = yieldRightSubList(b, bAccessor);
        } else {
            r = reduceRight(aDatums.r, function (orevious, datum) {
                return reduceRight(bDatums.r, function (prev, cDatum) {
                    prev.unshift(assign({}, datum, cDatum));
                    return prev;
                }, []).concat(orevious);
            }, []).concat(r);
            aDatums = yieldRightSubList(a, aAccessor);
            bDatums = yieldRightSubList(b, bAccessor);
        }
    }
    if (aDatums) {
        r = aDatums.r.concat(r);
    }
    return a.concat(r);
};

module.exports = sortedMergeLeftOuterJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../util/yieldRightSubList":23}],19:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    sortBy = _.sortBy,
    undef = require('../util/undefined');

/**
 * Sorted merge left semi join.  Returns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
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
            r.unshift(aDatum);
            aVal = undef(aDatum = a.pop(), aAccessor);
        }
    }
    return r;
};

module.exports = sortedMergeLeftSemiJoin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../util/undefined":22}],20:[function(require,module,exports){
var sortedMergeLeftOuterJoin = require('./sortedMergeLeftOuterJoin');

/**
 * Sorted merge right outer join.  Returns the b-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeRightOuterJoin = function (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftOuterJoin(b, bAccessor, a, aAccessor);
};

module.exports = sortedMergeRightOuterJoin;

},{"./sortedMergeLeftOuterJoin":18}],21:[function(require,module,exports){
var sortedMergeLeftSemiJoin = require('./sortedMergeLeftSemiJoin');

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeRightSemiJoin = function (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftSemiJoin(b, bAccessor, a, aAccessor);
};

module.exports = sortedMergeRightSemiJoin;

},{"./sortedMergeLeftSemiJoin":19}],22:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    isUndefined = _.isUndefined;

var undef = function (obj, fn) {
    return isUndefined(obj) ? obj : fn(obj);
};

module.exports = undef;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],23:[function(require,module,exports){
/**
 * From a sorted list, yield a subList where the accessor values are the same
 * @param  {*[]} sortedList
 * @param  {Function} accessor
 * @return {{}}
 */
var yieldRightSubList = function (sortedList, accessor) {
    var r,
        datum,
        val,
        tmpVal,
        i;
    if (sortedList.length > 0) {
        val = accessor(datum = sortedList.pop());
        r = [datum];
        i = sortedList.length;
        while (i--) {
            tmpVal = accessor(sortedList[i]);
            if (val <= tmpVal && val >= tmpVal) {
                r.unshift(sortedList.pop());
            } else {
                break;
            }
        }
    }
    return r ? {r: r, val: val} : r;
};

module.exports = yieldRightSubList;

},{}]},{},[1])


//# sourceMappingURL=lodash-joins.js.map