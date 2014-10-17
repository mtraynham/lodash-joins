(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

_.mixin({'cartesianProduct': require('./lib/cartesianProduct')});

_.mixin({'hashFullOuterJoin': require('./lib/hash/hashFullOuterJoin')});
_.mixin({'hashInnerJoin': require('./lib/hash/hashInnerJoin')});
_.mixin({'hashLeftOuterJoin': require('./lib/hash/hashLeftOuterJoin')});
_.mixin({'hashLeftSemiJoin': require('./lib/hash/hashLeftSemiJoin')});
_.mixin({'hashRightOuterJoin': require('./lib/hash/hashRightOuterJoin')});
_.mixin({'hashRightSemiJoin': require('./lib/hash/hashRightSemiJoin')});

_.mixin({'sortedMergeFullOuterJoin': require('./lib/sortedMerge/sortedMergeFullOuterJoin')});
_.mixin({'sortedMergeInnerJoin': require('./lib/sortedMerge/sortedMergeInnerJoin')});
_.mixin({'sortedMergeLeftOuterJoin': require('./lib/sortedMerge/sortedMergeLeftOuterJoin')});
_.mixin({'sortedMergeLeftSemiJoin': require('./lib/sortedMerge/sortedMergeLeftSemiJoin')});
_.mixin({'sortedMergeRightOuterJoin': require('./lib/sortedMerge/sortedMergeRightOuterJoin')});
_.mixin({'sortedMergeRightSemiJoin': require('./lib/sortedMerge/sortedMergeRightSemiJoin')});

_.mixin({'nestedLoopFullOuterJoin': require('./lib/nestedLoop/nestedLoopFullOuterJoin')});
_.mixin({'nestedLoopInnerJoin': require('./lib/nestedLoop/nestedLoopInnerJoin')});
_.mixin({'nestedLoopLeftOuterJoin': require('./lib/nestedLoop/nestedLoopLeftOuterJoin')});
_.mixin({'nestedLoopLeftSemiJoin': require('./lib/nestedLoop/nestedLoopLeftSemiJoin')});
_.mixin({'nestedLoopRightOuterJoin': require('./lib/nestedLoop/nestedLoopRightOuterJoin')});
_.mixin({'nestedLoopRightSemiJoin': require('./lib/nestedLoop/nestedLoopRightSemiJoin')});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9jYXJ0ZXNpYW5Qcm9kdWN0LmpzIiwibGliL2hhc2gvaGFzaEZ1bGxPdXRlckpvaW4uanMiLCJsaWIvaGFzaC9oYXNoSW5uZXJKb2luLmpzIiwibGliL2hhc2gvaGFzaExlZnRPdXRlckpvaW4uanMiLCJsaWIvaGFzaC9oYXNoTGVmdFNlbWlKb2luLmpzIiwibGliL2hhc2gvaGFzaFJpZ2h0T3V0ZXJKb2luLmpzIiwibGliL2hhc2gvaGFzaFJpZ2h0U2VtaUpvaW4uanMiLCJsaWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wRnVsbE91dGVySm9pbi5qcyIsImxpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BJbm5lckpvaW4uanMiLCJsaWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wTGVmdE91dGVySm9pbi5qcyIsImxpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BMZWZ0U2VtaUpvaW4uanMiLCJsaWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wUmlnaHRPdXRlckpvaW4uanMiLCJsaWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wUmlnaHRTZW1pSm9pbi5qcyIsImxpYi9zb3J0ZWRNZXJnZS9zb3J0ZWRNZXJnZUZ1bGxPdXRlckpvaW4uanMiLCJsaWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VJbm5lckpvaW4uanMiLCJsaWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luLmpzIiwibGliL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlTGVmdFNlbWlKb2luLmpzIiwibGliL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlUmlnaHRPdXRlckpvaW4uanMiLCJsaWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VSaWdodFNlbWlKb2luLmpzIiwibGliL3V0aWwvdW5kZWZpbmVkLmpzIiwibGliL3V0aWwveWllbGRSaWdodFN1Ykxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKTtcblxuXy5taXhpbih7J2NhcnRlc2lhblByb2R1Y3QnOiByZXF1aXJlKCcuL2xpYi9jYXJ0ZXNpYW5Qcm9kdWN0Jyl9KTtcblxuXy5taXhpbih7J2hhc2hGdWxsT3V0ZXJKb2luJzogcmVxdWlyZSgnLi9saWIvaGFzaC9oYXNoRnVsbE91dGVySm9pbicpfSk7XG5fLm1peGluKHsnaGFzaElubmVySm9pbic6IHJlcXVpcmUoJy4vbGliL2hhc2gvaGFzaElubmVySm9pbicpfSk7XG5fLm1peGluKHsnaGFzaExlZnRPdXRlckpvaW4nOiByZXF1aXJlKCcuL2xpYi9oYXNoL2hhc2hMZWZ0T3V0ZXJKb2luJyl9KTtcbl8ubWl4aW4oeydoYXNoTGVmdFNlbWlKb2luJzogcmVxdWlyZSgnLi9saWIvaGFzaC9oYXNoTGVmdFNlbWlKb2luJyl9KTtcbl8ubWl4aW4oeydoYXNoUmlnaHRPdXRlckpvaW4nOiByZXF1aXJlKCcuL2xpYi9oYXNoL2hhc2hSaWdodE91dGVySm9pbicpfSk7XG5fLm1peGluKHsnaGFzaFJpZ2h0U2VtaUpvaW4nOiByZXF1aXJlKCcuL2xpYi9oYXNoL2hhc2hSaWdodFNlbWlKb2luJyl9KTtcblxuXy5taXhpbih7J3NvcnRlZE1lcmdlRnVsbE91dGVySm9pbic6IHJlcXVpcmUoJy4vbGliL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlRnVsbE91dGVySm9pbicpfSk7XG5fLm1peGluKHsnc29ydGVkTWVyZ2VJbm5lckpvaW4nOiByZXF1aXJlKCcuL2xpYi9zb3J0ZWRNZXJnZS9zb3J0ZWRNZXJnZUlubmVySm9pbicpfSk7XG5fLm1peGluKHsnc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luJzogcmVxdWlyZSgnLi9saWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luJyl9KTtcbl8ubWl4aW4oeydzb3J0ZWRNZXJnZUxlZnRTZW1pSm9pbic6IHJlcXVpcmUoJy4vbGliL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlTGVmdFNlbWlKb2luJyl9KTtcbl8ubWl4aW4oeydzb3J0ZWRNZXJnZVJpZ2h0T3V0ZXJKb2luJzogcmVxdWlyZSgnLi9saWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VSaWdodE91dGVySm9pbicpfSk7XG5fLm1peGluKHsnc29ydGVkTWVyZ2VSaWdodFNlbWlKb2luJzogcmVxdWlyZSgnLi9saWIvc29ydGVkTWVyZ2Uvc29ydGVkTWVyZ2VSaWdodFNlbWlKb2luJyl9KTtcblxuXy5taXhpbih7J25lc3RlZExvb3BGdWxsT3V0ZXJKb2luJzogcmVxdWlyZSgnLi9saWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wRnVsbE91dGVySm9pbicpfSk7XG5fLm1peGluKHsnbmVzdGVkTG9vcElubmVySm9pbic6IHJlcXVpcmUoJy4vbGliL25lc3RlZExvb3AvbmVzdGVkTG9vcElubmVySm9pbicpfSk7XG5fLm1peGluKHsnbmVzdGVkTG9vcExlZnRPdXRlckpvaW4nOiByZXF1aXJlKCcuL2xpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BMZWZ0T3V0ZXJKb2luJyl9KTtcbl8ubWl4aW4oeyduZXN0ZWRMb29wTGVmdFNlbWlKb2luJzogcmVxdWlyZSgnLi9saWIvbmVzdGVkTG9vcC9uZXN0ZWRMb29wTGVmdFNlbWlKb2luJyl9KTtcbl8ubWl4aW4oeyduZXN0ZWRMb29wUmlnaHRPdXRlckpvaW4nOiByZXF1aXJlKCcuL2xpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BSaWdodE91dGVySm9pbicpfSk7XG5fLm1peGluKHsnbmVzdGVkTG9vcFJpZ2h0U2VtaUpvaW4nOiByZXF1aXJlKCcuL2xpYi9uZXN0ZWRMb29wL25lc3RlZExvb3BSaWdodFNlbWlKb2luJyl9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBfO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5fIDogbnVsbCksXG4gICAgZmxhdHRlbiA9IF8uZmxhdHRlbixcbiAgICBtYXAgPSBfLm1hcCxcbiAgICByZWR1Y2UgPSBfLnJlZHVjZTtcbi8qKlxuICogUHJvZHVjZSB0aGUgY2FydGVzaWFuIHByb2R1Y3Qgb2YgbXVsdGlwbGUgYXJyYXlzXG4gKiBAcGFyYW0gIHsqW1tdXX0gYXJyYXlcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIGNhcnRlc2lhblByb2R1Y3QgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICBpZiAoYXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gcmVkdWNlKGFycmF5LCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGZsYXR0ZW4obWFwKGEsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcChiLCBmdW5jdGlvbiAoeSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5jb25jYXQoW3ldKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLCB0cnVlKTtcbiAgICAgICAgfSwgW1tdXSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2FydGVzaWFuUHJvZHVjdDtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpLFxuICAgIGFzc2lnbiA9IF8uYXNzaWduLFxuICAgIGZpbHRlciA9IF8uZmlsdGVyLFxuICAgIGZsYXR0ZW4gPSBfLmZsYXR0ZW4sXG4gICAgZ3JvdXBCeSA9IF8uZ3JvdXBCeSxcbiAgICBoYXMgPSBfLmhhcyxcbiAgICBtYXAgPSBfLm1hcCxcbiAgICByZWR1Y2VSaWdodCA9IF8ucmVkdWNlUmlnaHQsXG4gICAgdmFsdWVzID0gXy52YWx1ZXM7XG5cbi8qKlxuICogSGFzaCBmdWxsIG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBoYXNoRnVsbE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciBpZHgsXG4gICAgICAgIG1hcmtlZFZhbHMgPSB7fSxcbiAgICAgICAgcmVzdWx0LFxuICAgICAgICB2YWw7XG4gICAgaWYgKGEubGVuZ3RoIDwgYi5sZW5ndGgpIHtcbiAgICAgICAgaWR4ID0gZ3JvdXBCeShhLCBhQWNjZXNzb3IpO1xuICAgICAgICByZXN1bHQgPSByZWR1Y2VSaWdodChiLCBmdW5jdGlvbiAocHJldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgICAgICBtYXJrZWRWYWxzW3ZhbCA9IGJBY2Nlc3NvcihkYXR1bSldID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChoYXMoaWR4LCB2YWwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcChpZHhbdmFsXSwgZnVuY3Rpb24gKG9EYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKHt9LCBvRGF0dW0sIGRhdHVtKTtcbiAgICAgICAgICAgICAgICB9KS5jb25jYXQocHJldmlvdXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMudW5zaGlmdChkYXR1bSk7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZHggPSBncm91cEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgICAgIHJlc3VsdCA9IHJlZHVjZVJpZ2h0KGEsIGZ1bmN0aW9uIChwcmV2aW91cywgZGF0dW0pIHtcbiAgICAgICAgICAgIG1hcmtlZFZhbHNbdmFsID0gYUFjY2Vzc29yKGRhdHVtKV0gPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGhhcyhpZHgsIHZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwKGlkeFt2YWxdLCBmdW5jdGlvbiAob0RhdHVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NpZ24oe30sIGRhdHVtLCBvRGF0dW0pO1xuICAgICAgICAgICAgICAgIH0pLmNvbmNhdChwcmV2aW91cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91cy51bnNoaWZ0KGRhdHVtKTtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICAgICAgfSwgW10pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmNvbmNhdChmbGF0dGVuKHZhbHVlcyhmaWx0ZXIoaWR4LCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4gIWhhcyhtYXJrZWRWYWxzLCBrZXkpO1xuICAgIH0pKSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoRnVsbE91dGVySm9pbjtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpLFxuICAgIGFzc2lnbiA9IF8uYXNzaWduLFxuICAgIGdyb3VwQnkgPSBfLmdyb3VwQnksXG4gICAgaGFzID0gXy5oYXMsXG4gICAgbWFwID0gXy5tYXAsXG4gICAgcmVkdWNlUmlnaHQgPSBfLnJlZHVjZVJpZ2h0O1xuXG4vKipcbiAqIEhhc2ggaW5uZXIgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIGhhc2hJbm5lckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICB2YXIgaWR4LFxuICAgICAgICByZXN1bHQsXG4gICAgICAgIHZhbDtcbiAgICBpZiAoYS5sZW5ndGggPCBiLmxlbmd0aCkge1xuICAgICAgICBpZHggPSBncm91cEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgICAgIHJlc3VsdCA9IHJlZHVjZVJpZ2h0KGIsIGZ1bmN0aW9uIChwcmV2aW91cywgZGF0dW0pIHtcbiAgICAgICAgICAgIGlmIChoYXMoaWR4LCAodmFsID0gYkFjY2Vzc29yKGRhdHVtKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcChpZHhbdmFsXSwgZnVuY3Rpb24gKG9EYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKHt9LCBvRGF0dW0sIGRhdHVtKTtcbiAgICAgICAgICAgICAgICB9KS5jb25jYXQocHJldmlvdXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgICAgICB9LCBbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWR4ID0gZ3JvdXBCeShiLCBiQWNjZXNzb3IpO1xuICAgICAgICByZXN1bHQgPSByZWR1Y2VSaWdodChhLCBmdW5jdGlvbiAocHJldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgICAgICBpZiAoaGFzKGlkeCwgKHZhbCA9IGFBY2Nlc3NvcihkYXR1bSkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXAoaWR4W3ZhbF0sIGZ1bmN0aW9uIChvRGF0dW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFzc2lnbih7fSwgZGF0dW0sIG9EYXR1bSk7XG4gICAgICAgICAgICAgICAgfSkuY29uY2F0KHByZXZpb3VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICAgICAgfSwgW10pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoSW5uZXJKb2luO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5fIDogbnVsbCksXG4gICAgYXNzaWduID0gXy5hc3NpZ24sXG4gICAgZmlsdGVyID0gXy5maWx0ZXIsXG4gICAgZmxhdHRlbiA9IF8uZmxhdHRlbixcbiAgICBncm91cEJ5ID0gXy5ncm91cEJ5LFxuICAgIGhhcyA9IF8uaGFzLFxuICAgIG1hcCA9IF8ubWFwLFxuICAgIHJlZHVjZVJpZ2h0ID0gXy5yZWR1Y2VSaWdodCxcbiAgICB2YWx1ZXMgPSBfLnZhbHVlcztcblxuLyoqXG4gKiBIYXNoIGxlZnQgb3V0ZXIgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIGhhc2hMZWZ0T3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgdmFyIGlkeCxcbiAgICAgICAgdmFsO1xuICAgIGlmIChhLmxlbmd0aCA8IGIubGVuZ3RoKSB7XG4gICAgICAgIHZhciBtYXJrZWRWYWxzID0ge307XG4gICAgICAgIGlkeCA9IGdyb3VwQnkoYSwgYUFjY2Vzc29yKTtcbiAgICAgICAgcmV0dXJuIHJlZHVjZVJpZ2h0KGIsIGZ1bmN0aW9uIChwcmV2aW91cywgZGF0dW0pIHtcbiAgICAgICAgICAgIG1hcmtlZFZhbHNbdmFsID0gYkFjY2Vzc29yKGRhdHVtKV0gPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGhhcyhpZHgsIHZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwKGlkeFt2YWxdLCBmdW5jdGlvbiAob0RhdHVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NpZ24oe30sIG9EYXR1bSwgZGF0dW0pO1xuICAgICAgICAgICAgICAgIH0pLmNvbmNhdChwcmV2aW91cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgICAgIH0sIFtdKS5jb25jYXQoZmxhdHRlbih2YWx1ZXMoZmlsdGVyKGlkeCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiAhaGFzKG1hcmtlZFZhbHMsIGtleSk7XG4gICAgICAgIH0pKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlkeCA9IGdyb3VwQnkoYiwgYkFjY2Vzc29yKTtcbiAgICAgICAgcmV0dXJuIHJlZHVjZVJpZ2h0KGEsIGZ1bmN0aW9uIChwcmV2aW91cywgZGF0dW0pIHtcbiAgICAgICAgICAgIGlmIChoYXMoaWR4LCAodmFsID0gYUFjY2Vzc29yKGRhdHVtKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcChpZHhbdmFsXSwgZnVuY3Rpb24gKG9EYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKHt9LCBkYXR1bSwgb0RhdHVtKTtcbiAgICAgICAgICAgICAgICB9KS5jb25jYXQocHJldmlvdXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMudW5zaGlmdChkYXR1bSk7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hMZWZ0T3V0ZXJKb2luO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBmaWx0ZXIgPSBfLmZpbHRlcixcbiAgICBoYXMgPSBfLmhhcyxcbiAgICBpbmRleEJ5ID0gXy5pbmRleEJ5O1xuXG4vKipcbiAqIEhhc2ggbGVmdCBzZW1pIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBoYXNoTGVmdFNlbWlKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgdmFyIGlkeCA9IGluZGV4QnkoYiwgYkFjY2Vzc29yKTtcbiAgICByZXR1cm4gZmlsdGVyKGEsIGZ1bmN0aW9uIChkYXR1bSkge1xuICAgICAgICByZXR1cm4gaGFzKGlkeCwgYUFjY2Vzc29yKGRhdHVtKSk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hMZWZ0U2VtaUpvaW47XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCJ2YXIgaGFzaExlZnRPdXRlckpvaW4gPSByZXF1aXJlKCcuL2hhc2hMZWZ0T3V0ZXJKb2luJyk7XG5cbi8qKlxuICogSGFzaCByaWdodCBvdXRlciBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgaGFzaFJpZ2h0T3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgcmV0dXJuIGhhc2hMZWZ0T3V0ZXJKb2luKGIsIGJBY2Nlc3NvciwgYSwgYUFjY2Vzc29yKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFJpZ2h0T3V0ZXJKb2luOyIsInZhciBoYXNoTGVmdFNlbWlKb2luID0gcmVxdWlyZSgnLi9oYXNoTGVmdFNlbWlKb2luJyk7XG5cbi8qKlxuICogSGFzaCByaWdodCBzZW1pIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBoYXNoUmlnaHRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHJldHVybiBoYXNoTGVmdFNlbWlKb2luKGIsIGJBY2Nlc3NvciwgYSwgYUFjY2Vzc29yKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFJpZ2h0U2VtaUpvaW47IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5fIDogbnVsbCksXG4gICAgYXNzaWduID0gXy5hc3NpZ24sXG4gICAgZmlsdGVyID0gXy5maWx0ZXIsXG4gICAgaGFzID0gXy5oYXMsXG4gICAgcmVkdWNlUmlnaHQgPSBfLnJlZHVjZVJpZ2h0O1xuXG4vKipcbiAqIE5lc3RlZCBsb29wIGxlZnQgc2VtaSBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgbmVzdGVkTG9vcEZ1bGxPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICB2YXIgdmFsLFxuICAgICAgICBjdmFsLFxuICAgICAgICBmb3VuZCA9IHt9LFxuICAgICAgICB0bXBMZW5ndGg7XG4gICAgcmV0dXJuIHJlZHVjZVJpZ2h0KGEsIGZ1bmN0aW9uIChwcmV2aW91cywgZGF0dW0pIHtcbiAgICAgICAgdmFsID0gYUFjY2Vzc29yKGRhdHVtKTtcbiAgICAgICAgdG1wTGVuZ3RoID0gcHJldmlvdXMubGVuZ3RoO1xuICAgICAgICBwcmV2aW91cyA9IHJlZHVjZVJpZ2h0KGIsIGZ1bmN0aW9uIChvUHJldmlvdXMsIG9EYXR1bSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGN2YWwgPSBiQWNjZXNzb3Iob0RhdHVtKTtcbiAgICAgICAgICAgIGlmICh2YWwgPD0gY3ZhbCAmJiB2YWwgPj0gY3ZhbCkge1xuICAgICAgICAgICAgICAgIGZvdW5kW2luZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgb1ByZXZpb3VzLnVuc2hpZnQoYXNzaWduKHt9LCBkYXR1bSwgb0RhdHVtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb1ByZXZpb3VzO1xuICAgICAgICB9LCBbXSkuY29uY2F0KHByZXZpb3VzKTtcbiAgICAgICAgaWYgKHRtcExlbmd0aCA9PT0gcHJldmlvdXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmV2aW91cy51bnNoaWZ0KGRhdHVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfSwgW10pLmNvbmNhdChmaWx0ZXIoYiwgZnVuY3Rpb24gKGRhdHVtLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gIWhhcyhmb3VuZCwgaW5kZXgpO1xuICAgIH0pKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmVzdGVkTG9vcEZ1bGxPdXRlckpvaW47XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBhc3NpZ24gPSBfLmFzc2lnbixcbiAgICByZWR1Y2VSaWdodCA9IF8ucmVkdWNlUmlnaHQ7XG5cbi8qKlxuICogTmVzdGVkIGxvb3AgaW5uZXIgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIG5lc3RlZExvb3BJbm5lckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICB2YXIgdmFsLFxuICAgICAgICBjdmFsO1xuICAgIHJldHVybiByZWR1Y2VSaWdodChhLCBmdW5jdGlvbiAocHJldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgIHZhbCA9IGFBY2Nlc3NvcihkYXR1bSk7XG4gICAgICAgIHJldHVybiByZWR1Y2VSaWdodChiLCBmdW5jdGlvbiAob1ByZXZpb3VzLCBvRGF0dW0pIHtcbiAgICAgICAgICAgIGN2YWwgPSBiQWNjZXNzb3Iob0RhdHVtKTtcbiAgICAgICAgICAgIGlmICh2YWwgPD0gY3ZhbCAmJiB2YWwgPj0gY3ZhbCkge1xuICAgICAgICAgICAgICAgIG9QcmV2aW91cy51bnNoaWZ0KGFzc2lnbih7fSwgZGF0dW0sIG9EYXR1bSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9QcmV2aW91cztcbiAgICAgICAgfSwgW10pLmNvbmNhdChwcmV2aW91cyk7XG4gICAgfSwgW10pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXN0ZWRMb29wSW5uZXJKb2luO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5fIDogbnVsbCksXG4gICAgYXNzaWduID0gXy5hc3NpZ24sXG4gICAgcmVkdWNlUmlnaHQgPSBfLnJlZHVjZVJpZ2h0O1xuXG4vKipcbiAqIE5lc3RlZCBsb29wIGxlZnQgb3V0ZXIgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIG5lc3RlZExvb3BMZWZ0T3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgdmFyIHZhbCxcbiAgICAgICAgY3ZhbCxcbiAgICAgICAgdG1wTGVuZ3RoO1xuICAgIHJldHVybiByZWR1Y2VSaWdodChhLCBmdW5jdGlvbiAocHJldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgIHZhbCA9IGFBY2Nlc3NvcihkYXR1bSk7XG4gICAgICAgIHRtcExlbmd0aCA9IHByZXZpb3VzLmxlbmd0aDtcbiAgICAgICAgcHJldmlvdXMgPSByZWR1Y2VSaWdodChiLCBmdW5jdGlvbiAob1ByZXZpb3VzLCBvRGF0dW0pIHtcbiAgICAgICAgICAgIGN2YWwgPSBiQWNjZXNzb3Iob0RhdHVtKTtcbiAgICAgICAgICAgIGlmICh2YWwgPD0gY3ZhbCAmJiB2YWwgPj0gY3ZhbCkge1xuICAgICAgICAgICAgICAgIG9QcmV2aW91cy51bnNoaWZ0KGFzc2lnbih7fSwgZGF0dW0sIG9EYXR1bSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9QcmV2aW91cztcbiAgICAgICAgfSwgW10pLmNvbmNhdChwcmV2aW91cyk7XG4gICAgICAgIGlmICh0bXBMZW5ndGggPT09IHByZXZpb3VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcHJldmlvdXMudW5zaGlmdChkYXR1bSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgIH0sIFtdKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmVzdGVkTG9vcExlZnRPdXRlckpvaW47XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBmaWx0ZXIgPSBfLmZpbHRlcixcbiAgICBzb21lID0gXy5zb21lO1xuXG4vKipcbiAqIE5lc3RlZCBsb29wIGxlZnQgc2VtaSBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgbmVzdGVkTG9vcExlZnRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciB2YWwsXG4gICAgICAgIGN2YWw7XG4gICAgcmV0dXJuIGZpbHRlcihhLCBmdW5jdGlvbiAoZGF0dW0pIHtcbiAgICAgICAgdmFsID0gYUFjY2Vzc29yKGRhdHVtKTtcbiAgICAgICAgcmV0dXJuIHNvbWUoYiwgZnVuY3Rpb24gKG9EYXR1bSkge1xuICAgICAgICAgICAgY3ZhbCA9IGJBY2Nlc3NvcihvRGF0dW0pO1xuICAgICAgICAgICAgcmV0dXJuIHZhbCA8PSBjdmFsICYmIHZhbCA+PSBjdmFsO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmVzdGVkTG9vcExlZnRTZW1pSm9pbjtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsInZhciBuZXN0ZWRMb29wTGVmdE91dGVySm9pbiA9IHJlcXVpcmUoJy4vbmVzdGVkTG9vcExlZnRPdXRlckpvaW4nKTtcblxuLyoqXG4gKiBOZXN0ZWQgbG9vcCByaWdodCBvdXRlciBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgbmVzdGVkTG9vcFJpZ2h0T3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgcmV0dXJuIG5lc3RlZExvb3BMZWZ0T3V0ZXJKb2luKGIsIGJBY2Nlc3NvciwgYSwgYUFjY2Vzc29yKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmVzdGVkTG9vcFJpZ2h0T3V0ZXJKb2luOyIsInZhciBuZXN0ZWRMb29wTGVmdFNlbWlKb2luID0gcmVxdWlyZSgnLi9uZXN0ZWRMb29wTGVmdFNlbWlKb2luJyk7XG5cbi8qKlxuICogTmVzdGVkIGxvb3AgcmlnaHQgc2VtaSBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgbmVzdGVkTG9vcFJpZ2h0U2VtaUpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICByZXR1cm4gbmVzdGVkTG9vcExlZnRTZW1pSm9pbihiLCBiQWNjZXNzb3IsIGEsIGFBY2Nlc3Nvcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5lc3RlZExvb3BSaWdodFNlbWlKb2luOyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpLFxuICAgIGFzc2lnbiA9IF8uYXNzaWduLFxuICAgIHNvcnRCeSA9IF8uc29ydEJ5LFxuICAgIHJlZHVjZVJpZ2h0ID0gXy5yZWR1Y2VSaWdodCxcbiAgICB5aWVsZFJpZ2h0U3ViTGlzdCA9IHJlcXVpcmUoJy4uL3V0aWwveWllbGRSaWdodFN1Ykxpc3QnKTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgbGVmdCBvdXRlciBqb2luLiAgUmVzdHVybnMgYSBuZXcgYXJyYXkuXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgaWYgKGEubGVuZ3RoIDwgMSB8fCBiLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBhID0gc29ydEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgYiA9IHNvcnRCeShiLCBiQWNjZXNzb3IpO1xuICAgIHZhciByID0gW10sXG4gICAgICAgIGFEYXR1bXMgPSB5aWVsZFJpZ2h0U3ViTGlzdChhLCBhQWNjZXNzb3IpLFxuICAgICAgICBiRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYiwgYkFjY2Vzc29yKTtcbiAgICB3aGlsZSAoYURhdHVtcyAmJiBiRGF0dW1zKSB7XG4gICAgICAgIGlmIChhRGF0dW1zLnZhbCA+IGJEYXR1bXMudmFsKSB7XG4gICAgICAgICAgICByID0gYURhdHVtcy5yLmNvbmNhdChyKTtcbiAgICAgICAgICAgIGFEYXR1bXMgPSB5aWVsZFJpZ2h0U3ViTGlzdChhLCBhQWNjZXNzb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKGFEYXR1bXMudmFsIDwgYkRhdHVtcy52YWwpIHtcbiAgICAgICAgICAgIHIgPSBiRGF0dW1zLnIuY29uY2F0KHIpO1xuICAgICAgICAgICAgYkRhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGIsIGJBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByID0gcmVkdWNlUmlnaHQoYURhdHVtcy5yLCBmdW5jdGlvbiAob3JldmlvdXMsIGRhdHVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZHVjZVJpZ2h0KGJEYXR1bXMuciwgZnVuY3Rpb24gKHByZXYsIGNEYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2LnVuc2hpZnQoYXNzaWduKHt9LCBkYXR1bSwgY0RhdHVtKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgIH0sIFtdKS5jb25jYXQob3JldmlvdXMpO1xuICAgICAgICAgICAgfSwgW10pLmNvbmNhdChyKTtcbiAgICAgICAgICAgIGFEYXR1bXMgPSB5aWVsZFJpZ2h0U3ViTGlzdChhLCBhQWNjZXNzb3IpO1xuICAgICAgICAgICAgYkRhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGIsIGJBY2Nlc3Nvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJEYXR1bXMpIHtcbiAgICAgICAgciA9IGJEYXR1bXMuci5jb25jYXQocik7XG4gICAgfVxuICAgIGlmIChhRGF0dW1zKSB7XG4gICAgICAgIHIgPSBhRGF0dW1zLnIuY29uY2F0KHIpO1xuICAgIH1cbiAgICByZXR1cm4gYS5jb25jYXQoYiwgcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRlZE1lcmdlTGVmdE91dGVySm9pbjtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpLFxuICAgIGFzc2lnbiA9IF8uYXNzaWduLFxuICAgIHNvcnRCeSA9IF8uc29ydEJ5LFxuICAgIHJlZHVjZVJpZ2h0ID0gXy5yZWR1Y2VSaWdodCxcbiAgICB5aWVsZFJpZ2h0U3ViTGlzdCA9IHJlcXVpcmUoJy4uL3V0aWwveWllbGRSaWdodFN1Ykxpc3QnKTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgaW5uZXIgam9pbi4gIFJlc3R1cm5zIGEgbmV3IGFycmF5LlxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIHNvcnRlZE1lcmdlSW5uZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgaWYgKGEubGVuZ3RoIDwgMSB8fCBiLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBhID0gc29ydEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgYiA9IHNvcnRCeShiLCBiQWNjZXNzb3IpO1xuICAgIHZhciByID0gW10sXG4gICAgICAgIGFEYXR1bXMgPSB5aWVsZFJpZ2h0U3ViTGlzdChhLCBhQWNjZXNzb3IpLFxuICAgICAgICBiRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYiwgYkFjY2Vzc29yKTtcbiAgICB3aGlsZSAoYURhdHVtcyAmJiBiRGF0dW1zKSB7XG4gICAgICAgIGlmIChhRGF0dW1zLnZhbCA+IGJEYXR1bXMudmFsKSB7XG4gICAgICAgICAgICBhRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYSwgYUFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIGlmIChhRGF0dW1zLnZhbCA8IGJEYXR1bXMudmFsKSB7XG4gICAgICAgICAgICBiRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYiwgYkFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHIgPSByZWR1Y2VSaWdodChhRGF0dW1zLnIsIGZ1bmN0aW9uIChvcmV2aW91cywgZGF0dW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVkdWNlUmlnaHQoYkRhdHVtcy5yLCBmdW5jdGlvbiAocHJldiwgY0RhdHVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXYudW5zaGlmdChhc3NpZ24oe30sIGRhdHVtLCBjRGF0dW0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICAgICAgfSwgW10pLmNvbmNhdChvcmV2aW91cyk7XG4gICAgICAgICAgICB9LCBbXSkuY29uY2F0KHIpO1xuICAgICAgICAgICAgYURhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGEsIGFBY2Nlc3Nvcik7XG4gICAgICAgICAgICBiRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYiwgYkFjY2Vzc29yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkTWVyZ2VJbm5lckpvaW47XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBhc3NpZ24gPSBfLmFzc2lnbixcbiAgICBzb3J0QnkgPSBfLnNvcnRCeSxcbiAgICByZWR1Y2VSaWdodCA9IF8ucmVkdWNlUmlnaHQsXG4gICAgeWllbGRSaWdodFN1Ykxpc3QgPSByZXF1aXJlKCcuLi91dGlsL3lpZWxkUmlnaHRTdWJMaXN0Jyk7XG5cbi8qKlxuICogU29ydGVkIG1lcmdlIGxlZnQgb3V0ZXIgam9pbi4gIFJlc3R1cm5zIGEgbmV3IGFycmF5LlxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIHNvcnRlZE1lcmdlTGVmdE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIGlmIChhLmxlbmd0aCA8IDEgfHwgYi5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgYSA9IHNvcnRCeShhLCBhQWNjZXNzb3IpO1xuICAgIGIgPSBzb3J0QnkoYiwgYkFjY2Vzc29yKTtcbiAgICB2YXIgciA9IFtdLFxuICAgICAgICBhRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYSwgYUFjY2Vzc29yKSxcbiAgICAgICAgYkRhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGIsIGJBY2Nlc3Nvcik7XG4gICAgd2hpbGUgKGFEYXR1bXMgJiYgYkRhdHVtcykge1xuICAgICAgICBpZiAoYURhdHVtcy52YWwgPiBiRGF0dW1zLnZhbCkge1xuICAgICAgICAgICAgciA9IGFEYXR1bXMuci5jb25jYXQocik7XG4gICAgICAgICAgICBhRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYSwgYUFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIGlmIChhRGF0dW1zLnZhbCA8IGJEYXR1bXMudmFsKSB7XG4gICAgICAgICAgICBiRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYiwgYkFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHIgPSByZWR1Y2VSaWdodChhRGF0dW1zLnIsIGZ1bmN0aW9uIChvcmV2aW91cywgZGF0dW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVkdWNlUmlnaHQoYkRhdHVtcy5yLCBmdW5jdGlvbiAocHJldiwgY0RhdHVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXYudW5zaGlmdChhc3NpZ24oe30sIGRhdHVtLCBjRGF0dW0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICAgICAgfSwgW10pLmNvbmNhdChvcmV2aW91cyk7XG4gICAgICAgICAgICB9LCBbXSkuY29uY2F0KHIpO1xuICAgICAgICAgICAgYURhdHVtcyA9IHlpZWxkUmlnaHRTdWJMaXN0KGEsIGFBY2Nlc3Nvcik7XG4gICAgICAgICAgICBiRGF0dW1zID0geWllbGRSaWdodFN1Ykxpc3QoYiwgYkFjY2Vzc29yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoYURhdHVtcykge1xuICAgICAgICByID0gYURhdHVtcy5yLmNvbmNhdChyKTtcbiAgICB9XG4gICAgcmV0dXJuIGEuY29uY2F0KHIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW47XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Ll8gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLl8gOiBudWxsKSxcbiAgICBzb3J0QnkgPSBfLnNvcnRCeSxcbiAgICB1bmRlZiA9IHJlcXVpcmUoJy4uL3V0aWwvdW5kZWZpbmVkJyk7XG5cbi8qKlxuICogU29ydGVkIG1lcmdlIGxlZnQgc2VtaSBqb2luLiAgUmVzdHVybnMgYSBuZXcgYXJyYXkuXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgc29ydGVkTWVyZ2VMZWZ0U2VtaUpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICBpZiAoYS5sZW5ndGggPCAxIHx8IGIubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGEgPSBzb3J0QnkoYSwgYUFjY2Vzc29yKTtcbiAgICBiID0gc29ydEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgdmFyIHIgPSBbXSxcbiAgICAgICAgYURhdHVtID0gYS5wb3AoKSxcbiAgICAgICAgYkRhdHVtID0gYi5wb3AoKSxcbiAgICAgICAgYVZhbCA9IGFBY2Nlc3NvcihhRGF0dW0pLFxuICAgICAgICBiVmFsID0gYkFjY2Vzc29yKGJEYXR1bSk7XG4gICAgd2hpbGUgKGFEYXR1bSAmJiBiRGF0dW0pIHtcbiAgICAgICAgaWYgKGFWYWwgPiBiVmFsKSB7XG4gICAgICAgICAgICBhVmFsID0gdW5kZWYoYURhdHVtID0gYS5wb3AoKSwgYUFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIGlmIChhVmFsIDwgYlZhbCkge1xuICAgICAgICAgICAgYlZhbCA9IHVuZGVmKGJEYXR1bSA9IGIucG9wKCksIGJBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByLnVuc2hpZnQoYURhdHVtKTtcbiAgICAgICAgICAgIGFWYWwgPSB1bmRlZihhRGF0dW0gPSBhLnBvcCgpLCBhQWNjZXNzb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRNZXJnZUxlZnRTZW1pSm9pbjtcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsInZhciBzb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW4gPSByZXF1aXJlKCcuL3NvcnRlZE1lcmdlTGVmdE91dGVySm9pbicpO1xuXG4vKipcbiAqIFNvcnRlZCBtZXJnZSByaWdodCBvdXRlciBqb2luLiAgUmV0dXJucyB0aGUgYi1hcnJheSByZWZlcmVuY2UuXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgc29ydGVkTWVyZ2VSaWdodE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHJldHVybiBzb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW4oYiwgYkFjY2Vzc29yLCBhLCBhQWNjZXNzb3IpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRNZXJnZVJpZ2h0T3V0ZXJKb2luOyIsInZhciBzb3J0ZWRNZXJnZUxlZnRTZW1pSm9pbiA9IHJlcXVpcmUoJy4vc29ydGVkTWVyZ2VMZWZ0U2VtaUpvaW4nKTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgcmlnaHQgc2VtaSBqb2luLiAgUmV0dXJucyB0aGUgYi1hcnJheSByZWZlcmVuY2UuXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgc29ydGVkTWVyZ2VSaWdodFNlbWlKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgcmV0dXJuIHNvcnRlZE1lcmdlTGVmdFNlbWlKb2luKGIsIGJBY2Nlc3NvciwgYSwgYUFjY2Vzc29yKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkTWVyZ2VSaWdodFNlbWlKb2luOyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuXyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuXyA6IG51bGwpLFxuICAgIGlzVW5kZWZpbmVkID0gXy5pc1VuZGVmaW5lZDtcblxudmFyIHVuZGVmID0gZnVuY3Rpb24gKG9iaiwgZm4pIHtcbiAgICByZXR1cm4gaXNVbmRlZmluZWQob2JqKSA/IG9iaiA6IGZuKG9iaik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuZGVmO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiLyoqXG4gKiBGcm9tIGEgc29ydGVkIGxpc3QsIHlpZWxkIGEgc3ViTGlzdCB3aGVyZSB0aGUgYWNjZXNzb3IgdmFsdWVzIGFyZSB0aGUgc2FtZVxuICogQHBhcmFtICB7KltdfSBzb3J0ZWRMaXN0XG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYWNjZXNzb3JcbiAqIEByZXR1cm4ge3t9fVxuICovXG52YXIgeWllbGRSaWdodFN1Ykxpc3QgPSBmdW5jdGlvbiAoc29ydGVkTGlzdCwgYWNjZXNzb3IpIHtcbiAgICB2YXIgcixcbiAgICAgICAgZGF0dW0sXG4gICAgICAgIHZhbCxcbiAgICAgICAgdG1wVmFsLFxuICAgICAgICBpO1xuICAgIGlmIChzb3J0ZWRMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFsID0gYWNjZXNzb3IoZGF0dW0gPSBzb3J0ZWRMaXN0LnBvcCgpKTtcbiAgICAgICAgciA9IFtkYXR1bV07XG4gICAgICAgIGkgPSBzb3J0ZWRMaXN0Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdG1wVmFsID0gYWNjZXNzb3Ioc29ydGVkTGlzdFtpXSk7XG4gICAgICAgICAgICBpZiAodmFsIDw9IHRtcFZhbCAmJiB2YWwgPj0gdG1wVmFsKSB7XG4gICAgICAgICAgICAgICAgci51bnNoaWZ0KHNvcnRlZExpc3QucG9wKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gciA/IHtyOiByLCB2YWw6IHZhbH0gOiByO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB5aWVsZFJpZ2h0U3ViTGlzdDsiXX0=
