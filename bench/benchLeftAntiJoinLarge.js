import hashLeftAntiJoin from '../lib/hash/hashLeftAntiJoin';
import sortedMergeLeftAntiJoin from '../lib/sortedMerge/sortedMergeLeftAntiJoin';
import nestedLoopLeftAntiJoin from '../lib/nestedLoop/nestedLoopLeftAntiJoin';
import joinBench from './util/joinBench';

module.exports = joinBench('Left Anti Joins Large', 1000, hashLeftAntiJoin,
    sortedMergeLeftAntiJoin, nestedLoopLeftAntiJoin);
