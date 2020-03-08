import hashLeftOuterJoin from './hashLeftOuterJoin';

import {Accessor, Merger} from '../typings';

/**
 * Hash right outer join
 */
export default function hashRightOuterJoin<LeftRow, RightRow, Key, MergeResult>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>,
    merger: Merger<RightRow, LeftRow, MergeResult>
): MergeResult[] {
    return hashLeftOuterJoin(b, bAccessor, a, aAccessor, merger);
}
