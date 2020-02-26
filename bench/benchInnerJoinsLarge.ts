import hashInnerJoin from '../lib/hash/hashInnerJoin';
import sortedMergeInnerJoin from '../lib/sortedMerge/sortedMergeInnerJoin';
import nestedLoopInnerJoin from '../lib/nestedLoop/nestedLoopInnerJoin';
import joinBench from './util/joinBench';

export default joinBench('Inner Joins Large', 1000, hashInnerJoin,
    sortedMergeInnerJoin, nestedLoopInnerJoin);
