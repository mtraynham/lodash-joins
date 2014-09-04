(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var joins = {};

joins.cartesianProduct = require('./cartesianProduct');

joins.hashFullOuterJoin = require('./hash/hashFullOuterJoin');
joins.hashInnerJoin = require('./hash/hashInnerJoin');
joins.hashLeftOuterJoin = require('./hash/hashLeftOuterJoin');
joins.hashLeftSemiJoin = require('./hash/hashLeftSemiJoin');
joins.hashRightOuterJoin = require('./hash/hashRightOuterJoin');
joins.hashRightSemiJoin = require('./hash/hashRightSemiJoin');

joins.sortedMergeFullOuterJoin = require('./sortedMerge/sortedMergeFullOuterJoin');
joins.sortedMergeInnerJoin = require('./sortedMerge/sortedMergeInnerJoin');
joins.sortedMergeLeftOuterJoin = require('./sortedMerge/sortedMergeLeftOuterJoin');
joins.sortedMergeLeftSemiJoin = require('./sortedMerge/sortedMergeLeftSemiJoin');
joins.sortedMergeRightOuterJoin = require('./sortedMerge/sortedMergeRightOuterJoin');
joins.sortedMergeRightSemiJoin = require('./sortedMerge/sortedMergeRightSemiJoin');

joins.nestedLoopFullOuterJoin = require('./nestedLoop/nestedLoopFullOuterJoin');
joins.nestedLoopInnerJoin = require('./nestedLoop/nestedLoopInnerJoin');
joins.nestedLoopLeftOuterJoin = require('./nestedLoop/nestedLoopLeftOuterJoin');
joins.nestedLoopLeftSemiJoin = require('./nestedLoop/nestedLoopLeftSemiJoin');
joins.nestedLoopRightOuterJoin = require('./nestedLoop/nestedLoopRightOuterJoin');
joins.nestedLoopRightSemiJoin = require('./nestedLoop/nestedLoopRightSemiJoin');

global.joins = joins;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./cartesianProduct":2,"./hash/hashFullOuterJoin":3,"./hash/hashInnerJoin":4,"./hash/hashLeftOuterJoin":5,"./hash/hashLeftSemiJoin":6,"./hash/hashRightOuterJoin":7,"./hash/hashRightSemiJoin":8,"./nestedLoop/nestedLoopFullOuterJoin":9,"./nestedLoop/nestedLoopInnerJoin":10,"./nestedLoop/nestedLoopLeftOuterJoin":11,"./nestedLoop/nestedLoopLeftSemiJoin":12,"./nestedLoop/nestedLoopRightOuterJoin":13,"./nestedLoop/nestedLoopRightSemiJoin":14,"./sortedMerge/sortedMergeFullOuterJoin":15,"./sortedMerge/sortedMergeInnerJoin":16,"./sortedMerge/sortedMergeLeftOuterJoin":17,"./sortedMerge/sortedMergeLeftSemiJoin":18,"./sortedMerge/sortedMergeRightOuterJoin":19,"./sortedMerge/sortedMergeRightSemiJoin":20}],2:[function(require,module,exports){
/**
 * Produce the cartesian product of multiple arrays
 * @param  {*[[]]} array
 * @return {*[]}
 */
var cartesianProduct = function (array) {
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

module.exports = cartesianProduct;
},{}],3:[function(require,module,exports){
/**
 * Hash full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    var aidx = _.groupBy(a, aAccessor),
        bidx = _.groupBy(b, bAccessor),
        r = [],
        i = 0,
        j = 0,
        aVal = null,
        bVal = null;
    for (var aKey in aidx) {
        if (aKey in bidx) {
            aVal = aidx[aKey];
            i = aVal.length;
            while (i--) {
                bVal = bidx[aKey];
                j = bVal.length;
                while (j--) {
                    r.push(_.assign({}, aVal[i], bVal[j]));
                }
            }
            delete bidx[aKey]; // Not performant
        } else {
            r = r.concat(aidx[aKey]);
        }
    }
    return r.concat(_.flatten(_.values(bidx)));
};

module.exports = hashFullOuterJoin;
},{}],4:[function(require,module,exports){
/**
 * Hash inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashInnerJoin = function (a, aAccessor, b, bAccessor) {
    var idx = null,
        i = 0,
        j = 0,
        r = [],
        datum = null,
        oDatums = null,
        val = null;
    if (a.length < b.length) {
        idx = _.indexBy(a, aAccessor);
        i = b.length;
        while (i--) {
            val = bAccessor(datum = b[i]);
            if (val in idx) {
                oDatums = val[idx];
                j = oDatums.length;
                while (j--) {
                    r.unshift(_.assign({}, oDatums[j], datum));
                }
            }
        }
    } else {
        idx = _.indexBy(b, bAccessor);
        i = a.length;
        while (i--) {
            val = aAccessor(datum = a[i]);
            if (val in idx) {
                oDatums = val[idx];
                j = oDatums.length;
                while (j--) {
                    r.unshift(_.assign({}, datum, idx[val]));
                }
            }
        }
    }
    return r;
};

module.exports = hashInnerJoin;
},{}],5:[function(require,module,exports){
/**
 * Hash left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    var idx = _.groupBy(b, bAccessor),
        i = a.length,
        j = 0,
        r = [],
        aDatum = null,
        bDatums = null,
        aVal = null;
    while (i--) {
        aVal = aAccessor(aDatum = a[i]);
        if (aVal in idx) {
            bDatums = idx[aVal];
            j = bDatums.length;
            while (j--) {
                r.unshift(_.assign({}, aDatum, bDatums[j]));
            }
        } else {
            r.unshift(aDatum);
        }
    }
    return r;
};

module.exports = hashLeftOuterJoin;
},{}],6:[function(require,module,exports){
/**
 * Hash left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    var idx = null,
        i = 0,
        j = 0,
        r = [],
        datum = null,
        oDatums = null,
        val = null;
    if (a.length < b.length) {
        idx = _.indexBy(a, aAccessor);
        i = b.length;
        while (i--) {
            val = bAccessor(datum = b[i]);
            if (val in idx) {
                oDatums = val[idx];
                j = oDatums.length;
                while (j--) {
                    r.unshift(oDatums[j]);
                }
            }
        }
    } else {
        idx = _.indexBy(b, bAccessor);
        i = a.length;
        while (i--) {
            val = aAccessor(datum = a[i]);
            if (val in idx) {
                oDatums = val[idx];
                j = oDatums.length;
                while (j--) {
                    r.unshift(datum);
                }
            }
        }
    }
    return r;
};

module.exports = hashLeftSemiJoin;
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
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    // TODO
    return [a, aAccessor, b, bAccessor];
};

module.exports = nestedLoopFullOuterJoin;
},{}],10:[function(require,module,exports){
var undef = require('../util/undefined');

/**
 * Nested loop inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopInnerJoin = function (a, aAccessor, b, bAccessor) {
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

module.exports = nestedLoopInnerJoin;
},{"../util/undefined":21}],11:[function(require,module,exports){
var undef = require('../util/undefined');

/**
 * Nested loop left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
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

module.exports = nestedLoopLeftOuterJoin;
},{"../util/undefined":21}],12:[function(require,module,exports){
var undef = require('../util/undefined');

/**
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
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

module.exports = nestedLoopLeftSemiJoin;
},{"../util/undefined":21}],13:[function(require,module,exports){
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
var undef = require('../util/undefined');

/**
 * Sorted merge full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a.concat(b);
    }
    a = _.sortBy(a, aAccessor);
    b = _.sortBy(b, bAccessor);
    var r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum),
        aMatch = false;
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            if (!aMatch) {
                r.unshift(aDatum);
            }
            aVal = undef(aDatum = a.pop(), aAccessor);
            aMatch = false;
        } else if (aVal < bVal) {
            r.unshift(bDatum);
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            r.unshift(_.assign({}, aDatum, bDatum));
            // TODO bVal could match multiple aVal; don't pop here.
            bVal = undef(bDatum = b.pop(), bAccessor);
            aMatch = true;
        }
    }
    if (bDatum) {
        r.unshift(bDatum);
    }
    if (aDatum && !aMatch) {
        r.unshift(aDatum);
    }
    return a.concat(b, r);
};

module.exports = sortedMergeFullOuterJoin;
},{"../util/undefined":21}],16:[function(require,module,exports){
var undef = require('../util/undefined');

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
            bVal = undef(bDatum = b.pop(), bAccessor);
        }
    }
    return r;
};

module.exports = sortedMergeInnerJoin;
},{"../util/undefined":21}],17:[function(require,module,exports){
var undef = require('../util/undefined');

/**
 * Sorted merge left outer join. Returns the a-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    a = _.sortBy(a, aAccessor);
    b = _.sortBy(b, bAccessor);
    var r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum),
        aMatch = false;
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            if (!aMatch) {
                r.unshift(aDatum);
            }
            aVal = undef(aDatum = a.pop(), aAccessor);
            aMatch = false;
        } else if (aVal < bVal) {
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            r.unshift(_.assign({}, aDatum, bDatum));
            bVal = undef(bDatum = b.pop(), bAccessor);
            aMatch = true;
        }
    }
    if (aDatum && !aMatch) {
        r.unshift(aDatum);
    }
    return a.concat(r);
};

module.exports = sortedMergeLeftOuterJoin;
},{"../util/undefined":21}],18:[function(require,module,exports){
var undef = require('../util/undefined');

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

module.exports = sortedMergeLeftSemiJoin;
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
var undef = function (obj, fn) {
    return _.isUndefined(obj) ? obj : fn(obj);
};

module.exports = undef;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL210cmF5bmhhbS9Eb2N1bWVudHMvRGlnaXRhbHNtaXRocy9KYXZhL2xvZGFzaC1qb2lucy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLi9zcmMvaW5kZXguanMiLCIvaG9tZS9tdHJheW5oYW0vRG9jdW1lbnRzL0RpZ2l0YWxzbWl0aHMvSmF2YS9sb2Rhc2gtam9pbnMvc3JjL2NhcnRlc2lhblByb2R1Y3QuanMiLCIvaG9tZS9tdHJheW5oYW0vRG9jdW1lbnRzL0RpZ2l0YWxzbWl0aHMvSmF2YS9sb2Rhc2gtam9pbnMvc3JjL2hhc2gvaGFzaEZ1bGxPdXRlckpvaW4uanMiLCIvaG9tZS9tdHJheW5oYW0vRG9jdW1lbnRzL0RpZ2l0YWxzbWl0aHMvSmF2YS9sb2Rhc2gtam9pbnMvc3JjL2hhc2gvaGFzaElubmVySm9pbi5qcyIsIi9ob21lL210cmF5bmhhbS9Eb2N1bWVudHMvRGlnaXRhbHNtaXRocy9KYXZhL2xvZGFzaC1qb2lucy9zcmMvaGFzaC9oYXNoTGVmdE91dGVySm9pbi5qcyIsIi9ob21lL210cmF5bmhhbS9Eb2N1bWVudHMvRGlnaXRhbHNtaXRocy9KYXZhL2xvZGFzaC1qb2lucy9zcmMvaGFzaC9oYXNoTGVmdFNlbWlKb2luLmpzIiwiL2hvbWUvbXRyYXluaGFtL0RvY3VtZW50cy9EaWdpdGFsc21pdGhzL0phdmEvbG9kYXNoLWpvaW5zL3NyYy9oYXNoL2hhc2hSaWdodE91dGVySm9pbi5qcyIsIi9ob21lL210cmF5bmhhbS9Eb2N1bWVudHMvRGlnaXRhbHNtaXRocy9KYXZhL2xvZGFzaC1qb2lucy9zcmMvaGFzaC9oYXNoUmlnaHRTZW1pSm9pbi5qcyIsIi9ob21lL210cmF5bmhhbS9Eb2N1bWVudHMvRGlnaXRhbHNtaXRocy9KYXZhL2xvZGFzaC1qb2lucy9zcmMvbmVzdGVkTG9vcC9uZXN0ZWRMb29wRnVsbE91dGVySm9pbi5qcyIsIi9ob21lL210cmF5bmhhbS9Eb2N1bWVudHMvRGlnaXRhbHNtaXRocy9KYXZhL2xvZGFzaC1qb2lucy9zcmMvbmVzdGVkTG9vcC9uZXN0ZWRMb29wSW5uZXJKb2luLmpzIiwiL2hvbWUvbXRyYXluaGFtL0RvY3VtZW50cy9EaWdpdGFsc21pdGhzL0phdmEvbG9kYXNoLWpvaW5zL3NyYy9uZXN0ZWRMb29wL25lc3RlZExvb3BMZWZ0T3V0ZXJKb2luLmpzIiwiL2hvbWUvbXRyYXluaGFtL0RvY3VtZW50cy9EaWdpdGFsc21pdGhzL0phdmEvbG9kYXNoLWpvaW5zL3NyYy9uZXN0ZWRMb29wL25lc3RlZExvb3BMZWZ0U2VtaUpvaW4uanMiLCIvaG9tZS9tdHJheW5oYW0vRG9jdW1lbnRzL0RpZ2l0YWxzbWl0aHMvSmF2YS9sb2Rhc2gtam9pbnMvc3JjL25lc3RlZExvb3AvbmVzdGVkTG9vcFJpZ2h0T3V0ZXJKb2luLmpzIiwiL2hvbWUvbXRyYXluaGFtL0RvY3VtZW50cy9EaWdpdGFsc21pdGhzL0phdmEvbG9kYXNoLWpvaW5zL3NyYy9uZXN0ZWRMb29wL25lc3RlZExvb3BSaWdodFNlbWlKb2luLmpzIiwiL2hvbWUvbXRyYXluaGFtL0RvY3VtZW50cy9EaWdpdGFsc21pdGhzL0phdmEvbG9kYXNoLWpvaW5zL3NyYy9zb3J0ZWRNZXJnZS9zb3J0ZWRNZXJnZUZ1bGxPdXRlckpvaW4uanMiLCIvaG9tZS9tdHJheW5oYW0vRG9jdW1lbnRzL0RpZ2l0YWxzbWl0aHMvSmF2YS9sb2Rhc2gtam9pbnMvc3JjL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlSW5uZXJKb2luLmpzIiwiL2hvbWUvbXRyYXluaGFtL0RvY3VtZW50cy9EaWdpdGFsc21pdGhzL0phdmEvbG9kYXNoLWpvaW5zL3NyYy9zb3J0ZWRNZXJnZS9zb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW4uanMiLCIvaG9tZS9tdHJheW5oYW0vRG9jdW1lbnRzL0RpZ2l0YWxzbWl0aHMvSmF2YS9sb2Rhc2gtam9pbnMvc3JjL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlTGVmdFNlbWlKb2luLmpzIiwiL2hvbWUvbXRyYXluaGFtL0RvY3VtZW50cy9EaWdpdGFsc21pdGhzL0phdmEvbG9kYXNoLWpvaW5zL3NyYy9zb3J0ZWRNZXJnZS9zb3J0ZWRNZXJnZVJpZ2h0T3V0ZXJKb2luLmpzIiwiL2hvbWUvbXRyYXluaGFtL0RvY3VtZW50cy9EaWdpdGFsc21pdGhzL0phdmEvbG9kYXNoLWpvaW5zL3NyYy9zb3J0ZWRNZXJnZS9zb3J0ZWRNZXJnZVJpZ2h0U2VtaUpvaW4uanMiLCIvaG9tZS9tdHJheW5oYW0vRG9jdW1lbnRzL0RpZ2l0YWxzbWl0aHMvSmF2YS9sb2Rhc2gtam9pbnMvc3JjL3V0aWwvdW5kZWZpbmVkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXG52YXIgam9pbnMgPSB7fTtcblxuam9pbnMuY2FydGVzaWFuUHJvZHVjdCA9IHJlcXVpcmUoJy4vY2FydGVzaWFuUHJvZHVjdCcpO1xuXG5qb2lucy5oYXNoRnVsbE91dGVySm9pbiA9IHJlcXVpcmUoJy4vaGFzaC9oYXNoRnVsbE91dGVySm9pbicpO1xuam9pbnMuaGFzaElubmVySm9pbiA9IHJlcXVpcmUoJy4vaGFzaC9oYXNoSW5uZXJKb2luJyk7XG5qb2lucy5oYXNoTGVmdE91dGVySm9pbiA9IHJlcXVpcmUoJy4vaGFzaC9oYXNoTGVmdE91dGVySm9pbicpO1xuam9pbnMuaGFzaExlZnRTZW1pSm9pbiA9IHJlcXVpcmUoJy4vaGFzaC9oYXNoTGVmdFNlbWlKb2luJyk7XG5qb2lucy5oYXNoUmlnaHRPdXRlckpvaW4gPSByZXF1aXJlKCcuL2hhc2gvaGFzaFJpZ2h0T3V0ZXJKb2luJyk7XG5qb2lucy5oYXNoUmlnaHRTZW1pSm9pbiA9IHJlcXVpcmUoJy4vaGFzaC9oYXNoUmlnaHRTZW1pSm9pbicpO1xuXG5qb2lucy5zb3J0ZWRNZXJnZUZ1bGxPdXRlckpvaW4gPSByZXF1aXJlKCcuL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlRnVsbE91dGVySm9pbicpO1xuam9pbnMuc29ydGVkTWVyZ2VJbm5lckpvaW4gPSByZXF1aXJlKCcuL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlSW5uZXJKb2luJyk7XG5qb2lucy5zb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW4gPSByZXF1aXJlKCcuL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlTGVmdE91dGVySm9pbicpO1xuam9pbnMuc29ydGVkTWVyZ2VMZWZ0U2VtaUpvaW4gPSByZXF1aXJlKCcuL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlTGVmdFNlbWlKb2luJyk7XG5qb2lucy5zb3J0ZWRNZXJnZVJpZ2h0T3V0ZXJKb2luID0gcmVxdWlyZSgnLi9zb3J0ZWRNZXJnZS9zb3J0ZWRNZXJnZVJpZ2h0T3V0ZXJKb2luJyk7XG5qb2lucy5zb3J0ZWRNZXJnZVJpZ2h0U2VtaUpvaW4gPSByZXF1aXJlKCcuL3NvcnRlZE1lcmdlL3NvcnRlZE1lcmdlUmlnaHRTZW1pSm9pbicpO1xuXG5qb2lucy5uZXN0ZWRMb29wRnVsbE91dGVySm9pbiA9IHJlcXVpcmUoJy4vbmVzdGVkTG9vcC9uZXN0ZWRMb29wRnVsbE91dGVySm9pbicpO1xuam9pbnMubmVzdGVkTG9vcElubmVySm9pbiA9IHJlcXVpcmUoJy4vbmVzdGVkTG9vcC9uZXN0ZWRMb29wSW5uZXJKb2luJyk7XG5qb2lucy5uZXN0ZWRMb29wTGVmdE91dGVySm9pbiA9IHJlcXVpcmUoJy4vbmVzdGVkTG9vcC9uZXN0ZWRMb29wTGVmdE91dGVySm9pbicpO1xuam9pbnMubmVzdGVkTG9vcExlZnRTZW1pSm9pbiA9IHJlcXVpcmUoJy4vbmVzdGVkTG9vcC9uZXN0ZWRMb29wTGVmdFNlbWlKb2luJyk7XG5qb2lucy5uZXN0ZWRMb29wUmlnaHRPdXRlckpvaW4gPSByZXF1aXJlKCcuL25lc3RlZExvb3AvbmVzdGVkTG9vcFJpZ2h0T3V0ZXJKb2luJyk7XG5qb2lucy5uZXN0ZWRMb29wUmlnaHRTZW1pSm9pbiA9IHJlcXVpcmUoJy4vbmVzdGVkTG9vcC9uZXN0ZWRMb29wUmlnaHRTZW1pSm9pbicpO1xuXG5nbG9iYWwuam9pbnMgPSBqb2lucztcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIi8qKlxuICogUHJvZHVjZSB0aGUgY2FydGVzaWFuIHByb2R1Y3Qgb2YgbXVsdGlwbGUgYXJyYXlzXG4gKiBAcGFyYW0gIHsqW1tdXX0gYXJyYXlcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIGNhcnRlc2lhblByb2R1Y3QgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICBpZiAoYXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gXy5yZWR1Y2UoYXJyYXksIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5mbGF0dGVuKF8ubWFwKGEsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ubWFwKGIsIGZ1bmN0aW9uICh5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4LmNvbmNhdChbeV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSksIHRydWUpO1xuICAgICAgICB9LCBbW11dKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYXJ0ZXNpYW5Qcm9kdWN0OyIsIi8qKlxuICogSGFzaCBmdWxsIG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBoYXNoRnVsbE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciBhaWR4ID0gXy5ncm91cEJ5KGEsIGFBY2Nlc3NvciksXG4gICAgICAgIGJpZHggPSBfLmdyb3VwQnkoYiwgYkFjY2Vzc29yKSxcbiAgICAgICAgciA9IFtdLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgaiA9IDAsXG4gICAgICAgIGFWYWwgPSBudWxsLFxuICAgICAgICBiVmFsID0gbnVsbDtcbiAgICBmb3IgKHZhciBhS2V5IGluIGFpZHgpIHtcbiAgICAgICAgaWYgKGFLZXkgaW4gYmlkeCkge1xuICAgICAgICAgICAgYVZhbCA9IGFpZHhbYUtleV07XG4gICAgICAgICAgICBpID0gYVZhbC5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgYlZhbCA9IGJpZHhbYUtleV07XG4gICAgICAgICAgICAgICAgaiA9IGJWYWwubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKF8uYXNzaWduKHt9LCBhVmFsW2ldLCBiVmFsW2pdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIGJpZHhbYUtleV07IC8vIE5vdCBwZXJmb3JtYW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByID0gci5jb25jYXQoYWlkeFthS2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHIuY29uY2F0KF8uZmxhdHRlbihfLnZhbHVlcyhiaWR4KSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoRnVsbE91dGVySm9pbjsiLCIvKipcbiAqIEhhc2ggaW5uZXIgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIGhhc2hJbm5lckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICB2YXIgaWR4ID0gbnVsbCxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIGogPSAwLFxuICAgICAgICByID0gW10sXG4gICAgICAgIGRhdHVtID0gbnVsbCxcbiAgICAgICAgb0RhdHVtcyA9IG51bGwsXG4gICAgICAgIHZhbCA9IG51bGw7XG4gICAgaWYgKGEubGVuZ3RoIDwgYi5sZW5ndGgpIHtcbiAgICAgICAgaWR4ID0gXy5pbmRleEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgICAgIGkgPSBiLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdmFsID0gYkFjY2Vzc29yKGRhdHVtID0gYltpXSk7XG4gICAgICAgICAgICBpZiAodmFsIGluIGlkeCkge1xuICAgICAgICAgICAgICAgIG9EYXR1bXMgPSB2YWxbaWR4XTtcbiAgICAgICAgICAgICAgICBqID0gb0RhdHVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgICAgICByLnVuc2hpZnQoXy5hc3NpZ24oe30sIG9EYXR1bXNbal0sIGRhdHVtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWR4ID0gXy5pbmRleEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgICAgIGkgPSBhLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdmFsID0gYUFjY2Vzc29yKGRhdHVtID0gYVtpXSk7XG4gICAgICAgICAgICBpZiAodmFsIGluIGlkeCkge1xuICAgICAgICAgICAgICAgIG9EYXR1bXMgPSB2YWxbaWR4XTtcbiAgICAgICAgICAgICAgICBqID0gb0RhdHVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgICAgICByLnVuc2hpZnQoXy5hc3NpZ24oe30sIGRhdHVtLCBpZHhbdmFsXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaElubmVySm9pbjsiLCIvKipcbiAqIEhhc2ggbGVmdCBvdXRlciBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgaGFzaExlZnRPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICB2YXIgaWR4ID0gXy5ncm91cEJ5KGIsIGJBY2Nlc3NvciksXG4gICAgICAgIGkgPSBhLmxlbmd0aCxcbiAgICAgICAgaiA9IDAsXG4gICAgICAgIHIgPSBbXSxcbiAgICAgICAgYURhdHVtID0gbnVsbCxcbiAgICAgICAgYkRhdHVtcyA9IG51bGwsXG4gICAgICAgIGFWYWwgPSBudWxsO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgYVZhbCA9IGFBY2Nlc3NvcihhRGF0dW0gPSBhW2ldKTtcbiAgICAgICAgaWYgKGFWYWwgaW4gaWR4KSB7XG4gICAgICAgICAgICBiRGF0dW1zID0gaWR4W2FWYWxdO1xuICAgICAgICAgICAgaiA9IGJEYXR1bXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChfLmFzc2lnbih7fSwgYURhdHVtLCBiRGF0dW1zW2pdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByLnVuc2hpZnQoYURhdHVtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaExlZnRPdXRlckpvaW47IiwiLyoqXG4gKiBIYXNoIGxlZnQgc2VtaSBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgaGFzaExlZnRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciBpZHggPSBudWxsLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgaiA9IDAsXG4gICAgICAgIHIgPSBbXSxcbiAgICAgICAgZGF0dW0gPSBudWxsLFxuICAgICAgICBvRGF0dW1zID0gbnVsbCxcbiAgICAgICAgdmFsID0gbnVsbDtcbiAgICBpZiAoYS5sZW5ndGggPCBiLmxlbmd0aCkge1xuICAgICAgICBpZHggPSBfLmluZGV4QnkoYSwgYUFjY2Vzc29yKTtcbiAgICAgICAgaSA9IGIubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YWwgPSBiQWNjZXNzb3IoZGF0dW0gPSBiW2ldKTtcbiAgICAgICAgICAgIGlmICh2YWwgaW4gaWR4KSB7XG4gICAgICAgICAgICAgICAgb0RhdHVtcyA9IHZhbFtpZHhdO1xuICAgICAgICAgICAgICAgIGogPSBvRGF0dW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHIudW5zaGlmdChvRGF0dW1zW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZHggPSBfLmluZGV4QnkoYiwgYkFjY2Vzc29yKTtcbiAgICAgICAgaSA9IGEubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YWwgPSBhQWNjZXNzb3IoZGF0dW0gPSBhW2ldKTtcbiAgICAgICAgICAgIGlmICh2YWwgaW4gaWR4KSB7XG4gICAgICAgICAgICAgICAgb0RhdHVtcyA9IHZhbFtpZHhdO1xuICAgICAgICAgICAgICAgIGogPSBvRGF0dW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHIudW5zaGlmdChkYXR1bSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoTGVmdFNlbWlKb2luOyIsInZhciBoYXNoTGVmdE91dGVySm9pbiA9IHJlcXVpcmUoJy4vaGFzaExlZnRPdXRlckpvaW4nKTtcblxuLyoqXG4gKiBIYXNoIHJpZ2h0IG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBoYXNoUmlnaHRPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICByZXR1cm4gaGFzaExlZnRPdXRlckpvaW4oYiwgYkFjY2Vzc29yLCBhLCBhQWNjZXNzb3IpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoUmlnaHRPdXRlckpvaW47IiwidmFyIGhhc2hMZWZ0U2VtaUpvaW4gPSByZXF1aXJlKCcuL2hhc2hMZWZ0U2VtaUpvaW4nKTtcblxuLyoqXG4gKiBIYXNoIHJpZ2h0IHNlbWkgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIGhhc2hSaWdodFNlbWlKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgcmV0dXJuIGhhc2hMZWZ0U2VtaUpvaW4oYiwgYkFjY2Vzc29yLCBhLCBhQWNjZXNzb3IpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoUmlnaHRTZW1pSm9pbjsiLCIvKipcbiAqIE5lc3RlZCBsb29wIGxlZnQgc2VtaSBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgbmVzdGVkTG9vcEZ1bGxPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICAvLyBUT0RPXG4gICAgcmV0dXJuIFthLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcl07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5lc3RlZExvb3BGdWxsT3V0ZXJKb2luOyIsInZhciB1bmRlZiA9IHJlcXVpcmUoJy4uL3V0aWwvdW5kZWZpbmVkJyk7XG5cbi8qKlxuICogTmVzdGVkIGxvb3AgaW5uZXIgam9pblxuICogQHBhcmFtICB7KltdfSBhXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYUFjY2Vzc29yXG4gKiBAcGFyYW0gIHsqW119IGJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBiQWNjZXNzb3JcbiAqIEByZXR1cm4geypbXX1cbiAqL1xudmFyIG5lc3RlZExvb3BJbm5lckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICB2YXIgciA9IFtdLFxuICAgICAgICBpID0gYS5sZW5ndGgsXG4gICAgICAgIGFEYXR1bSxcbiAgICAgICAgYkRhdHVtLFxuICAgICAgICBhVmFsLFxuICAgICAgICBiVmFsO1xuICAgIHdoaWxlICgoYVZhbCA9IHVuZGVmKGFEYXR1bSA9IGFbaS0tXSwgYUFjY2Vzc29yKSkpIHtcbiAgICAgICAgdmFyIGogPSBiLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKChiVmFsID0gdW5kZWYoYkRhdHVtID0gYVtqLS1dLCBiQWNjZXNzb3IpKSkge1xuICAgICAgICAgICAgaWYgKGFWYWwgPT09IGJWYWwpIHtcbiAgICAgICAgICAgICAgICByLnVuc2hpZnQoXy5hc3NpZ24oe30sIGFEYXR1bSwgYkRhdHVtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5lc3RlZExvb3BJbm5lckpvaW47IiwidmFyIHVuZGVmID0gcmVxdWlyZSgnLi4vdXRpbC91bmRlZmluZWQnKTtcblxuLyoqXG4gKiBOZXN0ZWQgbG9vcCBsZWZ0IG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBuZXN0ZWRMb29wTGVmdE91dGVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciByID0gW10sXG4gICAgICAgIGkgPSBhLmxlbmd0aCxcbiAgICAgICAgYURhdHVtLFxuICAgICAgICBiRGF0dW0sXG4gICAgICAgIGFWYWwsXG4gICAgICAgIGJWYWw7XG4gICAgd2hpbGUgKChhVmFsID0gdW5kZWYoYURhdHVtID0gYVtpLS1dLCBhQWNjZXNzb3IpKSkge1xuICAgICAgICB2YXIgaiA9IGIubGVuZ3RoLFxuICAgICAgICAgICAgayA9IHIubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoKGJWYWwgPSB1bmRlZihiRGF0dW0gPSBhW2otLV0sIGJBY2Nlc3NvcikpKSB7XG4gICAgICAgICAgICBpZiAoYVZhbCA9PT0gYlZhbCkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChfLmFzc2lnbih7fSwgYURhdHVtLCBiRGF0dW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoci5sZW5ndGggPT09IGspIHtcbiAgICAgICAgICAgIHIudW5zaGlmdChhRGF0dW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXN0ZWRMb29wTGVmdE91dGVySm9pbjsiLCJ2YXIgdW5kZWYgPSByZXF1aXJlKCcuLi91dGlsL3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIE5lc3RlZCBsb29wIGxlZnQgc2VtaSBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgbmVzdGVkTG9vcExlZnRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHZhciByID0gW10sXG4gICAgICAgIGkgPSBhLmxlbmd0aCxcbiAgICAgICAgYURhdHVtLFxuICAgICAgICBiRGF0dW0sXG4gICAgICAgIGFWYWwsXG4gICAgICAgIGJWYWw7XG4gICAgd2hpbGUgKChhVmFsID0gdW5kZWYoYURhdHVtID0gYVtpLS1dLCBhQWNjZXNzb3IpKSkge1xuICAgICAgICB2YXIgaiA9IGIubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoKGJWYWwgPSB1bmRlZihiRGF0dW0gPSBhW2otLV0sIGJBY2Nlc3NvcikpKSB7XG4gICAgICAgICAgICBpZiAoYVZhbCA9PT0gYlZhbCkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChhRGF0dW0sIGJEYXR1bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5lc3RlZExvb3BMZWZ0U2VtaUpvaW47IiwidmFyIG5lc3RlZExvb3BMZWZ0T3V0ZXJKb2luID0gcmVxdWlyZSgnLi9uZXN0ZWRMb29wTGVmdE91dGVySm9pbicpO1xuXG4vKipcbiAqIE5lc3RlZCBsb29wIHJpZ2h0IG91dGVyIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBuZXN0ZWRMb29wUmlnaHRPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICByZXR1cm4gbmVzdGVkTG9vcExlZnRPdXRlckpvaW4oYiwgYkFjY2Vzc29yLCBhLCBhQWNjZXNzb3IpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXN0ZWRMb29wUmlnaHRPdXRlckpvaW47IiwidmFyIG5lc3RlZExvb3BMZWZ0U2VtaUpvaW4gPSByZXF1aXJlKCcuL25lc3RlZExvb3BMZWZ0U2VtaUpvaW4nKTtcblxuLyoqXG4gKiBOZXN0ZWQgbG9vcCByaWdodCBzZW1pIGpvaW5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBuZXN0ZWRMb29wUmlnaHRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIHJldHVybiBuZXN0ZWRMb29wTGVmdFNlbWlKb2luKGIsIGJBY2Nlc3NvciwgYSwgYUFjY2Vzc29yKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmVzdGVkTG9vcFJpZ2h0U2VtaUpvaW47IiwidmFyIHVuZGVmID0gcmVxdWlyZSgnLi4vdXRpbC91bmRlZmluZWQnKTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgZnVsbCBvdXRlciBqb2luXG4gKiBAcGFyYW0gIHsqW119IGFcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhQWNjZXNzb3JcbiAqIEBwYXJhbSAgeypbXX0gYlxuICogQHBhcmFtICB7RnVuY3Rpb259IGJBY2Nlc3NvclxuICogQHJldHVybiB7KltdfVxuICovXG52YXIgc29ydGVkTWVyZ2VGdWxsT3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgaWYgKGEubGVuZ3RoIDwgMSB8fCBiLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICAgIH1cbiAgICBhID0gXy5zb3J0QnkoYSwgYUFjY2Vzc29yKTtcbiAgICBiID0gXy5zb3J0QnkoYiwgYkFjY2Vzc29yKTtcbiAgICB2YXIgciA9IFtdLFxuICAgICAgICBhRGF0dW0gPSBhLnBvcCgpLFxuICAgICAgICBiRGF0dW0gPSBiLnBvcCgpLFxuICAgICAgICBhVmFsID0gYUFjY2Vzc29yKGFEYXR1bSksXG4gICAgICAgIGJWYWwgPSBiQWNjZXNzb3IoYkRhdHVtKSxcbiAgICAgICAgYU1hdGNoID0gZmFsc2U7XG4gICAgd2hpbGUgKGFEYXR1bSAmJiBiRGF0dW0pIHtcbiAgICAgICAgaWYgKGFWYWwgPiBiVmFsKSB7XG4gICAgICAgICAgICBpZiAoIWFNYXRjaCkge1xuICAgICAgICAgICAgICAgIHIudW5zaGlmdChhRGF0dW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYVZhbCA9IHVuZGVmKGFEYXR1bSA9IGEucG9wKCksIGFBY2Nlc3Nvcik7XG4gICAgICAgICAgICBhTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChhVmFsIDwgYlZhbCkge1xuICAgICAgICAgICAgci51bnNoaWZ0KGJEYXR1bSk7XG4gICAgICAgICAgICBiVmFsID0gdW5kZWYoYkRhdHVtID0gYi5wb3AoKSwgYkFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHIudW5zaGlmdChfLmFzc2lnbih7fSwgYURhdHVtLCBiRGF0dW0pKTtcbiAgICAgICAgICAgIC8vIFRPRE8gYlZhbCBjb3VsZCBtYXRjaCBtdWx0aXBsZSBhVmFsOyBkb24ndCBwb3AgaGVyZS5cbiAgICAgICAgICAgIGJWYWwgPSB1bmRlZihiRGF0dW0gPSBiLnBvcCgpLCBiQWNjZXNzb3IpO1xuICAgICAgICAgICAgYU1hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoYkRhdHVtKSB7XG4gICAgICAgIHIudW5zaGlmdChiRGF0dW0pO1xuICAgIH1cbiAgICBpZiAoYURhdHVtICYmICFhTWF0Y2gpIHtcbiAgICAgICAgci51bnNoaWZ0KGFEYXR1bSk7XG4gICAgfVxuICAgIHJldHVybiBhLmNvbmNhdChiLCByKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkTWVyZ2VGdWxsT3V0ZXJKb2luOyIsInZhciB1bmRlZiA9IHJlcXVpcmUoJy4uL3V0aWwvdW5kZWZpbmVkJyk7XG5cbi8qKlxuICogU29ydGVkIG1lcmdlIGlubmVyIGpvaW4uICBSZXN0dXJucyBhIG5ldyBhcnJheS5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBzb3J0ZWRNZXJnZUlubmVySm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIGlmIChhLmxlbmd0aCA8IDEgfHwgYi5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgYSA9IF8uc29ydEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgYiA9IF8uc29ydEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgdmFyIHIgPSBbXSxcbiAgICAgICAgYURhdHVtID0gYS5wb3AoKSxcbiAgICAgICAgYkRhdHVtID0gYi5wb3AoKSxcbiAgICAgICAgYVZhbCA9IGFBY2Nlc3NvcihhRGF0dW0pLFxuICAgICAgICBiVmFsID0gYkFjY2Vzc29yKGJEYXR1bSk7XG4gICAgd2hpbGUgKGFEYXR1bSAmJiBiRGF0dW0pIHtcbiAgICAgICAgaWYgKGFWYWwgPiBiVmFsKSB7XG4gICAgICAgICAgICBhVmFsID0gdW5kZWYoYURhdHVtID0gYS5wb3AoKSwgYUFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIGlmIChhVmFsIDwgYlZhbCkge1xuICAgICAgICAgICAgYlZhbCA9IHVuZGVmKGJEYXR1bSA9IGIucG9wKCksIGJBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByLnVuc2hpZnQoXy5hc3NpZ24oe30sIGFEYXR1bSwgYkRhdHVtKSk7XG4gICAgICAgICAgICBiVmFsID0gdW5kZWYoYkRhdHVtID0gYi5wb3AoKSwgYkFjY2Vzc29yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkTWVyZ2VJbm5lckpvaW47IiwidmFyIHVuZGVmID0gcmVxdWlyZSgnLi4vdXRpbC91bmRlZmluZWQnKTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgbGVmdCBvdXRlciBqb2luLiBSZXR1cm5zIHRoZSBhLWFycmF5IHJlZmVyZW5jZS5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBzb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICBpZiAoYS5sZW5ndGggPCAxIHx8IGIubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgYSA9IF8uc29ydEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgYiA9IF8uc29ydEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgdmFyIHIgPSBbXSxcbiAgICAgICAgYURhdHVtID0gYS5wb3AoKSxcbiAgICAgICAgYkRhdHVtID0gYi5wb3AoKSxcbiAgICAgICAgYVZhbCA9IGFBY2Nlc3NvcihhRGF0dW0pLFxuICAgICAgICBiVmFsID0gYkFjY2Vzc29yKGJEYXR1bSksXG4gICAgICAgIGFNYXRjaCA9IGZhbHNlO1xuICAgIHdoaWxlIChhRGF0dW0gJiYgYkRhdHVtKSB7XG4gICAgICAgIGlmIChhVmFsID4gYlZhbCkge1xuICAgICAgICAgICAgaWYgKCFhTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByLnVuc2hpZnQoYURhdHVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFWYWwgPSB1bmRlZihhRGF0dW0gPSBhLnBvcCgpLCBhQWNjZXNzb3IpO1xuICAgICAgICAgICAgYU1hdGNoID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoYVZhbCA8IGJWYWwpIHtcbiAgICAgICAgICAgIGJWYWwgPSB1bmRlZihiRGF0dW0gPSBiLnBvcCgpLCBiQWNjZXNzb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgci51bnNoaWZ0KF8uYXNzaWduKHt9LCBhRGF0dW0sIGJEYXR1bSkpO1xuICAgICAgICAgICAgYlZhbCA9IHVuZGVmKGJEYXR1bSA9IGIucG9wKCksIGJBY2Nlc3Nvcik7XG4gICAgICAgICAgICBhTWF0Y2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChhRGF0dW0gJiYgIWFNYXRjaCkge1xuICAgICAgICByLnVuc2hpZnQoYURhdHVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGEuY29uY2F0KHIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRNZXJnZUxlZnRPdXRlckpvaW47IiwidmFyIHVuZGVmID0gcmVxdWlyZSgnLi4vdXRpbC91bmRlZmluZWQnKTtcblxuLyoqXG4gKiBTb3J0ZWQgbWVyZ2UgbGVmdCBzZW1pIGpvaW4uICBSZXN0dXJucyBhIG5ldyBhcnJheS5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBzb3J0ZWRNZXJnZUxlZnRTZW1pSm9pbiA9IGZ1bmN0aW9uIChhLCBhQWNjZXNzb3IsIGIsIGJBY2Nlc3Nvcikge1xuICAgIGlmIChhLmxlbmd0aCA8IDEgfHwgYi5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgYSA9IF8uc29ydEJ5KGEsIGFBY2Nlc3Nvcik7XG4gICAgYiA9IF8uc29ydEJ5KGIsIGJBY2Nlc3Nvcik7XG4gICAgdmFyIHIgPSBbXSxcbiAgICAgICAgYURhdHVtID0gYS5wb3AoKSxcbiAgICAgICAgYkRhdHVtID0gYi5wb3AoKSxcbiAgICAgICAgYVZhbCA9IGFBY2Nlc3NvcihhRGF0dW0pLFxuICAgICAgICBiVmFsID0gYkFjY2Vzc29yKGJEYXR1bSk7XG4gICAgd2hpbGUgKGFEYXR1bSAmJiBiRGF0dW0pIHtcbiAgICAgICAgaWYgKGFWYWwgPiBiVmFsKSB7XG4gICAgICAgICAgICBhVmFsID0gdW5kZWYoYURhdHVtID0gYS5wb3AoKSwgYUFjY2Vzc29yKTtcbiAgICAgICAgfSBlbHNlIGlmIChhVmFsIDwgYlZhbCkge1xuICAgICAgICAgICAgYlZhbCA9IHVuZGVmKGJEYXR1bSA9IGIucG9wKCksIGJBY2Nlc3Nvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByLnVuc2hpZnQoYURhdHVtLCBiRGF0dW0pO1xuICAgICAgICAgICAgYVZhbCA9IHVuZGVmKGFEYXR1bSA9IGEucG9wKCksIGFBY2Nlc3Nvcik7XG4gICAgICAgICAgICBiVmFsID0gdW5kZWYoYkRhdHVtID0gYi5wb3AoKSwgYkFjY2Vzc29yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydGVkTWVyZ2VMZWZ0U2VtaUpvaW47IiwidmFyIHNvcnRlZE1lcmdlTGVmdE91dGVySm9pbiA9IHJlcXVpcmUoJy4vc29ydGVkTWVyZ2VMZWZ0T3V0ZXJKb2luJyk7XG5cbi8qKlxuICogU29ydGVkIG1lcmdlIHJpZ2h0IG91dGVyIGpvaW4uICBSZXR1cm5zIHRoZSBiLWFycmF5IHJlZmVyZW5jZS5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBzb3J0ZWRNZXJnZVJpZ2h0T3V0ZXJKb2luID0gZnVuY3Rpb24gKGEsIGFBY2Nlc3NvciwgYiwgYkFjY2Vzc29yKSB7XG4gICAgcmV0dXJuIHNvcnRlZE1lcmdlTGVmdE91dGVySm9pbihiLCBiQWNjZXNzb3IsIGEsIGFBY2Nlc3Nvcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRlZE1lcmdlUmlnaHRPdXRlckpvaW47IiwidmFyIHNvcnRlZE1lcmdlTGVmdFNlbWlKb2luID0gcmVxdWlyZSgnLi9zb3J0ZWRNZXJnZUxlZnRTZW1pSm9pbicpO1xuXG4vKipcbiAqIFNvcnRlZCBtZXJnZSByaWdodCBzZW1pIGpvaW4uICBSZXR1cm5zIHRoZSBiLWFycmF5IHJlZmVyZW5jZS5cbiAqIEBwYXJhbSAgeypbXX0gYVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFBY2Nlc3NvclxuICogQHBhcmFtICB7KltdfSBiXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYkFjY2Vzc29yXG4gKiBAcmV0dXJuIHsqW119XG4gKi9cbnZhciBzb3J0ZWRNZXJnZVJpZ2h0U2VtaUpvaW4gPSBmdW5jdGlvbiAoYSwgYUFjY2Vzc29yLCBiLCBiQWNjZXNzb3IpIHtcbiAgICByZXR1cm4gc29ydGVkTWVyZ2VMZWZ0U2VtaUpvaW4oYiwgYkFjY2Vzc29yLCBhLCBhQWNjZXNzb3IpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRNZXJnZVJpZ2h0U2VtaUpvaW47IiwidmFyIHVuZGVmID0gZnVuY3Rpb24gKG9iaiwgZm4pIHtcbiAgICByZXR1cm4gXy5pc1VuZGVmaW5lZChvYmopID8gb2JqIDogZm4ob2JqKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdW5kZWY7Il19
