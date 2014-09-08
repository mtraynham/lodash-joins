var _ = require('lodash');

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