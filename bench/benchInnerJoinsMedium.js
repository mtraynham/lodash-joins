var hashInnerJoin = require('../lib/hash/hashInnerJoin'),
    sortedMergeInnerJoin = require('../lib/sortedMerge/sortedMergeInnerJoin'),
    nestedLoopInnerJoin = require('../lib/nestedLoop/nestedLoopInnerJoin'),
    joinBench = require('./util/joinBench');

module.exports = joinBench('Inner Joins Medium', 100, hashInnerJoin,
    sortedMergeInnerJoin, nestedLoopInnerJoin);
