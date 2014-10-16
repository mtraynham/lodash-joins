(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

_.cartesianProduct = require('./lib/cartesianProduct');

_.hashFullOuterJoin = require('./lib/hash/hashFullOuterJoin');
_.hashInnerJoin = require('./lib/hash/hashInnerJoin');
_.hashLeftOuterJoin = require('./lib/hash/hashLeftOuterJoin');
_.hashLeftSemiJoin = require('./lib/hash/hashLeftSemiJoin');
_.hashRightOuterJoin = require('./lib/hash/hashRightOuterJoin');
_.hashRightSemiJoin = require('./lib/hash/hashRightSemiJoin');

_.sortedMergeFullOuterJoin = require('./lib/sortedMerge/sortedMergeFullOuterJoin');
_.sortedMergeInnerJoin = require('./lib/sortedMerge/sortedMergeInnerJoin');
_.sortedMergeLeftOuterJoin = require('./lib/sortedMerge/sortedMergeLeftOuterJoin');
_.sortedMergeLeftSemiJoin = require('./lib/sortedMerge/sortedMergeLeftSemiJoin');
_.sortedMergeRightOuterJoin = require('./lib/sortedMerge/sortedMergeRightOuterJoin');
_.sortedMergeRightSemiJoin = require('./lib/sortedMerge/sortedMergeRightSemiJoin');

_.nestedLoopFullOuterJoin = require('./lib/nestedLoop/nestedLoopFullOuterJoin');
_.nestedLoopInnerJoin = require('./lib/nestedLoop/nestedLoopInnerJoin');
_.nestedLoopLeftOuterJoin = require('./lib/nestedLoop/nestedLoopLeftOuterJoin');
_.nestedLoopLeftSemiJoin = require('./lib/nestedLoop/nestedLoopLeftSemiJoin');
_.nestedLoopRightOuterJoin = require('./lib/nestedLoop/nestedLoopRightOuterJoin');
_.nestedLoopRightSemiJoin = require('./lib/nestedLoop/nestedLoopRightSemiJoin');

global._ = _;
module.exports = _;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lib/cartesianProduct":2,"./lib/hash/hashFullOuterJoin":3,"./lib/hash/hashInnerJoin":4,"./lib/hash/hashLeftOuterJoin":5,"./lib/hash/hashLeftSemiJoin":6,"./lib/hash/hashRightOuterJoin":7,"./lib/hash/hashRightSemiJoin":8,"./lib/nestedLoop/nestedLoopFullOuterJoin":9,"./lib/nestedLoop/nestedLoopInnerJoin":10,"./lib/nestedLoop/nestedLoopLeftOuterJoin":11,"./lib/nestedLoop/nestedLoopLeftSemiJoin":12,"./lib/nestedLoop/nestedLoopRightOuterJoin":13,"./lib/nestedLoop/nestedLoopRightSemiJoin":14,"./lib/sortedMerge/sortedMergeFullOuterJoin":15,"./lib/sortedMerge/sortedMergeInnerJoin":16,"./lib/sortedMerge/sortedMergeLeftOuterJoin":17,"./lib/sortedMerge/sortedMergeLeftSemiJoin":18,"./lib/sortedMerge/sortedMergeRightOuterJoin":19,"./lib/sortedMerge/sortedMergeRightSemiJoin":20}],2:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
},{"./nestedLoopLeftOuterJoin":11}],14:[function(require,module,exports){
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
},{"./nestedLoopLeftSemiJoin":12}],15:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    sortBy = _.sortBy,
    reduceRight = _.reduceRight,
    yieldRightSubList = require('../util/yieldRightSubList');

