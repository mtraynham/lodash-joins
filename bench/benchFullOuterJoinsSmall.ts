import hashFullOuterJoin from '../lib/hash/hashFullOuterJoin';
import sortedMergeFullOuterJoin from '../lib/sortedMerge/sortedMergeFullOuterJoin';
import nestedLoopFullOuterJoin from '../lib/nestedLoop/nestedLoopFullOuterJoin';
import joinBench from './util/joinBench';

export default joinBench('Full Outer Joins Small', 10, hashFullOuterJoin,
    sortedMergeFullOuterJoin, nestedLoopFullOuterJoin);
