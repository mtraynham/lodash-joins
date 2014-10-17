var _ = require('lodash');

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