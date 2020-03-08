import nestedLoopLeftOuterJoin from './nestedLoopLeftOuterJoin';

import {Accessor, Merger} from '../typings';

/**
 * Nested loop right outer join
 */
export default function nestedLoopRightOuterJoin<LeftRow, RightRow, Key, MergeResult>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>,
    merger: Merger<RightRow, LeftRow, MergeResult>
): MergeResult[] {
    return nestedLoopLeftOuterJoin(b, bAccessor, a, aAccessor, merger);
}
