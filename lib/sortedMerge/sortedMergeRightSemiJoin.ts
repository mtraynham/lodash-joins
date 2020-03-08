import sortedMergeLeftSemiJoin from './sortedMergeLeftSemiJoin';

import {Accessor} from '../typings';

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 */
export default function sortedMergeRightSemiJoin<LeftRow, RightRow, Key>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>
): RightRow[] {
    return sortedMergeLeftSemiJoin(b, bAccessor, a, aAccessor);
}
