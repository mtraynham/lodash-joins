(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["_"], factory);
	else if(typeof exports === 'object')
		exports["_"] = factory(require("_"));
	else
		root["_"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);
	
	var joinWrapper = __webpack_require__(2);
	
	_.mixin({'cartesianProduct': __webpack_require__(3)});
	
	_.mixin({'hashFullOuterJoin': joinWrapper(__webpack_require__(4))});
	_.mixin({'hashInnerJoin': joinWrapper(__webpack_require__(5))});
	_.mixin({'hashLeftOuterJoin': joinWrapper(__webpack_require__(6))});
	_.mixin({'hashLeftSemiJoin': joinWrapper(__webpack_require__(7))});
	_.mixin({'hashRightOuterJoin': joinWrapper(__webpack_require__(8))});
	_.mixin({'hashRightSemiJoin': joinWrapper(__webpack_require__(9))});
	
	_.mixin({'sortedMergeFullOuterJoin': joinWrapper(__webpack_require__(10))});
	_.mixin({'sortedMergeInnerJoin': joinWrapper(__webpack_require__(11))});
	_.mixin({'sortedMergeLeftOuterJoin': joinWrapper(__webpack_require__(12))});
	_.mixin({'sortedMergeLeftSemiJoin': joinWrapper(__webpack_require__(13))});
	_.mixin({'sortedMergeRightOuterJoin': joinWrapper(__webpack_require__(14))});
	_.mixin({'sortedMergeRightSemiJoin': joinWrapper(__webpack_require__(15))});
	
	_.mixin({'nestedLoopFullOuterJoin': joinWrapper(__webpack_require__(16))});
	_.mixin({'nestedLoopInnerJoin': joinWrapper(__webpack_require__(17))});
	_.mixin({'nestedLoopLeftOuterJoin': joinWrapper(__webpack_require__(18))});
	_.mixin({'nestedLoopLeftSemiJoin': joinWrapper(__webpack_require__(19))});
	_.mixin({'nestedLoopRightOuterJoin': joinWrapper(__webpack_require__(20))});
	_.mixin({'nestedLoopRightSemiJoin': joinWrapper(__webpack_require__(21))});
	
	module.exports = _;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var hashLeftOuterJoin = __webpack_require__(6);
	
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var hashLeftSemiJoin = __webpack_require__(7);
	
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
	    assign = _.assign,
	    sortBy = _.sortBy,
	    reduceRight = _.reduceRight,
	    yieldRightSubList = __webpack_require__(22);
	
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


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
	    assign = _.assign,
	    sortBy = _.sortBy,
	    reduceRight = _.reduceRight,
	    yieldRightSubList = __webpack_require__(22);
	
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
	    assign = _.assign,
	    sortBy = _.sortBy,
	    reduceRight = _.reduceRight,
	    yieldRightSubList = __webpack_require__(22);
	
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


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
	    sortBy = _.sortBy,
	    undef = __webpack_require__(23);
	
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


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var sortedMergeLeftOuterJoin = __webpack_require__(12);
	
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


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var sortedMergeLeftSemiJoin = __webpack_require__(13);
	
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


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
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


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
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


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
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


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var nestedLoopLeftOuterJoin = __webpack_require__(18);
	
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


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var nestedLoopLeftSemiJoin = __webpack_require__(19);
	
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


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1),
	    isUndefined = _.isUndefined;
	
	var undef = function (obj, fn) {
	    return isUndefined(obj) ? obj : fn(obj);
	};
	
	module.exports = undef;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=lodash-joins.js.map