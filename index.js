var _ = require('lodash');

var joinWrapper = require('./lib/joinWrapper');

_.mixin({'cartesianProduct': require('./lib/cartesianProduct')});

_.mixin({'hashFullOuterJoin': joinWrapper(require('./lib/hash/hashFullOuterJoin'))});
_.mixin({'hashInnerJoin': joinWrapper(require('./lib/hash/hashInnerJoin'))});
_.mixin({'hashLeftOuterJoin': joinWrapper(require('./lib/hash/hashLeftOuterJoin'))});
_.mixin({'hashLeftSemiJoin': joinWrapper(require('./lib/hash/hashLeftSemiJoin'))});
_.mixin({'hashRightOuterJoin': joinWrapper(require('./lib/hash/hashRightOuterJoin'))});
_.mixin({'hashRightSemiJoin': joinWrapper(require('./lib/hash/hashRightSemiJoin'))});

_.mixin({'sortedMergeFullOuterJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeFullOuterJoin'))});
_.mixin({'sortedMergeInnerJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeInnerJoin'))});
_.mixin({'sortedMergeLeftOuterJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeLeftOuterJoin'))});
_.mixin({'sortedMergeLeftSemiJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeLeftSemiJoin'))});
_.mixin({'sortedMergeRightOuterJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeRightOuterJoin'))});
_.mixin({'sortedMergeRightSemiJoin': joinWrapper(require('./lib/sortedMerge/sortedMergeRightSemiJoin'))});

_.mixin({'nestedLoopFullOuterJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopFullOuterJoin'))});
_.mixin({'nestedLoopInnerJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopInnerJoin'))});
_.mixin({'nestedLoopLeftOuterJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopLeftOuterJoin'))});
_.mixin({'nestedLoopLeftSemiJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopLeftSemiJoin'))});
_.mixin({'nestedLoopRightOuterJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopRightOuterJoin'))});
_.mixin({'nestedLoopRightSemiJoin': joinWrapper(require('./lib/nestedLoop/nestedLoopRightSemiJoin'))});

module.exports = _;
