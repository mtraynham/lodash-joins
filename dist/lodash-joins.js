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
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	var _lodash = __webpack_require__(1);
	
	var lodash = _interopRequireWildcard(_lodash);
	
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
	
	var _ = lodash.runInContext();
	
	_.mixin({ 'cartesianProduct': _libCartesianProduct2['default'] });
	
	_.mixin({ 'hashFullOuterJoin': (0, _libJoinWrapper2['default'])(_libHashHashFullOuterJoin2['default']) });
	
	_.mixin({ 'hashInnerJoin': (0, _libJoinWrapper2['default'])(_libHashHashInnerJoin2['default']) });
	
	_.mixin({ 'hashLeftOuterJoin': (0, _libJoinWrapper2['default'])(_libHashHashLeftOuterJoin2['default']) });
	
	_.mixin({ 'hashLeftSemiJoin': (0, _libJoinWrapper2['default'])(_libHashHashLeftSemiJoin2['default']) });
	
	_.mixin({ 'hashRightOuterJoin': (0, _libJoinWrapper2['default'])(_libHashHashRightOuterJoin2['default']) });
	
	_.mixin({ 'hashRightSemiJoin': (0, _libJoinWrapper2['default'])(_libHashHashRightSemiJoin2['default']) });
	
	//import sortedMergeFullOuterJoin from './lib/sortedMerge/sortedMergeFullOuterJoin';
	//_.mixin({'sortedMergeFullOuterJoin': joinWrapper(sortedMergeFullOuterJoin)});
	//import sortedMergeInnerJoin from './lib/sortedMerge/sortedMergeInnerJoin';
	//_.mixin({'sortedMergeInnerJoin': joinWrapper(sortedMergeInnerJoin)});
	//import sortedMergeLeftOuterJoin from './lib/sortedMerge/sortedMergeLeftOuterJoin';
	//_.mixin({'sortedMergeLeftOuterJoin': joinWrapper(sortedMergeLeftOuterJoin)});
	//import sortedMergeLeftSemiJoin from './lib/sortedMerge/sortedMergeLeftSemiJoin';
	//_.mixin({'sortedMergeLeftSemiJoin': joinWrapper(sortedMergeLeftSemiJoin)});
	//import sortedMergeRightOuterJoin from './lib/sortedMerge/sortedMergeRightOuterJoin';
	//_.mixin({'sortedMergeRightOuterJoin': joinWrapper(sortedMergeRightOuterJoin)});
	//import sortedMergeRightSemiJoin from './lib/sortedMerge/sortedMergeRightSemiJoin';
	//_.mixin({'sortedMergeRightSemiJoin': joinWrapper(sortedMergeRightSemiJoin)});
	//
	//import nestedLoopFullOuterJoin from './lib/nestedLoop/nestedLoopFullOuterJoin';
	//_.mixin({'nestedLoopFullOuterJoin': joinWrapper(nestedLoopFullOuterJoin)});
	//import nestedLoopInnerJoin from './lib/nestedLoop/nestedLoopInnerJoin';
	//_.mixin({'nestedLoopInnerJoin': joinWrapper(nestedLoopInnerJoin)});
	//import nestedLoopLeftOuterJoin from './lib/nestedLoop/nestedLoopLeftOuterJoin';
	//_.mixin({'nestedLoopLeftOuterJoin': joinWrapper(nestedLoopLeftOuterJoin)});
	//import nestedLoopLeftSemiJoin from './lib/nestedLoop/nestedLoopLeftSemiJoin';
	//_.mixin({'nestedLoopLeftSemiJoin': joinWrapper(nestedLoopLeftSemiJoin)});
	//import nestedLoopRightOuterJoin from './lib/nestedLoop/nestedLoopRightOuterJoin';
	//_.mixin({'nestedLoopRightOuterJoin': joinWrapper(nestedLoopRightOuterJoin)});
	//import nestedLoopRightSemiJoin from './lib/nestedLoop/nestedLoopRightSemiJoin';
	//_.mixin({'nestedLoopRightSemiJoin': joinWrapper(nestedLoopRightSemiJoin)});
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=lodash-joins.js.map