import hashLeftAntiJoin from './hashLeftAntiJoin';

import {Accessor} from '../typings';

/**
 * Hash right anti join
 */
export default function hashRightAntiJoin<LeftRow, RightRow, Key>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>
): RightRow[] {
    return hashLeftAntiJoin(b, bAccessor, a, aAccessor);
}
