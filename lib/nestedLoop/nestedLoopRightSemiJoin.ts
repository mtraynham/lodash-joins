import nestedLoopLeftSemiJoin from './nestedLoopLeftSemiJoin';

import {Accessor} from '../typings';

/**
 * Nested loop right semi join
 */
export default function nestedLoopRightSemiJoin<LeftRow, RightRow, Key>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>
): RightRow[] {
    return nestedLoopLeftSemiJoin(b, bAccessor, a, aAccessor);
}
