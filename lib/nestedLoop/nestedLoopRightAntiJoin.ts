import nestedLoopLeftAntiJoin from './nestedLoopLeftAntiJoin';

import {Accessor} from '../typings';

/**
 * Nested loop right outer join
 */
export default function nestedLoopRightAntiJoin<LeftRow, RightRow, Key>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>
): RightRow[] {
    return nestedLoopLeftAntiJoin(b, bAccessor, a, aAccessor);
}
