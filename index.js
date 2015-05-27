import {runInContext} from 'lodash';
import joinWrapper from './lib/joinWrapper';

let _ = runInContext();

import cartesianProduct from './lib/cartesianProduct';
_.mixin({'cartesianProduct': cartesianProduct});

import hashFullOuterJoin from './lib/hash/hashFullOuterJoin';
_.mixin({'hashFullOuterJoin': joinWrapper(hashFullOuterJoin)});
import hashInnerJoin from './lib/hash/hashInnerJoin';
_.mixin({'hashInnerJoin': joinWrapper(hashInnerJoin)});
import hashLeftOuterJoin from './lib/hash/hashLeftOuterJoin';
_.mixin({'hashLeftOuterJoin': joinWrapper(hashLeftOuterJoin)});
import hashLeftSemiJoin from './lib/hash/hashLeftSemiJoin';
_.mixin({'hashLeftSemiJoin': joinWrapper(hashLeftSemiJoin)});
import hashRightOuterJoin from './lib/hash/hashRightOuterJoin';
_.mixin({'hashRightOuterJoin': joinWrapper(hashRightOuterJoin)});
import hashRightSemiJoin from './lib/hash/hashRightSemiJoin';
_.mixin({'hashRightSemiJoin': joinWrapper(hashRightSemiJoin)});

import sortedMergeFullOuterJoin from './lib/sortedMerge/sortedMergeFullOuterJoin';
_.mixin({'sortedMergeFullOuterJoin': joinWrapper(sortedMergeFullOuterJoin)});
import sortedMergeInnerJoin from './lib/sortedMerge/sortedMergeInnerJoin';
_.mixin({'sortedMergeInnerJoin': joinWrapper(sortedMergeInnerJoin)});
import sortedMergeLeftOuterJoin from './lib/sortedMerge/sortedMergeLeftOuterJoin';
_.mixin({'sortedMergeLeftOuterJoin': joinWrapper(sortedMergeLeftOuterJoin)});
import sortedMergeLeftSemiJoin from './lib/sortedMerge/sortedMergeLeftSemiJoin';
_.mixin({'sortedMergeLeftSemiJoin': joinWrapper(sortedMergeLeftSemiJoin)});
import sortedMergeRightOuterJoin from './lib/sortedMerge/sortedMergeRightOuterJoin';
_.mixin({'sortedMergeRightOuterJoin': joinWrapper(sortedMergeRightOuterJoin)});
import sortedMergeRightSemiJoin from './lib/sortedMerge/sortedMergeRightSemiJoin';
_.mixin({'sortedMergeRightSemiJoin': joinWrapper(sortedMergeRightSemiJoin)});

import nestedLoopFullOuterJoin from './lib/nestedLoop/nestedLoopFullOuterJoin';
_.mixin({'nestedLoopFullOuterJoin': joinWrapper(nestedLoopFullOuterJoin)});
import nestedLoopInnerJoin from './lib/nestedLoop/nestedLoopInnerJoin';
_.mixin({'nestedLoopInnerJoin': joinWrapper(nestedLoopInnerJoin)});
import nestedLoopLeftOuterJoin from './lib/nestedLoop/nestedLoopLeftOuterJoin';
_.mixin({'nestedLoopLeftOuterJoin': joinWrapper(nestedLoopLeftOuterJoin)});
import nestedLoopLeftSemiJoin from './lib/nestedLoop/nestedLoopLeftSemiJoin';
_.mixin({'nestedLoopLeftSemiJoin': joinWrapper(nestedLoopLeftSemiJoin)});
import nestedLoopRightOuterJoin from './lib/nestedLoop/nestedLoopRightOuterJoin';
_.mixin({'nestedLoopRightOuterJoin': joinWrapper(nestedLoopRightOuterJoin)});
import nestedLoopRightSemiJoin from './lib/nestedLoop/nestedLoopRightSemiJoin';
_.mixin({'nestedLoopRightSemiJoin': joinWrapper(nestedLoopRightSemiJoin)});

export default _;
