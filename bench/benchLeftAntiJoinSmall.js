var hashLeftAntiJoin = require('../lib/hash/hashLeftAntiJoin'),
    sortedMergeLeftAntiJoin = require('../lib/sortedMerge/sortedMergeLeftAntiJoin'),
    nestedLoopLeftAntiJoin = require('../lib/nestedLoop/nestedLoopLeftAntiJoin'),
    joinBench = require('./util/joinBench');

module.exports = joinBench('Left Anti Joins Small', 10, hashLeftAntiJoin,
    sortedMergeLeftAntiJoin, nestedLoopLeftAntiJoin);