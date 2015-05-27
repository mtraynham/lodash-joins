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

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _lodash = __webpack_require__(1);
	
	var _libJoinWrapper = __webpack_require__(2);
	
	var _libJoinWrapper2 = _interopRequireDefault(_libJoinWrapper);
	
	var _libCartesianProduct = __webpack_require__(3);
	
	var _libCartesianProduct2 = _interopRequireDefault(_libCartesianProduct);
	
	var _libHashHashFullOuterJoin = __webpack_require__(4);
	
	var _libHashHashFullOuterJoin2 = _interopRequireDefault(_libHashHashFullOuterJoin);
	
	var _libHashHashInnerJoin = __webpack_require__(5);
	
	var _libHashHashInnerJoin2 = _interopRequireDefault(_libHashHashInnerJoin);
	
	var _libHashHashLeftOuterJoin = __webpack_require__(6);
	
	var _libHashHashLeftOuterJoin2 = _interopRequireDefault(_libHashHashLeftOuterJoin);
	
	var _libHashHashLeftSemiJoin = __webpack_require__(7);
	
	var _libHashHashLeftSemiJoin2 = _interopRequireDefault(_libHashHashLeftSemiJoin);
	
	var _libHashHashRightOuterJoin = __webpack_require__(8);
	
	var _libHashHashRightOuterJoin2 = _interopRequireDefault(_libHashHashRightOuterJoin);
	
	var _libHashHashRightSemiJoin = __webpack_require__(9);
	
	var _libHashHashRightSemiJoin2 = _interopRequireDefault(_libHashHashRightSemiJoin);
	
	var _libSortedMergeSortedMergeFullOuterJoin = __webpack_require__(10);
	
	var _libSortedMergeSortedMergeFullOuterJoin2 = _interopRequireDefault(_libSortedMergeSortedMergeFullOuterJoin);
	
	var _libSortedMergeSortedMergeInnerJoin = __webpack_require__(12);
	
	var _libSortedMergeSortedMergeInnerJoin2 = _interopRequireDefault(_libSortedMergeSortedMergeInnerJoin);
	
	var _libSortedMergeSortedMergeLeftOuterJoin = __webpack_require__(13);
	
	var _libSortedMergeSortedMergeLeftOuterJoin2 = _interopRequireDefault(_libSortedMergeSortedMergeLeftOuterJoin);
	
	var _libSortedMergeSortedMergeLeftSemiJoin = __webpack_require__(14);
	
	var _libSortedMergeSortedMergeLeftSemiJoin2 = _interopRequireDefault(_libSortedMergeSortedMergeLeftSemiJoin);
	
	var _libSortedMergeSortedMergeRightOuterJoin = __webpack_require__(16);
	
	var _libSortedMergeSortedMergeRightOuterJoin2 = _interopRequireDefault(_libSortedMergeSortedMergeRightOuterJoin);
	
	var _libSortedMergeSortedMergeRightSemiJoin = __webpack_require__(17);
	
	var _libSortedMergeSortedMergeRightSemiJoin2 = _interopRequireDefault(_libSortedMergeSortedMergeRightSemiJoin);
	
	var _libNestedLoopNestedLoopFullOuterJoin = __webpack_require__(18);
	
	var _libNestedLoopNestedLoopFullOuterJoin2 = _interopRequireDefault(_libNestedLoopNestedLoopFullOuterJoin);
	
	var _libNestedLoopNestedLoopInnerJoin = __webpack_require__(19);
	
	var _libNestedLoopNestedLoopInnerJoin2 = _interopRequireDefault(_libNestedLoopNestedLoopInnerJoin);
	
	var _libNestedLoopNestedLoopLeftOuterJoin = __webpack_require__(20);
	
	var _libNestedLoopNestedLoopLeftOuterJoin2 = _interopRequireDefault(_libNestedLoopNestedLoopLeftOuterJoin);
	
	var _libNestedLoopNestedLoopLeftSemiJoin = __webpack_require__(21);
	
	var _libNestedLoopNestedLoopLeftSemiJoin2 = _interopRequireDefault(_libNestedLoopNestedLoopLeftSemiJoin);
	
	var _libNestedLoopNestedLoopRightOuterJoin = __webpack_require__(22);
	
	var _libNestedLoopNestedLoopRightOuterJoin2 = _interopRequireDefault(_libNestedLoopNestedLoopRightOuterJoin);
	
	var _libNestedLoopNestedLoopRightSemiJoin = __webpack_require__(23);
	
	var _libNestedLoopNestedLoopRightSemiJoin2 = _interopRequireDefault(_libNestedLoopNestedLoopRightSemiJoin);
	
	var _ = (0, _lodash.runInContext)();
	
	_.mixin({ 'cartesianProduct': _libCartesianProduct2['default'] });
	
	_.mixin({ 'hashFullOuterJoin': (0, _libJoinWrapper2['default'])(_libHashHashFullOuterJoin2['default']) });
	
	_.mixin({ 'hashInnerJoin': (0, _libJoinWrapper2['default'])(_libHashHashInnerJoin2['default']) });
	
	_.mixin({ 'hashLeftOuterJoin': (0, _libJoinWrapper2['default'])(_libHashHashLeftOuterJoin2['default']) });
	
	_.mixin({ 'hashLeftSemiJoin': (0, _libJoinWrapper2['default'])(_libHashHashLeftSemiJoin2['default']) });
	
	_.mixin({ 'hashRightOuterJoin': (0, _libJoinWrapper2['default'])(_libHashHashRightOuterJoin2['default']) });
	
	_.mixin({ 'hashRightSemiJoin': (0, _libJoinWrapper2['default'])(_libHashHashRightSemiJoin2['default']) });
	
	_.mixin({ 'sortedMergeFullOuterJoin': (0, _libJoinWrapper2['default'])(_libSortedMergeSortedMergeFullOuterJoin2['default']) });
	
	_.mixin({ 'sortedMergeInnerJoin': (0, _libJoinWrapper2['default'])(_libSortedMergeSortedMergeInnerJoin2['default']) });
	
	_.mixin({ 'sortedMergeLeftOuterJoin': (0, _libJoinWrapper2['default'])(_libSortedMergeSortedMergeLeftOuterJoin2['default']) });
	
	_.mixin({ 'sortedMergeLeftSemiJoin': (0, _libJoinWrapper2['default'])(_libSortedMergeSortedMergeLeftSemiJoin2['default']) });
	
	_.mixin({ 'sortedMergeRightOuterJoin': (0, _libJoinWrapper2['default'])(_libSortedMergeSortedMergeRightOuterJoin2['default']) });
	
	_.mixin({ 'sortedMergeRightSemiJoin': (0, _libJoinWrapper2['default'])(_libSortedMergeSortedMergeRightSemiJoin2['default']) });
	
	_.mixin({ 'nestedLoopFullOuterJoin': (0, _libJoinWrapper2['default'])(_libNestedLoopNestedLoopFullOuterJoin2['default']) });
	
	_.mixin({ 'nestedLoopInnerJoin': (0, _libJoinWrapper2['default'])(_libNestedLoopNestedLoopInnerJoin2['default']) });
	
	_.mixin({ 'nestedLoopLeftOuterJoin': (0, _libJoinWrapper2['default'])(_libNestedLoopNestedLoopLeftOuterJoin2['default']) });
	
	_.mixin({ 'nestedLoopLeftSemiJoin': (0, _libJoinWrapper2['default'])(_libNestedLoopNestedLoopLeftSemiJoin2['default']) });
	
	_.mixin({ 'nestedLoopRightOuterJoin': (0, _libJoinWrapper2['default'])(_libNestedLoopNestedLoopRightOuterJoin2['default']) });
	
	_.mixin({ 'nestedLoopRightSemiJoin': (0, _libJoinWrapper2['default'])(_libNestedLoopNestedLoopRightSemiJoin2['default']) });
	
	exports['default'] = _;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Wrap a join function to process inputs in a more succinct manner
	 * @param {Function} joinFn
	 * @returns {Function}
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = joinWrapper;
	
	function joinWrapper(joinFn) {
	    return function (a, aAccessor) {
	        var b = arguments[2] === undefined ? a : arguments[2];
	        var bAccessor = arguments[3] === undefined ? aAccessor : arguments[3];
	        return (function () {
	            if (!a) {
	                throw new Error('Missing required left array');
	            } else if (!aAccessor) {
	                throw new Error('Missing required left accessor');
	            }
	            return joinFn(a, aAccessor, b, bAccessor);
	        })();
	    };
	}
	
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = cartesianProduct;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Produce the cartesian product of multiple arrays
	 * @param  {*[[]]} array
	 * @return {*[]}
	 */
	
	function cartesianProduct(array) {
	    return array.length ? (0, _lodash.reduce)(array, function (a, b) {
	        return (0, _lodash.flatten)((0, _lodash.map)(a, function (x) {
	            return (0, _lodash.map)(b, function (y) {
	                return x.concat([y]);
	            });
	        }), true);
	    }, [[]]) : [];
	}
	
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = hashFullOuterJoin;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Hash full outer join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function hashFullOuterJoin(a, aAccessor, b, bAccessor) {
	    var idx = undefined,
	        markedVals = {},
	        result = undefined,
	        val = undefined;
	    if (a.length < b.length) {
	        idx = (0, _lodash.groupBy)(a, aAccessor);
	        result = (0, _lodash.reduceRight)(b, function (previous, datum) {
	            markedVals[val = bAccessor(datum)] = true;
	            if ((0, _lodash.has)(idx, val)) {
	                return (0, _lodash.map)(idx[val], function (oDatum) {
	                    return (0, _lodash.assign)({}, oDatum, datum);
	                }).concat(previous);
	            }
	            previous.unshift(datum);
	            return previous;
	        }, []);
	    } else {
	        idx = (0, _lodash.groupBy)(b, bAccessor);
	        result = (0, _lodash.reduceRight)(a, function (previous, datum) {
	            markedVals[val = aAccessor(datum)] = true;
	            if ((0, _lodash.has)(idx, val)) {
	                return (0, _lodash.map)(idx[val], function (oDatum) {
	                    return (0, _lodash.assign)({}, datum, oDatum);
	                }).concat(previous);
	            }
	            previous.unshift(datum);
	            return previous;
	        }, []);
	    }
	    return result.concat((0, _lodash.flatten)((0, _lodash.values)((0, _lodash.filter)(idx, function (value, key) {
	        return !(0, _lodash.has)(markedVals, key);
	    }))));
	}
	
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = hashInnerJoin;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Hash inner join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function hashInnerJoin(a, aAccessor, b, bAccessor) {
	    var idx = undefined,
	        result = undefined,
	        val = undefined;
	    if (a.length < b.length) {
	        idx = (0, _lodash.groupBy)(a, aAccessor);
	        result = (0, _lodash.reduceRight)(b, function (previous, datum) {
	            if ((0, _lodash.has)(idx, val = bAccessor(datum))) {
	                return (0, _lodash.map)(idx[val], function (oDatum) {
	                    return (0, _lodash.assign)({}, oDatum, datum);
	                }).concat(previous);
	            }
	            return previous;
	        }, []);
	    } else {
	        idx = (0, _lodash.groupBy)(b, bAccessor);
	        result = (0, _lodash.reduceRight)(a, function (previous, datum) {
	            if ((0, _lodash.has)(idx, val = aAccessor(datum))) {
	                return (0, _lodash.map)(idx[val], function (oDatum) {
	                    return (0, _lodash.assign)({}, datum, oDatum);
	                }).concat(previous);
	            }
	            return previous;
	        }, []);
	    }
	    return result;
	}
	
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = hashLeftOuterJoin;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Hash left outer join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function hashLeftOuterJoin(a, aAccessor, b, bAccessor) {
	    var idx = undefined,
	        val = undefined;
	    if (a.length < b.length) {
	        var _ret = (function () {
	            var markedVals = {};
	            idx = (0, _lodash.groupBy)(a, aAccessor);
	            return {
	                v: (0, _lodash.reduceRight)(b, function (previous, datum) {
	                    markedVals[val = bAccessor(datum)] = true;
	                    if ((0, _lodash.has)(idx, val)) {
	                        return (0, _lodash.map)(idx[val], function (oDatum) {
	                            return (0, _lodash.assign)({}, oDatum, datum);
	                        }).concat(previous);
	                    }
	                    return previous;
	                }, []).concat((0, _lodash.flatten)((0, _lodash.values)((0, _lodash.filter)(idx, function (value, key) {
	                    return !(0, _lodash.has)(markedVals, key);
	                }))))
	            };
	        })();
	
	        if (typeof _ret === 'object') return _ret.v;
	    } else {
	        idx = (0, _lodash.groupBy)(b, bAccessor);
	        return (0, _lodash.reduceRight)(a, function (previous, datum) {
	            if ((0, _lodash.has)(idx, val = aAccessor(datum))) {
	                return (0, _lodash.map)(idx[val], function (oDatum) {
	                    return (0, _lodash.assign)({}, datum, oDatum);
	                }).concat(previous);
	            }
	            previous.unshift(datum);
	            return previous;
	        }, []);
	    }
	}
	
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = hashLeftSemiJoin;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Hash left semi join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function hashLeftSemiJoin(a, aAccessor, b, bAccessor) {
	  var idx = (0, _lodash.indexBy)(b, bAccessor);
	  return (0, _lodash.filter)(a, function (datum) {
	    return (0, _lodash.has)(idx, aAccessor(datum));
	  });
	}
	
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = hashRightOuterJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _hashLeftOuterJoin = __webpack_require__(6);
	
	var _hashLeftOuterJoin2 = _interopRequireDefault(_hashLeftOuterJoin);
	
	/**
	 * Hash right outer join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function hashRightOuterJoin(a, aAccessor, b, bAccessor) {
	  return (0, _hashLeftOuterJoin2['default'])(b, bAccessor, a, aAccessor);
	}
	
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = hashRightSemiJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _hashLeftSemiJoin = __webpack_require__(7);
	
	var _hashLeftSemiJoin2 = _interopRequireDefault(_hashLeftSemiJoin);
	
	/**
	 * Hash right semi join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function hashRightSemiJoin(a, aAccessor, b, bAccessor) {
	  return (0, _hashLeftSemiJoin2['default'])(b, bAccessor, a, aAccessor);
	}
	
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = sortedMergeLeftOuterJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _lodash = __webpack_require__(1);
	
	var _utilYieldRightSubList = __webpack_require__(11);
	
	var _utilYieldRightSubList2 = _interopRequireDefault(_utilYieldRightSubList);
	
	/**
	 * Sorted merge left outer join.  Returns a new array.
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function sortedMergeLeftOuterJoin(a, aAccessor, b, bAccessor) {
	    if (a.length < 1 || b.length < 1) {
	        return [];
	    }
	    a = (0, _lodash.sortBy)(a, aAccessor);
	    b = (0, _lodash.sortBy)(b, bAccessor);
	    var r = [],
	        aGenerator = (0, _utilYieldRightSubList2['default'])(a, aAccessor),
	        aDatums = aGenerator.next().value,
	        bGenerator = (0, _utilYieldRightSubList2['default'])(b, bAccessor),
	        bDatums = bGenerator.next().value;
	    while (aDatums && bDatums) {
	        if (aDatums.val > bDatums.val) {
	            r = aDatums.r.concat(r);
	            aDatums = aGenerator.next().value;
	        } else if (aDatums.val < bDatums.val) {
	            r = bDatums.r.concat(r);
	            bDatums = bGenerator.next().value;
	        } else {
	            r = (0, _lodash.reduceRight)(aDatums.r, function (orevious, datum) {
	                return (0, _lodash.reduceRight)(bDatums.r, function (prev, cDatum) {
	                    prev.unshift((0, _lodash.assign)({}, datum, cDatum));
	                    return prev;
	                }, []).concat(orevious);
	            }, []).concat(r);
	            aDatums = aGenerator.next().value;
	            bDatums = bGenerator.next().value;
	        }
	    }
	    if (bDatums) {
	        r = bDatums.r.concat(r);
	    }
	    if (aDatums) {
	        r = aDatums.r.concat(r);
	    }
	    return a.concat(b, r);
	}
	
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * From a sorted list, yield a subList where the accessor values are the same
	 * @param  {*[]} sortedList
	 * @param  {Function} accessor
	 * @return {{}}
	 */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = yieldRightSubList;
	var marked0$0 = [yieldRightSubList].map(regeneratorRuntime.mark);
	
	function yieldRightSubList(sortedList, accessor) {
	    var r, datum, val, tmpVal, i;
	    return regeneratorRuntime.wrap(function yieldRightSubList$(context$1$0) {
	        while (1) switch (context$1$0.prev = context$1$0.next) {
	            case 0:
	                r = void 0, datum = undefined, val = undefined, tmpVal = undefined, i = undefined;
	
	                if (!(sortedList.length > 0)) {
	                    context$1$0.next = 17;
	                    break;
	                }
	
	                val = accessor(datum = sortedList.pop());
	                r = [datum];
	                i = sortedList.length;
	
	            case 5:
	                if (! i--) {
	                    context$1$0.next = 15;
	                    break;
	                }
	
	                tmpVal = accessor(sortedList[i]);
	
	                if (!(val <= tmpVal && val >= tmpVal)) {
	                    context$1$0.next = 11;
	                    break;
	                }
	
	                r.unshift(sortedList.pop());
	                context$1$0.next = 13;
	                break;
	
	            case 11:
	                context$1$0.next = 13;
	                return { r: r, val: val };
	
	            case 13:
	                context$1$0.next = 5;
	                break;
	
	            case 15:
	                context$1$0.next = 19;
	                break;
	
	            case 17:
	                context$1$0.next = 19;
	                return r;
	
	            case 19:
	            case "end":
	                return context$1$0.stop();
	        }
	    }, marked0$0[0], this);
	}
	
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = sortedMergeInnerJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _lodash = __webpack_require__(1);
	
	var _utilYieldRightSubList = __webpack_require__(11);
	
	var _utilYieldRightSubList2 = _interopRequireDefault(_utilYieldRightSubList);
	
	/**
	 * Sorted merge inner join.  Returns a new array.
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function sortedMergeInnerJoin(a, aAccessor, b, bAccessor) {
	    if (a.length < 1 || b.length < 1) {
	        return [];
	    }
	    a = (0, _lodash.sortBy)(a, aAccessor);
	    b = (0, _lodash.sortBy)(b, bAccessor);
	    var r = [],
	        aGenerator = (0, _utilYieldRightSubList2['default'])(a, aAccessor),
	        aDatums = aGenerator.next().value,
	        bGenerator = (0, _utilYieldRightSubList2['default'])(b, bAccessor),
	        bDatums = bGenerator.next().value;
	    while (aDatums && bDatums) {
	        if (aDatums.val > bDatums.val) {
	            aDatums = aGenerator.next().value;
	        } else if (aDatums.val < bDatums.val) {
	            bDatums = bGenerator.next().value;
	        } else {
	            r = (0, _lodash.reduceRight)(aDatums.r, function (orevious, datum) {
	                return (0, _lodash.reduceRight)(bDatums.r, function (prev, cDatum) {
	                    prev.unshift((0, _lodash.assign)({}, datum, cDatum));
	                    return prev;
	                }, []).concat(orevious);
	            }, []).concat(r);
	            aDatums = aGenerator.next().value;
	            bDatums = bGenerator.next().value;
	        }
	    }
	    return r;
	}
	
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = sortedMergeLeftOuterJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _lodash = __webpack_require__(1);
	
	var _utilYieldRightSubList = __webpack_require__(11);
	
	var _utilYieldRightSubList2 = _interopRequireDefault(_utilYieldRightSubList);
	
	/**
	 * Sorted merge left outer join.  Returns a new array.
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function sortedMergeLeftOuterJoin(a, aAccessor, b, bAccessor) {
	    if (a.length < 1 || b.length < 1) {
	        return [];
	    }
	    a = (0, _lodash.sortBy)(a, aAccessor);
	    b = (0, _lodash.sortBy)(b, bAccessor);
	    var r = [],
	        aGenerator = (0, _utilYieldRightSubList2['default'])(a, aAccessor),
	        aDatums = aGenerator.next().value,
	        bGenerator = (0, _utilYieldRightSubList2['default'])(b, bAccessor),
	        bDatums = bGenerator.next().value;
	    while (aDatums && bDatums) {
	        if (aDatums.val > bDatums.val) {
	            r = aDatums.r.concat(r);
	            aDatums = aGenerator.next().value;
	        } else if (aDatums.val < bDatums.val) {
	            bDatums = bGenerator.next().value;
	        } else {
	            r = (0, _lodash.reduceRight)(aDatums.r, function (orevious, datum) {
	                return (0, _lodash.reduceRight)(bDatums.r, function (prev, cDatum) {
	                    prev.unshift((0, _lodash.assign)({}, datum, cDatum));
	                    return prev;
	                }, []).concat(orevious);
	            }, []).concat(r);
	            aDatums = aGenerator.next().value;
	            bDatums = bGenerator.next().value;
	        }
	    }
	    if (aDatums) {
	        r = aDatums.r.concat(r);
	    }
	    return a.concat(r);
	}
	
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = sortedMergeLeftSemiJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _lodash = __webpack_require__(1);
	
	var _utilUndefined = __webpack_require__(15);
	
	var _utilUndefined2 = _interopRequireDefault(_utilUndefined);
	
	/**
	 * Sorted merge left semi join.  Returns a new array.
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function sortedMergeLeftSemiJoin(a, aAccessor, b, bAccessor) {
	    if (a.length < 1 || b.length < 1) {
	        return [];
	    }
	    a = (0, _lodash.sortBy)(a, aAccessor);
	    b = (0, _lodash.sortBy)(b, bAccessor);
	    var r = [],
	        aDatum = a.pop(),
	        bDatum = b.pop(),
	        aVal = aAccessor(aDatum),
	        bVal = bAccessor(bDatum);
	    while (aDatum && bDatum) {
	        if (aVal > bVal) {
	            aVal = (0, _utilUndefined2['default'])(aDatum = a.pop(), aAccessor);
	        } else if (aVal < bVal) {
	            bVal = (0, _utilUndefined2['default'])(bDatum = b.pop(), bAccessor);
	        } else {
	            r.unshift(aDatum);
	            aVal = (0, _utilUndefined2['default'])(aDatum = a.pop(), aAccessor);
	        }
	    }
	    return r;
	}
	
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = undef;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Given an object, execute a function if that object is defined.
	 * @param {*} obj
	 * @param {Function} fn
	 * @returns {*}
	 */
	
	function undef(obj, fn) {
	  return (0, _lodash.isUndefined)(obj) ? obj : fn(obj);
	}
	
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = sortedMergeRightOuterJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _sortedMergeLeftOuterJoin = __webpack_require__(13);
	
	var _sortedMergeLeftOuterJoin2 = _interopRequireDefault(_sortedMergeLeftOuterJoin);
	
	/**
	 * Sorted merge right outer join.  Returns the b-array reference.
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function sortedMergeRightOuterJoin(a, aAccessor, b, bAccessor) {
	  return (0, _sortedMergeLeftOuterJoin2['default'])(b, bAccessor, a, aAccessor);
	}
	
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = sortedMergeRightSemiJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _sortedMergeLeftSemiJoin = __webpack_require__(14);
	
	var _sortedMergeLeftSemiJoin2 = _interopRequireDefault(_sortedMergeLeftSemiJoin);
	
	/**
	 * Sorted merge right semi join.  Returns the b-array reference.
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function sortedMergeRightSemiJoin(a, aAccessor, b, bAccessor) {
	  return (0, _sortedMergeLeftSemiJoin2['default'])(b, bAccessor, a, aAccessor);
	}
	
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = nestedLoopFullOuterJoin;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Nested loop left semi join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function nestedLoopFullOuterJoin(a, aAccessor, b, bAccessor) {
	    var val = undefined,
	        cval = undefined,
	        found = {},
	        tmpLength = undefined;
	    return (0, _lodash.reduceRight)(a, function (previous, datum) {
	        val = aAccessor(datum);
	        tmpLength = previous.length;
	        previous = (0, _lodash.reduceRight)(b, function (oPrevious, oDatum, index) {
	            cval = bAccessor(oDatum);
	            if (val <= cval && val >= cval) {
	                found[index] = true;
	                oPrevious.unshift((0, _lodash.assign)({}, datum, oDatum));
	            }
	            return oPrevious;
	        }, []).concat(previous);
	        if (tmpLength === previous.length) {
	            previous.unshift(datum);
	        }
	        return previous;
	    }, []).concat((0, _lodash.filter)(b, function (datum, index) {
	        return !(0, _lodash.has)(found, index);
	    }));
	}
	
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = nestedLoopInnerJoin;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Nested loop inner join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function nestedLoopInnerJoin(a, aAccessor, b, bAccessor) {
	    var val = undefined,
	        cval = undefined;
	    return (0, _lodash.reduceRight)(a, function (previous, datum) {
	        val = aAccessor(datum);
	        return (0, _lodash.reduceRight)(b, function (oPrevious, oDatum) {
	            cval = bAccessor(oDatum);
	            if (val <= cval && val >= cval) {
	                oPrevious.unshift((0, _lodash.assign)({}, datum, oDatum));
	            }
	            return oPrevious;
	        }, []).concat(previous);
	    }, []);
	}
	
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = nestedLoopLeftOuterJoin;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Nested loop left outer join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function nestedLoopLeftOuterJoin(a, aAccessor, b, bAccessor) {
	    var val = undefined,
	        cval = undefined,
	        tmpLength = undefined;
	    return (0, _lodash.reduceRight)(a, function (previous, datum) {
	        val = aAccessor(datum);
	        tmpLength = previous.length;
	        previous = (0, _lodash.reduceRight)(b, function (oPrevious, oDatum) {
	            cval = bAccessor(oDatum);
	            if (val <= cval && val >= cval) {
	                oPrevious.unshift((0, _lodash.assign)({}, datum, oDatum));
	            }
	            return oPrevious;
	        }, []).concat(previous);
	        if (tmpLength === previous.length) {
	            previous.unshift(datum);
	        }
	        return previous;
	    }, []);
	}
	
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = nestedLoopLeftSemiJoin;
	
	var _lodash = __webpack_require__(1);
	
	/**
	 * Nested loop left semi join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function nestedLoopLeftSemiJoin(a, aAccessor, b, bAccessor) {
	    var val = undefined,
	        cval = undefined;
	    return (0, _lodash.filter)(a, function (datum) {
	        val = aAccessor(datum);
	        return (0, _lodash.some)(b, function (oDatum) {
	            cval = bAccessor(oDatum);
	            return val <= cval && val >= cval;
	        });
	    });
	}
	
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = nestedLoopRightOuterJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _nestedLoopLeftOuterJoin = __webpack_require__(20);
	
	var _nestedLoopLeftOuterJoin2 = _interopRequireDefault(_nestedLoopLeftOuterJoin);
	
	/**
	 * Nested loop right outer join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function nestedLoopRightOuterJoin(a, aAccessor, b, bAccessor) {
	  return (0, _nestedLoopLeftOuterJoin2['default'])(b, bAccessor, a, aAccessor);
	}
	
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = nestedLoopRightSemiJoin;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _nestedLoopLeftSemiJoin = __webpack_require__(21);
	
	var _nestedLoopLeftSemiJoin2 = _interopRequireDefault(_nestedLoopLeftSemiJoin);
	
	/**
	 * Nested loop right semi join
	 * @param  {*[]} a
	 * @param  {Function} aAccessor
	 * @param  {*[]} b
	 * @param  {Function} bAccessor
	 * @return {*[]}
	 */
	
	function nestedLoopRightSemiJoin(a, aAccessor, b, bAccessor) {
	  return (0, _nestedLoopLeftSemiJoin2['default'])(b, bAccessor, a, aAccessor);
	}
	
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=lodash-joins.js.map