import hashLeftSemiJoin from './hashLeftSemiJoin';

import {Accessor} from '../typings';

/**
 * Hash right semi join
 */
export default function hashRightSemiJoin<LeftRow, RightRow, Key>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>
): RightRow[] {
    return hashLeftSemiJoin(b, bAccessor, a, aAccessor);
}