/**
 * Sorted merge left outer join.  Resturns a new array.
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
},{"../util/yieldRightSubList":22}],16:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    sortBy = _.sortBy,
    reduceRight = _.reduceRight,
    yieldRightSubList = require('../util/yieldRightSubList');

/**
 * Sorted merge inner join.  Resturns a new array.
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
},{"../util/yieldRightSubList":22}],17:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    assign = _.assign,
    sortBy = _.sortBy,
    reduceRight = _.reduceRight,
    yieldRightSubList = require('../util/yieldRightSubList');

/**
 * Sorted merge left outer join.  Resturns a new array.
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
},{"../util/yieldRightSubList":22}],18:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    sortBy = _.sortBy,
    undef = require('../util/undefined');

/**
 * Sorted merge left semi join.  Resturns a new array.
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
},{"../util/undefined":21}],19:[function(require,module,exports){
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
},{"./sortedMergeLeftOuterJoin":17}],20:[function(require,module,exports){
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
},{"./sortedMergeLeftSemiJoin":18}],21:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    isUndefined = _.isUndefined;

var undef = function (obj, fn) {
    return isUndefined(obj) ? obj : fn(obj);
};

module.exports = undef;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],22:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9jYXJ0ZXNpYW5Qcm9kdWN0LmpzIiwibGliL2hhc2gvaGFzaEZ1bGxPdXRlckpvaW4uanMiLCJsaWIvaGFzaC9oYXNoSW5uZXJKb2luLmpzIiwibGliL2hhc2gvaGFzaExlZnRPdXRlckpvaW4uanMiLCJsaWIvaGFzaC9oYXNoTGVmdFNlbWlKb2luLmpzIiwibGliL2hhc2gvaGFzaFJpZ2h0T3V0ZXJKb2luLmpzIiwibGliL2hhc2gvaGFzaFJpZ2h0U2VtaUpvaW4uanMiLCJsaWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wRnVsbE91dGVySm9pbi5qcyIsImxpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BJbm5lckpvaW4uanMiLCJsaWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wTGVmdE91dGVySm9pbi5qcyIsImxpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BMZWZ0U2VtaUpvaW4uanMiLCJsaWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wUmlnaHRPdXRlckpvaW4uanMiLCJsaWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wUmlnaHRTZW1pSm9pbi5qcyIsImxpYi9zb3J0ZWRNZXJnZS9zb3J0ZWRNZXJnZUZ1bGxPdXRlckpvaW4uanMiLCJsaWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VJbm5lckpvaW4uanMiLCJsaWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luLmpzIiwibGliL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlTGVmdFNlbWlKb2luLmpzIiwibGliL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlUmlnaHRPdXRlckpvaW4uanMiLCJsaWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VSaWdodFNlbWlKb2luLmpzIiwibGliL3V0aWwvdW5kZWZpbmVkLmpzIiwibGliL3V0aWwveWllbGRSaWdodFN1Ykxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpO1xuXG5fLmNhcnRlc2lhblByb2R1Y3QgPSByZXF1aXJlKCcuL2xpYi9jYXJ0ZXNpYW5Qcm9kdWN0Jyk7XG5cbl8uaGFzaEZ1bGxPdXRlckpvaW4gPSByZXF1aXJlKCcuL2xpYi9oYXNoL2hhc2hGdWxsT3V0ZXJKb2luJyk7XG5fLmhhc2hJbm5lckpvaW4gPSByZXF1aXJlKCcuL2xpYi9oYXNoL2hhc2hJbm5lckpvaW4nKTtcbl8uaGFzaExlZnRPdXRlckpvaW4gPSByZXF1aXJlKCcuL2xpYi9oYXNoL2hhc2hMZWZ0T3V0ZXJKb2luJyk7XG5fLmhhc2hMZWZ0U2VtaUpvaW4gPSByZXF1aXJlKCcuL2xpYi9oYXNoL2hhc2hMZWZ0U2VtaUpvaW4nKTtcbl8uaGFzaFJpZ2h0T3V0ZXJKb2luID0gcmVxdWlyZSgnLi9saWIvaGFzaC9oYXNoUmlnaHRPdXRlckpvaW4nKTtcbl8uaGFzaFJpZ2h0U2VtaUpvaW4gPSByZXF1aXJlKCcuL2xpYi9oYXNoL2hhc2hSaWdodFNlbWlKb2luJyk7XG5cbl8uc29ydGVkTWVyZ2VGdWxsT3V0ZXJKb2luID0gcmVxdWlyZSgnLi9saWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VGdWxsT3V0ZXJKb2luJyk7XG5fLnNvcnRlZE1lcmdlSW5uZXJKb2luID0gcmVxdWlyZSgnLi9saWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VJbm5lckpvaW4nKTtcbl8uc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luID0gcmVxdWlyZSgnLi9saWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luJyk7XG5fLnNvcnRlZE1lcmdlTGVmdFNlbWlKb2luID0gcmVxdWlyZSgnLi9saWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VMZWZ0U2VtaUpvaW4nKTtcbl8uc29ydGVkTWVyZ2VSaWdodE91dGVySm9pbiA9IHJlcXVpcmUoJy4vbGliL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlUmlnaHRPdXRlckpvaW4nKTtcbl8uc29ydGVkTWVyZ2VSaWdodFNlbWlKb2luID0gcmVxdWlyZSgnLi9saWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VSaWdodFNlbWlKb2luJyk7XG5cbl8ubmVzdGVkTG9vcEZ1bGxPdXRlckpvaW4gPSByZXF1aXJlKCcuL2xpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BGdWxsT3V0ZXJKb2luJyk7XG5fLm5lc3RlZExvb3BJbm5lckpvaW4gPSByZXF1aXJlKCcuL2xpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BJbm5lckpvaW4nKTtcbl8ubmVzdGVkTG9vcExlZnRPdXRlckpvaW4gPSByZXF1aXJlKCcuL2xpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BMZWZ0T3V0ZXJKb2luJyk7XG5fLm5lc3RlZExvb3BMZWZ0U2VtaUpvaW4gPSByZXF1aXJlKCcuL2xpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BMZWZ0U2VtaUpvaW4nKTtcbl8ubmVzdGVkTG9vcFJpZ2h0T3V0ZXJKb2luID0gcmVxdWlyZSgnLi9saWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wUmlnaHRPdXRlckpvaW4nKTtcbl8ubmVzdGVkTG9vcFJpZ2h0U2VtaUpvaW4gPSByZXF1aXJlKCcuL2xpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BSaWdodFNlbWlKb2luJyk7XG5cbmdsb2JhbC5fID0gXztcbm1vZHVsZS5leHBvcnRzID0gXztcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpLFxuICAgIGZsYXR0ZW4gPSBfLmZsYXR0ZW4sXG4gICAgbWFwID0gXy5tYXAsXG4gICAgcmVkdWNlID0gXy5yZWR1Y2U7XG4vKipcbiAqIFByb2R1Y2UgdGhlIGNhcnRlc2lhbiBwcm9kdWN0IG9mIG11bHRpcGxlIGFycmF5c1xuICogQHBhcmFtICB7KltbXV19IGFycmF5XG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBjYXJ0ZXNpYW5Qcm9kdWN0ID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgaWYgKGFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShhcnJheSwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBmbGF0dGVuKG1hcChhLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXAoYiwgZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHguY29uY2F0KFt5XSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIH0sIFtbXV0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNhcnRlc2lhblByb2R1Y3Q7XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBhc3NpZ24gPSBfLmFzc2lnbixcbiAgICBmaWx0ZXIgPSBfLmZpbHRlcixcbiAgICBmbGF0dGVuID0gXy5mbGF0dGVuLFxuICAgIGdyb3VwQnkgPSBfLmdyb3VwQnksXG4gICAgaGFzID0gXy5oYXMsXG4gICAgbWFwID0gXy5tYXAsXG4gICAgcmVkdWNlUmlnaHQgPSBfLnJlZHVjZVJpZ2h0LFxuICAgIHZhbHVlcyA9IF8udmFsdWVzO1xuXG4vKipcbiAqIEhhc2ggZnVsbCBvdXRlciBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgaGFzaEZ1bGxPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICB2YXIgaWR4LFxuICAgICAgICBtYXJrZWRWYWxzID0ge30sXG4gICAgICAgIHJlc3VsdCxcbiAgICAgICAgdmFsO1xuICAgIGlmIChhLmxlbmd0aCA8IGIubGVuZ3RoKSB7XG4gICAgICAgIGlkeCA9IGdyb3VwQnkoYSwgYUFjY2Vzc29yKTtcbiAgICAgICAgcmVzdWx0ID0gcmVkdWNlUmlnaHQoYiwgZnVuY3Rpb24gKHByZXZpb3VzLCBkYXR1bSkge1xuICAgICAgICAgICAgbWFya2VkVmFsc1t2YWwgPSBiQWNjZXNzb3IoZGF0dW0pXSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoaGFzKGlkeCwgdmFsKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXAoaWR4W3ZhbF0sIGZ1bmN0aW9uIChvRGF0dW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFzc2lnbih7fSwgb0RhdHVtLCBkYXR1bSk7XG4gICAgICAgICAgICAgICAgfSkuY29uY2F0KHByZXZpb3VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpb3VzLnVuc2hpZnQoZGF0dW0pO1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgICAgICB9LCBbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWR4ID0gZ3JvdXBCeShiLCBiQWNjZXNzb3IpO1xuICAgICAgICByZXN1bHQgPSByZWR1Y2VSaWdodChhLCBmdW5jdGlvbiAocHJldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgICAgICBtYXJrZWRWYWxzW3ZhbCA9IGFBY2Nlc3NvcihkYXR1bSldID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChoYXMoaWR4LCB2YWwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcChpZHhbdmFsXSwgZnVuY3Rpb24gKG9EYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKHt9LCBkYXR1bSwgb0RhdHVtKTtcbiAgICAgICAgICAgICAgICB9KS5jb25jYXQocHJldmlvdXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMudW5zaGlmdChkYXR1bSk7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5jb25jYXQoZmxhdHRlbih2YWx1ZXMoZmlsdGVyKGlkeCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuICFoYXMobWFya2VkVmFscywga2V5KTtcbiAgICB9KSkpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEZ1bGxPdXRlckpvaW47XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBhc3NpZ24gPSBfLmFzc2lnbixcbiAgICBncm91cEJ5ID0gXy5ncm91cEJ5LFxuICAgIGhhcyA9IF8uaGFzLFxuICAgIG1hcCA9IF8ubWFwLFxuICAgIHJlZHVjZVJpZ2h0ID0gXy5yZWR1Y2VSaWdodDtcblxuLyoqXG4gKiBIYXNoIGlubmVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBoYXNoSW5uZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgdmFyIGlkeCxcbiAgICAgICAgcmVzdWx0LFxuICAgICAgICB2YWw7XG4gICAgaWYgKGEubGVuZ3RoIDwgYi5sZW5ndGgpIHtcbiAgICAgICAgaWR4ID0gZ3JvdXBCeShhLCBhQWNjZXNzb3IpO1xuICAgICAgICByZXN1bHQgPSByZWR1Y2VSaWdodChiLCBmdW5jdGlvbiAocHJldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgICAgICBpZiAoaGFzKGlkeCwgKHZhbCA9IGJBY2Nlc3NvcihkYXR1bSkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXAoaWR4W3ZhbF0sIGZ1bmN0aW9uIChvRGF0dW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFzc2lnbih7fSwgb0RhdHVtLCBkYXR1bSk7XG4gICAgICAgICAgICAgICAgfSkuY29uY2F0KHByZXZpb3VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICAgICAgfSwgW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlkeCA9IGdyb3VwQnkoYiwgYkFjY2Vzc29yKTtcbiAgICAgICAgcmVzdWx0ID0gcmVkdWNlUmlnaHQoYSwgZnVuY3Rpb24gKHByZXZpb3VzLCBkYXR1bSkge1xuICAgICAgICAgICAgaWYgKGhhcyhpZHgsICh2YWwgPSBhQWNjZXNzb3IoZGF0dW0pKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwKGlkeFt2YWxdLCBmdW5jdGlvbiAob0RhdHVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NpZ24oe30sIGRhdHVtLCBvRGF0dW0pO1xuICAgICAgICAgICAgICAgIH0pLmNvbmNhdChwcmV2aW91cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaElubmVySm9pbjtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpLFxuICAgIGFzc2lnbiA9IF8uYXNzaWduLFxuICAgIGZpbHRlciA9IF8uZmlsdGVyLFxuICAgIGZsYXR0ZW4gPSBfLmZsYXR0ZW4sXG4gICAgZ3JvdXBCeSA9IF8uZ3JvdXBCeSxcbiAgICBoYXMgPSBfLmhhcyxcbiAgICBtYXAgPSBfLm1hcCxcbiAgICByZWR1Y2VSaWdodCA9IF8ucmVkdWNlUmlnaHQsXG4gICAgdmFsdWVzID0gXy52YWx1ZXM7XG5cbi8qKlxuICogSGFzaCBsZWZ0IG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBoYXNoTGVmdE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciBpZHgsXG4gICAgICAgIHZhbDtcbiAgICBpZiAoYS5sZW5ndGggPCBiLmxlbmd0aCkge1xuICAgICAgICB2YXIgbWFya2VkVmFscyA9IHt9O1xuICAgICAgICBpZHggPSBncm91cEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgICAgIHJldHVybiByZWR1Y2VSaWdodChiLCBmdW5jdGlvbiAocHJldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgICAgICBtYXJrZWRWYWxzW3ZhbCA9IGJBY2Nlc3NvcihkYXR1bSldID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChoYXMoaWR4LCB2YWwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcChpZHhbdmFsXSwgZnVuY3Rpb24gKG9EYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKHt9LCBvRGF0dW0sIGRhdHVtKTtcbiAgICAgICAgICAgICAgICB9KS5jb25jYXQocHJldmlvdXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgICAgICB9LCBbXSkuY29uY2F0KGZsYXR0ZW4odmFsdWVzKGZpbHRlcihpZHgsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gIWhhcyhtYXJrZWRWYWxzLCBrZXkpO1xuICAgICAgICB9KSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZHggPSBncm91cEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgICAgIHJldHVybiByZWR1Y2VSaWdodChhLCBmdW5jdGlvbiAocHJldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgICAgICBpZiAoaGFzKGlkeCwgKHZhbCA9IGFBY2Nlc3NvcihkYXR1bSkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXAoaWR4W3ZhbF0sIGZ1bmN0aW9uIChvRGF0dW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFzc2lnbih7fSwgZGF0dW0sIG9EYXR1bSk7XG4gICAgICAgICAgICAgICAgfSkuY29uY2F0KHByZXZpb3VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpb3VzLnVuc2hpZnQoZGF0dW0pO1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoTGVmdE91dGVySm9pbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5fIDogbnVsbCksXG4gICAgZmlsdGVyID0gXy5maWx0ZXIsXG4gICAgaGFzID0gXy5oYXMsXG4gICAgaW5kZXhCeSA9IF8uaW5kZXhCeTtcblxuLyoqXG4gKiBIYXNoIGxlZnQgc2VtaSBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgaGFzaExlZnRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciBpZHggPSBpbmRleEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgcmV0dXJuIGZpbHRlcihhLCBmdW5jdGlvbiAoZGF0dW0pIHtcbiAgICAgICAgcmV0dXJuIGhhcyhpZHgsIGFBY2Nlc3NvcihkYXR1bSkpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoTGVmdFNlbWlKb2luO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwidmFyIGhhc2hMZWZ0T3V0ZXJKb2luID0gcmVxdWlyZSgnLi9oYXNoTGVmdE91dGVySm9pbicpO1xuXG4vKipcbiAqIEhhc2ggcmlnaHQgb3V0ZXIgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIGhhc2hSaWdodE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHJldHVybiBoYXNoTGVmdE91dGVySm9pbihiLCBiQWNjZXNzb3IsIGEsIGFBY2Nlc3Nvcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hSaWdodE91dGVySm9pbjsiLCJ2YXIgaGFzaExlZnRTZW1pSm9pbiA9IHJlcXVpcmUoJy4vaGFzaExlZnRTZW1pSm9pbicpO1xuXG4vKipcbiAqIEhhc2ggcmlnaHQgc2VtaSBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgaGFzaFJpZ2h0U2VtaUpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICByZXR1cm4gaGFzaExlZnRTZW1pSm9pbihiLCBiQWNjZXNzb3IsIGEsIGFBY2Nlc3Nvcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hSaWdodFNlbWlKb2luOyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpLFxuICAgIGFzc2lnbiA9IF8uYXNzaWduLFxuICAgIGZpbHRlciA9IF8uZmlsdGVyLFxuICAgIGhhcyA9IF8uaGFzLFxuICAgIHJlZHVjZVJpZ2h0ID0gXy5yZWR1Y2VSaWdodDtcblxuLyoqXG4gKiBOZXN0ZWQgbG9vcCBsZWZ0IHNlbWkgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIG5lc3RlZExvb3BGdWxsT3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgdmFyIHZhbCxcbiAgICAgICAgY3ZhbCxcbiAgICAgICAgZm91bmQgPSB7fSxcbiAgICAgICAgdG1wTGVuZ3RoO1xuICAgIHJldHVybiByZWR1Y2VSaWdodChhLCBmdW5jdGlvbiAocHJldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgIHZhbCA9IGFBY2Nlc3NvcihkYXR1bSk7XG4gICAgICAgIHRtcExlbmd0aCA9IHByZXZpb3VzLmxlbmd0aDtcbiAgICAgICAgcHJldmlvdXMgPSByZWR1Y2VSaWdodChiLCBmdW5jdGlvbiAob1ByZXZpb3VzLCBvRGF0dW0sIGluZGV4KSB7XG4gICAgICAgICAgICBjdmFsID0gYkFjY2Vzc29yKG9EYXR1bSk7XG4gICAgICAgICAgICBpZiAodmFsIDw9IGN2YWwgJiYgdmFsID49IGN2YWwpIHtcbiAgICAgICAgICAgICAgICBmb3VuZFtpbmRleF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIG9QcmV2aW91cy51bnNoaWZ0KGFzc2lnbih7fSwgZGF0dW0sIG9EYXR1bSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9QcmV2aW91cztcbiAgICAgICAgfSwgW10pLmNvbmNhdChwcmV2aW91cyk7XG4gICAgICAgIGlmICh0bXBMZW5ndGggPT09IHByZXZpb3VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcHJldmlvdXMudW5zaGlmdChkYXR1bSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgIH0sIFtdKS5jb25jYXQoZmlsdGVyKGIsIGZ1bmN0aW9uIChkYXR1bSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICFoYXMoZm91bmQsIGluZGV4KTtcbiAgICB9KSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5lc3RlZExvb3BGdWxsT3V0ZXJKb2luO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5fIDogbnVsbCksXG4gICAgYXNzaWduID0gXy5hc3NpZ24sXG4gICAgcmVkdWNlUmlnaHQgPSBfLnJlZHVjZVJpZ2h0O1xuXG4vKipcbiAqIE5lc3RlZCBsb29wIGlubmVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBuZXN0ZWRMb29wSW5uZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgdmFyIHZhbCxcbiAgICAgICAgY3ZhbDtcbiAgICByZXR1cm4gcmVkdWNlUmlnaHQoYSwgZnVuY3Rpb24gKHByZXZpb3VzLCBkYXR1bSkge1xuICAgICAgICB2YWwgPSBhQWNjZXNzb3IoZGF0dW0pO1xuICAgICAgICByZXR1cm4gcmVkdWNlUmlnaHQoYiwgZnVuY3Rpb24gKG9QcmV2aW91cywgb0RhdHVtKSB7XG4gICAgICAgICAgICBjdmFsID0gYkFjY2Vzc29yKG9EYXR1bSk7XG4gICAgICAgICAgICBpZiAodmFsIDw9IGN2YWwgJiYgdmFsID49IGN2YWwpIHtcbiAgICAgICAgICAgICAgICBvUHJldmlvdXMudW5zaGlmdChhc3NpZ24oe30sIGRhdHVtLCBvRGF0dW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvUHJldmlvdXM7XG4gICAgICAgIH0sIFtdKS5jb25jYXQocHJldmlvdXMpO1xuICAgIH0sIFtdKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmVzdGVkTG9vcElubmVySm9pbjtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpLFxuICAgIGFzc2lnbiA9IF8uYXNzaWduLFxuICAgIHJlZHVjZVJpZ2h0ID0gXy5yZWR1Y2VSaWdodDtcblxuLyoqXG4gKiBOZXN0ZWQgbG9vcCBsZWZ0IG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBuZXN0ZWRMb29wTGVmdE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciB2YWwsXG4gICAgICAgIGN2YWwsXG4gICAgICAgIHRtcExlbmd0aDtcbiAgICByZXR1cm4gcmVkdWNlUmlnaHQoYSwgZnVuY3Rpb24gKHByZXZpb3VzLCBkYXR1bSkge1xuICAgICAgICB2YWwgPSBhQWNjZXNzb3IoZGF0dW0pO1xuICAgICAgICB0bXBMZW5ndGggPSBwcmV2aW91cy5sZW5ndGg7XG4gICAgICAgIHByZXZpb3VzID0gcmVkdWNlUmlnaHQoYiwgZnVuY3Rpb24gKG9QcmV2aW91cywgb0RhdHVtKSB7XG4gICAgICAgICAgICBjdmFsID0gYkFjY2Vzc29yKG9EYXR1bSk7XG4gICAgICAgICAgICBpZiAodmFsIDw9IGN2YWwgJiYgdmFsID49IGN2YWwpIHtcbiAgICAgICAgICAgICAgICBvUHJldmlvdXMudW5zaGlmdChhc3NpZ24oe30sIGRhdHVtLCBvRGF0dW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvUHJldmlvdXM7XG4gICAgICAgIH0sIFtdKS5jb25jYXQocHJldmlvdXMpO1xuICAgICAgICBpZiAodG1wTGVuZ3RoID09PSBwcmV2aW91cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzLnVuc2hpZnQoZGF0dW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICB9LCBbXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5lc3RlZExvb3BMZWZ0T3V0ZXJKb2luO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5fIDogbnVsbCksXG4gICAgZmlsdGVyID0gXy5maWx0ZXIsXG4gICAgc29tZSA9IF8uc29tZTtcblxuLyoqXG4gKiBOZXN0ZWQgbG9vcCBsZWZ0IHNlbWkgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIG5lc3RlZExvb3BMZWZ0U2VtaUpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICB2YXIgdmFsLFxuICAgICAgICBjdmFsO1xuICAgIHJldHVybiBmaWx0ZXIoYSwgZnVuY3Rpb24gKGRhdHVtKSB7XG4gICAgICAgIHZhbCA9IGFBY2Nlc3NvcihkYXR1bSk7XG4gICAgICAgIHJldHVybiBzb21lKGIsIGZ1bmN0aW9uIChvRGF0dW0pIHtcbiAgICAgICAgICAgIGN2YWwgPSBiQWNjZXNzb3Iob0RhdHVtKTtcbiAgICAgICAgICAgIHJldHVybiB2YWwgPD0gY3ZhbCAmJiB2YWwgPj0gY3ZhbDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5lc3RlZExvb3BMZWZ0U2VtaUpvaW47XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCJ2YXIgbmVzdGVkTG9vcExlZnRPdXRlckpvaW4gPSByZXF1aXJlKCcuL25lc3RlZExvb3BMZWZ0T3V0ZXJKb2luJyk7XG5cbi8qKlxuICogTmVzdGVkIGxvb3AgcmlnaHQgb3V0ZXIgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIG5lc3RlZExvb3BSaWdodE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHJldHVybiBuZXN0ZWRMb29wTGVmdE91dGVySm9pbihiLCBiQWNjZXNzb3IsIGEsIGFBY2Nlc3Nvcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5lc3RlZExvb3BSaWdodE91dGVySm9pbjsiLCJ2YXIgbmVzdGVkTG9vcExlZnRTZW1pSm9pbiA9IHJlcXVpcmUoJy4vbmVzdGVkTG9vcExlZnRTZW1pSm9pbicpO1xuXG4vKipcbiAqIE5lc3RlZCBsb29wIHJpZ2h0IHNlbWkgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIG5lc3RlZExvb3BSaWdodFNlbWlKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgcmV0dXJuIG5lc3RlZExvb3BMZWZ0U2VtaUpvaW4oYiwgYkFjY2Vzc29yLCBhLCBhQWNjZXNzb3IpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXN0ZWRMb29wUmlnaHRTZW1pSm9pbjsiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBhc3NpZ24gPSBfLmFzc2lnbixcbiAgICBzb3J0QnkgPSBfLnNvcnRCeSxcbiAgICByZWR1Y2VSaWdodCA9IF8ucmVkdWNlUmlnaHQsXG4gICAgeWllbGRSaWdodFN1Ykxpc3QgPSByZXF1aXJlKCcuLi91dGlsL3lpZWxkUmlnaHRTdWJMaXN0Jyk7XG5cbi8qKlxuICogU29ydGVkIG1lcmdlIGxlZnQgb3V0ZXIgam9pbi4gIFJlc3R1cm5zIGEgbmV3IGFycmF5LlxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIHNvcnRlZE1lcmdlTGVmdE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIGlmIChhLmxlbmd0aCA8IDEgfHwgYi5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgYSA9IHNvcnRCeShhLCBhQWNjZXNzb3IpO1xuICAgIGIgPSBzb3J0QnkoYiwgYkFjY2Vzc29yKTtcbiAgICB2YXIgciA9IFtdLFxuICAgICAgICBhRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYSwgYUFjY2Vzc29yKSxcbiAgICAgICAgYkRhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGIsIGJBY2Nlc3Nvcik7XG4gICAgd2hpbGUgKGFEYXR1bXMgJiYgYkRhdHVtcykge1xuICAgICAgICBpZiAoYURhdHVtcy52YWwgPiBiRGF0dW1zLnZhbCkge1xuICAgICAgICAgICAgciA9IGFEYXR1bXMuci5jb25jYXQocik7XG4gICAgICAgICAgICBhRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYSwgYUFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIGlmIChhRGF0dW1zLnZhbCA8IGJEYXR1bXMudmFsKSB7XG4gICAgICAgICAgICByID0gYkRhdHVtcy5yLmNvbmNhdChyKTtcbiAgICAgICAgICAgIGJEYXR1bXMgPSB5aWVsZFJpZ2h0U3ViTGlzdChiLCBiQWNjZXNzb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgciA9IHJlZHVjZVJpZ2h0KGFEYXR1bXMuciwgZnVuY3Rpb24gKG9yZXZpb3VzLCBkYXR1bSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWR1Y2VSaWdodChiRGF0dW1zLnIsIGZ1bmN0aW9uIChwcmV2LCBjRGF0dW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldi51bnNoaWZ0KGFzc2lnbih7fSwgZGF0dW0sIGNEYXR1bSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgICAgICB9LCBbXSkuY29uY2F0KG9yZXZpb3VzKTtcbiAgICAgICAgICAgIH0sIFtdKS5jb25jYXQocik7XG4gICAgICAgICAgICBhRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYSwgYUFjY2Vzc29yKTtcbiAgICAgICAgICAgIGJEYXR1bXMgPSB5aWVsZFJpZ2h0U3ViTGlzdChiLCBiQWNjZXNzb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChiRGF0dW1zKSB7XG4gICAgICAgIHIgPSBiRGF0dW1zLnIuY29uY2F0KHIpO1xuICAgIH1cbiAgICBpZiAoYURhdHVtcykge1xuICAgICAgICByID0gYURhdHVtcy5yLmNvbmNhdChyKTtcbiAgICB9XG4gICAgcmV0dXJuIGEuY29uY2F0KGIsIHIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW47XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBhc3NpZ24gPSBfLmFzc2lnbixcbiAgICBzb3J0QnkgPSBfLnNvcnRCeSxcbiAgICByZWR1Y2VSaWdodCA9IF8ucmVkdWNlUmlnaHQsXG4gICAgeWllbGRSaWdodFN1Ykxpc3QgPSByZXF1aXJlKCcuLi91dGlsL3lpZWxkUmlnaHRTdWJMaXN0Jyk7XG5cbi8qKlxuICogU29ydGVkIG1lcmdlIGlubmVyIGpvaW4uICBSZXN0dXJucyBhIG5ldyBhcnJheS5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBzb3J0ZWRNZXJnZUlubmVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIGlmIChhLmxlbmd0aCA8IDEgfHwgYi5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgYSA9IHNvcnRCeShhLCBhQWNjZXNzb3IpO1xuICAgIGIgPSBzb3J0QnkoYiwgYkFjY2Vzc29yKTtcbiAgICB2YXIgciA9IFtdLFxuICAgICAgICBhRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYSwgYUFjY2Vzc29yKSxcbiAgICAgICAgYkRhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGIsIGJBY2Nlc3Nvcik7XG4gICAgd2hpbGUgKGFEYXR1bXMgJiYgYkRhdHVtcykge1xuICAgICAgICBpZiAoYURhdHVtcy52YWwgPiBiRGF0dW1zLnZhbCkge1xuICAgICAgICAgICAgYURhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGEsIGFBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoYURhdHVtcy52YWwgPCBiRGF0dW1zLnZhbCkge1xuICAgICAgICAgICAgYkRhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGIsIGJBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByID0gcmVkdWNlUmlnaHQoYURhdHVtcy5yLCBmdW5jdGlvbiAob3JldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZHVjZVJpZ2h0KGJEYXR1bXMuciwgZnVuY3Rpb24gKHByZXYsIGNEYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2LnVuc2hpZnQoYXNzaWduKHt9LCBkYXR1bSwgY0RhdHVtKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgIH0sIFtdKS5jb25jYXQob3JldmlvdXMpO1xuICAgICAgICAgICAgfSwgW10pLmNvbmNhdChyKTtcbiAgICAgICAgICAgIGFEYXR1bXMgPSB5aWVsZFJpZ2h0U3ViTGlzdChhLCBhQWNjZXNzb3IpO1xuICAgICAgICAgICAgYkRhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGIsIGJBY2Nlc3Nvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRlZE1lcmdlSW5uZXJKb2luO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5fIDogbnVsbCksXG4gICAgYXNzaWduID0gXy5hc3NpZ24sXG4gICAgc29ydEJ5ID0gXy5zb3J0QnksXG4gICAgcmVkdWNlUmlnaHQgPSBfLnJlZHVjZVJpZ2h0LFxuICAgIHlpZWxkUmlnaHRTdWJMaXN0ID0gcmVxdWlyZSgnLi4vdXRpbC95aWVsZFJpZ2h0U3ViTGlzdCcpO1xuXG4vKipcbiAqIFNvcnRlZCBtZXJnZSBsZWZ0IG91dGVyIGpvaW4uICBSZXN0dXJucyBhIG5ldyBhcnJheS5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBzb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICBpZiAoYS5sZW5ndGggPCAxIHx8IGIubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGEgPSBzb3J0QnkoYSwgYUFjY2Vzc29yKTtcbiAgICBiID0gc29ydEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgdmFyIHIgPSBbXSxcbiAgICAgICAgYURhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGEsIGFBY2Nlc3NvciksXG4gICAgICAgIGJEYXR1bXMgPSB5aWVsZFJpZ2h0U3ViTGlzdChiLCBiQWNjZXNzb3IpO1xuICAgIHdoaWxlIChhRGF0dW1zICYmIGJEYXR1bXMpIHtcbiAgICAgICAgaWYgKGFEYXR1bXMudmFsID4gYkRhdHVtcy52YWwpIHtcbiAgICAgICAgICAgIHIgPSBhRGF0dW1zLnIuY29uY2F0KHIpO1xuICAgICAgICAgICAgYURhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGEsIGFBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoYURhdHVtcy52YWwgPCBiRGF0dW1zLnZhbCkge1xuICAgICAgICAgICAgYkRhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGIsIGJBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByID0gcmVkdWNlUmlnaHQoYURhdHVtcy5yLCBmdW5jdGlvbiAob3JldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZHVjZVJpZ2h0KGJEYXR1bXMuciwgZnVuY3Rpb24gKHByZXYsIGNEYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2LnVuc2hpZnQoYXNzaWduKHt9LCBkYXR1bSwgY0RhdHVtKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgIH0sIFtdKS5jb25jYXQob3JldmlvdXMpO1xuICAgICAgICAgICAgfSwgW10pLmNvbmNhdChyKTtcbiAgICAgICAgICAgIGFEYXR1bXMgPSB5aWVsZFJpZ2h0U3ViTGlzdChhLCBhQWNjZXNzb3IpO1xuICAgICAgICAgICAgYkRhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGIsIGJBY2Nlc3Nvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFEYXR1bXMpIHtcbiAgICAgICAgciA9IGFEYXR1bXMuci5jb25jYXQocik7XG4gICAgfVxuICAgIHJldHVybiBhLmNvbmNhdChyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5fIDogbnVsbCksXG4gICAgc29ydEJ5ID0gXy5zb3J0QnksXG4gICAgdW5kZWYgPSByZXF1aXJlKCcuLi91dGlsL3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIFNvcnRlZCBtZXJnZSBsZWZ0IHNlbWkgam9pbi4gIFJlc3R1cm5zIGEgbmV3IGFycmF5LlxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIHNvcnRlZE1lcmdlTGVmdFNlbWlKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgaWYgKGEubGVuZ3RoIDwgMSB8fCBiLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBhID0gc29ydEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgYiA9IHNvcnRCeShiLCBiQWNjZXNzb3IpO1xuICAgIHZhciByID0gW10sXG4gICAgICAgIGFEYXR1bSA9IGEucG9wKCksXG4gICAgICAgIGJEYXR1bSA9IGIucG9wKCksXG4gICAgICAgIGFWYWwgPSBhQWNjZXNzb3IoYURhdHVtKSxcbiAgICAgICAgYlZhbCA9IGJBY2Nlc3NvcihiRGF0dW0pO1xuICAgIHdoaWxlIChhRGF0dW0gJiYgYkRhdHVtKSB7XG4gICAgICAgIGlmIChhVmFsID4gYlZhbCkge1xuICAgICAgICAgICAgYVZhbCA9IHVuZGVmKGFEYXR1bSA9IGEucG9wKCksIGFBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoYVZhbCA8IGJWYWwpIHtcbiAgICAgICAgICAgIGJWYWwgPSB1bmRlZihiRGF0dW0gPSBiLnBvcCgpLCBiQWNjZXNzb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgci51bnNoaWZ0KGFEYXR1bSk7XG4gICAgICAgICAgICBhVmFsID0gdW5kZWYoYURhdHVtID0gYS5wb3AoKSwgYUFjY2Vzc29yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkTWVyZ2VMZWZ0U2VtaUpvaW47XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCJ2YXIgc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luID0gcmVxdWlyZSgnLi9zb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW4nKTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgcmlnaHQgb3V0ZXIgam9pbi4gIFJldHVybnMgdGhlIGItYXJyYXkgcmVmZXJlbmNlLlxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIHNvcnRlZE1lcmdlUmlnaHRPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICByZXR1cm4gc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luKGIsIGJBY2Nlc3NvciwgYSwgYUFjY2Vzc29yKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkTWVyZ2VSaWdodE91dGVySm9pbjsiLCJ2YXIgc29ydGVkTWVyZ2VMZWZ0U2VtaUpvaW4gPSByZXF1aXJlKCcuL3NvcnRlZE1lcmdlTGVmdFNlbWlKb2luJyk7XG5cbi8qKlxuICogU29ydGVkIG1lcmdlIHJpZ2h0IHNlbWkgam9pbi4gIFJldHVybnMgdGhlIGItYXJyYXkgcmVmZXJlbmNlLlxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIHNvcnRlZE1lcmdlUmlnaHRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHJldHVybiBzb3J0ZWRNZXJnZUxlZnRTZW1pSm9pbihiLCBiQWNjZXNzb3IsIGEsIGFBY2Nlc3Nvcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRlZE1lcmdlUmlnaHRTZW1pSm9pbjsiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBpc1VuZGVmaW5lZCA9IF8uaXNVbmRlZmluZWQ7XG5cbnZhciB1bmRlZiA9IGZ1bmN0aW9uIChvYmosIGZuKSB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKG9iaikgPyBvYmogOiBmbihvYmopO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmRlZjtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIi8qKlxuICogRnJvbSBhIHNvcnRlZCBsaXN0LCB5aWVsZCBhIHN1Ykxpc3Qgd2hlcmUgdGhlIGFjY2Vzc29yIHZhbHVlcyBhcmUgdGhlIHNhbWVcbiAqIEBwYXJhbSAgeypbXX0gc29ydGVkTGlzdFxuICogQHBhcmFtICB7RnVuY3Rpb259IGFjY2Vzc29yXG4gKiBAcmV0dXJuIHt7fX1cbiAqL1xudmFyIHlpZWxkUmlnaHRTdWJMaXN0ID0gZnVuY3Rpb24gKHNvcnRlZExpc3QsIGFjY2Vzc29yKSB7XG4gICAgdmFyIHIsXG4gICAgICAgIGRhdHVtLFxuICAgICAgICB2YWwsXG4gICAgICAgIHRtcFZhbCxcbiAgICAgICAgaTtcbiAgICBpZiAoc29ydGVkTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbCA9IGFjY2Vzc29yKGRhdHVtID0gc29ydGVkTGlzdC5wb3AoKSk7XG4gICAgICAgIHIgPSBbZGF0dW1dO1xuICAgICAgICBpID0gc29ydGVkTGlzdC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIHRtcFZhbCA9IGFjY2Vzc29yKHNvcnRlZExpc3RbaV0pO1xuICAgICAgICAgICAgaWYgKHZhbCA8PSB0bXBWYWwgJiYgdmFsID49IHRtcFZhbCkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChzb3J0ZWRMaXN0LnBvcCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHIgPyB7cjogciwgdmFsOiB2YWx9IDogcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geWllbGRSaWdodFN1Ykxpc3Q7Il19
