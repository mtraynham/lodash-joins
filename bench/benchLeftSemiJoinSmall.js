var hashLeftSemiJoin = require('../lib/hash/hashLeftSemiJoin'),
    sortedMergeLeftSemiJoin = require('../lib/sortedMerge/sortedMergeLeftSemiJoin'),
    nestedLoopLeftSemiJoin = require('../lib/nestedLoop/nestedLoopLeftSemiJoin'),
    joinBench = require('./util/joinBench');

module.exports = joinBench('Left Semi Joins Small', 10, hashLeftSemiJoin,
    sortedMergeLeftSemiJoin, nestedLoopLeftSemiJoin);