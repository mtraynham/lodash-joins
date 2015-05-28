import hashLeftOuterJoin from '../lib/hash/hashLeftOuterJoin';
import sortedMergeLeftOuterJoin from '../lib/sortedMerge/sortedMergeLeftOuterJoin';
import nestedLoopLeftOuterJoin from '../lib/nestedLoop/nestedLoopLeftOuterJoin';
import joinBench from './util/joinBench';

export default joinBench('Left Outer Joins Small', 10, hashLeftOuterJoin,
    sortedMergeLeftOuterJoin, nestedLoopLeftOuterJoin);
