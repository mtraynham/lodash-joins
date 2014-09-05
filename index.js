
var joins = {};

joins.cartesianProduct = require('./lib/cartesianProduct');

joins.hashFullOuterJoin = require('./lib/hash/hashFullOuterJoin');
joins.hashInnerJoin = require('./lib/hash/hashInnerJoin');
joins.hashLeftOuterJoin = require('./lib/hash/hashLeftOuterJoin');
joins.hashLeftSemiJoin = require('./lib/hash/hashLeftSemiJoin');
joins.hashRightOuterJoin = require('./lib/hash/hashRightOuterJoin');
joins.hashRightSemiJoin = require('./lib/hash/hashRightSemiJoin');

joins.sortedMergeFullOuterJoin = require('./lib/sortedMerge/sortedMergeFullOuterJoin');
joins.sortedMergeInnerJoin = require('./lib/sortedMerge/sortedMergeInnerJoin');
joins.sortedMergeLeftOuterJoin = require('./lib/sortedMerge/sortedMergeLeftOuterJoin');
joins.sortedMergeLeftSemiJoin = require('./lib/sortedMerge/sortedMergeLeftSemiJoin');
joins.sortedMergeRightOuterJoin = require('./lib/sortedMerge/sortedMergeRightOuterJoin');
joins.sortedMergeRightSemiJoin = require('./lib/sortedMerge/sortedMergeRightSemiJoin');

joins.nestedLoopFullOuterJoin = require('./lib/nestedLoop/nestedLoopFullOuterJoin');
joins.nestedLoopInnerJoin = require('./lib/nestedLoop/nestedLoopInnerJoin');
joins.nestedLoopLeftOuterJoin = require('./lib/nestedLoop/nestedLoopLeftOuterJoin');
joins.nestedLoopLeftSemiJoin = require('./lib/nestedLoop/nestedLoopLeftSemiJoin');
joins.nestedLoopRightOuterJoin = require('./lib/nestedLoop/nestedLoopRightOuterJoin');
joins.nestedLoopRightSemiJoin = require('./lib/nestedLoop/nestedLoopRightSemiJoin');

global.joins = joins;