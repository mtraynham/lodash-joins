import hashLeftOuterJoin from '../lib/hash/hashLeftOuterJoin';
import sortedMergeLeftOuterJoin from '../lib/sortedMerge/sortedMergeLeftOuterJoin';
import nestedLoopLeftOuterJoin from '../lib/nestedLoop/nestedLoopLeftOuterJoin';
import joinBench from './util/joinBench';

module.exports = joinBench('Left Outer Joins Large', 1000, hashLeftOuterJoin,
    sortedMergeLeftOuterJoin, nestedLoopLeftOuterJoin);
