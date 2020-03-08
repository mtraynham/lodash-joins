import filter from 'lodash/filter';
import some from 'lodash/some';

import {Accessor} from '../typings';

/**
 * Nested loop left semi join
 */
export default function hashLeftSemiJoin<LeftRow, RightRow, Key>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>
): LeftRow[] {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    let key: Key,
        otherKey: Key;
    return filter(a, (aDatum: LeftRow) => {
        key = aAccessor(aDatum);
        return some(b, (bDatum: RightRow) => {
            otherKey = bAccessor(bDatum);
            return key <= otherKey && key >= otherKey;
        });
    });
}
