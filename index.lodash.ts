import {runInContext} from 'lodash';
import * as lib from './lib';
import {joinWrapper} from './lib/util';

const _ = runInContext();
_.mixin({
    cartesianProduct: lib.cartesianProduct,
    hashFullOuterJoin: joinWrapper(lib.hashFullOuterJoin),
    hashInnerJoin: joinWrapper(lib.hashInnerJoin),
    hashLeftOuterJoin: joinWrapper(lib.hashLeftOuterJoin),
    hashLeftSemiJoin: joinWrapper(lib.hashLeftSemiJoin),
    hashLeftAntiJoin: joinWrapper(lib.hashLeftAntiJoin),
    hashRightOuterJoin: joinWrapper(lib.hashRightOuterJoin),
    hashRightSemiJoin: joinWrapper(lib.hashRightSemiJoin),
    hashRightAntiJoin: joinWrapper(lib.hashRightAntiJoin),
    sortedMergeFullOuterJoin: joinWrapper(lib.sortedMergeFullOuterJoin),
    sortedMergeInnerJoin: joinWrapper(lib.sortedMergeInnerJoin),
    sortedMergeLeftOuterJoin: joinWrapper(lib.sortedMergeLeftOuterJoin),
    sortedMergeLeftSemiJoin: joinWrapper(lib.sortedMergeLeftSemiJoin),
    sortedMergeLeftAntiJoin: joinWrapper(lib.sortedMergeLeftAntiJoin),
    sortedMergeRightOuterJoin: joinWrapper(lib.sortedMergeRightOuterJoin),
    sortedMergeRightSemiJoin: joinWrapper(lib.sortedMergeRightSemiJoin),
    sortedMergeRightAntiJoin: joinWrapper(lib.sortedMergeRightAntiJoin),
    nestedLoopFullOuterJoin: joinWrapper(lib.nestedLoopFullOuterJoin),
    nestedLoopInnerJoin: joinWrapper(lib.nestedLoopInnerJoin),
    nestedLoopLeftOuterJoin: joinWrapper(lib.nestedLoopLeftOuterJoin),
    nestedLoopLeftSemiJoin: joinWrapper(lib.nestedLoopLeftSemiJoin),
    nestedLoopLeftAntiJoin: joinWrapper(lib.nestedLoopLeftAntiJoin),
    nestedLoopRightOuterJoin: joinWrapper(lib.nestedLoopRightOuterJoin),
    nestedLoopRightSemiJoin: joinWrapper(lib.nestedLoopRightSemiJoin),
    nestedLoopRightAntiJoin: joinWrapper(lib.nestedLoopRightAntiJoin)
});
export default _;
