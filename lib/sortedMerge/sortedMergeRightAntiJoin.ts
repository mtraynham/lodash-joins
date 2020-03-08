import sortedMergeLeftAntiJoin from './sortedMergeLeftAntiJoin';

import {Accessor} from '../typings';

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 */
export default function sortedMergeRightAntiJoin<LeftRow, RightRow, Key>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>
): RightRow[] {
    return sortedMergeLeftAntiJoin(b, bAccessor, a, aAccessor);
}
