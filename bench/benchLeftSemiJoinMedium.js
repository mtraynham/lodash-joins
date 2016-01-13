import hashLeftSemiJoin from '../lib/hash/hashLeftSemiJoin';
import sortedMergeLeftSemiJoin from '../lib/sortedMerge/sortedMergeLeftSemiJoin';
import nestedLoopLeftSemiJoin from '../lib/nestedLoop/nestedLoopLeftSemiJoin';
import joinBench from './util/joinBench';

export default joinBench('Left Semi Joins Medium', 100, hashLeftSemiJoin,
    sortedMergeLeftSemiJoin, nestedLoopLeftSemiJoin);
