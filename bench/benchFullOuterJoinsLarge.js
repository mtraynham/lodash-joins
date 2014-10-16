var hashFullOuterJoin = require('../lib/hash/hashFullOuterJoin'),
    sortedMergeFullOuterJoin = require('../lib/sortedMerge/sortedMergeFullOuterJoin'),
    nestedLoopFullOuterJoin = require('../lib/nestedLoop/nestedLoopFullOuterJoin'),
    joinBench = require('./util/joinBench');

module.exports = joinBench('Full Outer Joins Large', 1000, hashFullOuterJoin,
    sortedMergeFullOuterJoin, nestedLoopFullOuterJoin);