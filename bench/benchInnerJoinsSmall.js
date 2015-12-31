import hashInnerJoin from '../lib/hash/hashInnerJoin';
import sortedMergeInnerJoin from '../lib/sortedMerge/sortedMergeInnerJoin';
import nestedLoopInnerJoin from '../lib/nestedLoop/nestedLoopInnerJoin';
import joinBench from './util/joinBench';

module.exports = joinBench('Inner Joins Small', 10, hashInnerJoin,
    sortedMergeInnerJoin, nestedLoopInnerJoin);
