
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