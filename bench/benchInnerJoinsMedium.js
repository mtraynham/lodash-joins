import hashInnerJoin from '../lib/hash/hashInnerJoin';
import sortedMergeInnerJoin from '../lib/sortedMerge/sortedMergeInnerJoin';
import nestedLoopInnerJoin from '../lib/nestedLoop/nestedLoopInnerJoin';
import joinBench from './util/joinBench';

export default joinBench('Inner Joins Medium', 100, hashInnerJoin,
    sortedMergeInnerJoin, nestedLoopInnerJoin);
