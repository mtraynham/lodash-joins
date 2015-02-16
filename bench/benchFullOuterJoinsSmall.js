var hashFullOuterJoin = require('../lib/hash/hashFullOuterJoin'),
    sortedMergeFullOuterJoin = require('../lib/sortedMerge/sortedMergeFullOuterJoin'),
    nestedLoopFullOuterJoin = require('../lib/nestedLoop/nestedLoopFullOuterJoin'),
    joinBench = require('./util/joinBench');

module.exports = joinBench('Full Outer Joins Small', 10, hashFullOuterJoin,
    sortedMergeFullOuterJoin, nestedLoopFullOuterJoin);
