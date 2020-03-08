import sortedMergeLeftOuterJoin from './sortedMergeLeftOuterJoin';

import {Accessor, Merger} from '../typings';

/**
 * Sorted merge right outer join.  Returns the b-array reference.
 */
export default function sortedMergeRightOuterJoin<LeftRow, RightRow, Key, MergeResult>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>,
    merger: Merger<RightRow, LeftRow, MergeResult>
): MergeResult[] {
    return sortedMergeLeftOuterJoin(b, bAccessor, a, aAccessor, merger);
}
