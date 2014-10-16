var hashLeftOuterJoin = require('../lib/hash/hashLeftOuterJoin'),
    sortedMergeLeftOuterJoin = require('../lib/sortedMerge/sortedMergeLeftOuterJoin'),
    nestedLoopLeftOuterJoin = require('../lib/nestedLoop/nestedLoopLeftOuterJoin'),
    joinBench = require('./util/joinBench');

module.exports = joinBench('Left Outer Joins Small', 10, hashLeftOuterJoin,
    sortedMergeLeftOuterJoin, nestedLoopLeftOuterJoin);