import hashFullOuterJoin from '../lib/hash/hashFullOuterJoin';
import sortedMergeFullOuterJoin from '../lib/sortedMerge/sortedMergeFullOuterJoin';
import nestedLoopFullOuterJoin from '../lib/nestedLoop/nestedLoopFullOuterJoin';
import joinBench from './util/joinBench';

module.exports = joinBench('Full Outer Joins Medium', 100, hashFullOuterJoin,
    sortedMergeFullOuterJoin, nestedLoopFullOuterJoin);
