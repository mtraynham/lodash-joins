import {runInContext} from 'lodash';
import cartesianProduct from './lib/cartesianProduct';
import joinWrapper from './lib/joinWrapper';
import hashFullOuterJoin from './lib/hash/hashFullOuterJoin';
import hashInnerJoin from './lib/hash/hashInnerJoin';
import hashLeftOuterJoin from './lib/hash/hashLeftOuterJoin';
import hashLeftSemiJoin from './lib/hash/hashLeftSemiJoin';
import hashLeftAntiJoin from './lib/hash/hashLeftAntiJoin';
import hashRightOuterJoin from './lib/hash/hashRightOuterJoin';
import hashRightSemiJoin from './lib/hash/hashRightSemiJoin';
import hashRightAntiJoin from './lib/hash/hashRightAntiJoin';
import sortedMergeFullOuterJoin from './lib/sortedMerge/sortedMergeFullOuterJoin';
import sortedMergeInnerJoin from './lib/sortedMerge/sortedMergeInnerJoin';
import sortedMergeLeftOuterJoin from './lib/sortedMerge/sortedMergeLeftOuterJoin';
import sortedMergeLeftSemiJoin from './lib/sortedMerge/sortedMergeLeftSemiJoin';
import sortedMergeLeftAntiJoin from './lib/sortedMerge/sortedMergeLeftAntiJoin';
import sortedMergeRightOuterJoin from './lib/sortedMerge/sortedMergeRightOuterJoin';
import sortedMergeRightSemiJoin from './lib/sortedMerge/sortedMergeRightSemiJoin';
import sortedMergeRightAntiJoin from './lib/sortedMerge/sortedMergeRightAntiJoin';
import nestedLoopFullOuterJoin from './lib/nestedLoop/nestedLoopFullOuterJoin';
import nestedLoopInnerJoin from './lib/nestedLoop/nestedLoopInnerJoin';
import nestedLoopLeftOuterJoin from './lib/nestedLoop/nestedLoopLeftOuterJoin';
import nestedLoopLeftSemiJoin from './lib/nestedLoop/nestedLoopLeftSemiJoin';
import nestedLoopLeftAntiJoin from './lib/nestedLoop/nestedLoopLeftAntiJoin';
import nestedLoopRightOuterJoin from './lib/nestedLoop/nestedLoopRightOuterJoin';
import nestedLoopRightSemiJoin from './lib/nestedLoop/nestedLoopRightSemiJoin';
import nestedLoopRightAntiJoin from './lib/nestedLoop/nestedLoopRightAntiJoin';

const _ = runInContext();
_.mixin({
    cartesianProduct,
    hashFullOuterJoin: joinWrapper(hashFullOuterJoin),
    hashInnerJoin: joinWrapper(hashInnerJoin),
    hashLeftOuterJoin: joinWrapper(hashLeftOuterJoin),
    hashLeftSemiJoin: joinWrapper(hashLeftSemiJoin),
    hashLeftAntiJoin: joinWrapper(hashLeftAntiJoin),
    hashRightOuterJoin: joinWrapper(hashRightOuterJoin),
    hashRightSemiJoin: joinWrapper(hashRightSemiJoin),
    hashRightAntiJoin: joinWrapper(hashRightAntiJoin),
    sortedMergeFullOuterJoin: joinWrapper(sortedMergeFullOuterJoin),
    sortedMergeInnerJoin: joinWrapper(sortedMergeInnerJoin),
    sortedMergeLeftOuterJoin: joinWrapper(sortedMergeLeftOuterJoin),
    sortedMergeLeftSemiJoin: joinWrapper(sortedMergeLeftSemiJoin),
    sortedMergeLeftAntiJoin: joinWrapper(sortedMergeLeftAntiJoin),
    sortedMergeRightOuterJoin: joinWrapper(sortedMergeRightOuterJoin),
    sortedMergeRightSemiJoin: joinWrapper(sortedMergeRightSemiJoin),
    sortedMergeRightAntiJoin: joinWrapper(sortedMergeRightAntiJoin),
    nestedLoopFullOuterJoin: joinWrapper(nestedLoopFullOuterJoin),
    nestedLoopInnerJoin: joinWrapper(nestedLoopInnerJoin),
    nestedLoopLeftOuterJoin: joinWrapper(nestedLoopLeftOuterJoin),
    nestedLoopLeftSemiJoin: joinWrapper(nestedLoopLeftSemiJoin),
    nestedLoopLeftAntiJoin: joinWrapper(nestedLoopLeftAntiJoin),
    nestedLoopRightOuterJoin: joinWrapper(nestedLoopRightOuterJoin),
    nestedLoopRightSemiJoin: joinWrapper(nestedLoopRightSemiJoin),
    nestedLoopRightAntiJoin: joinWrapper(nestedLoopRightAntiJoin)
});
export default _;

/**
 * @callback AccessorFunction
 * @param  {Object}
 * @return {*}
 */

/**
 * @callback JoinFunction
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
