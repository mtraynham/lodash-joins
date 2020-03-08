import every from 'lodash/every';
import filter from 'lodash/filter';

import {Accessor} from '../typings';

/**
 * Nested loop left anti join
 */
export default function nestedLoopLeftAntiJoin<LeftRow, RightRow, Key>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>
): LeftRow[] {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    let key: Key,
        otherKey: Key;
    return filter(a, (aDatum: LeftRow) => {
        key = aAccessor(aDatum);
        return every(b, (bDatum: RightRow) => {
            otherKey = bAccessor(bDatum);
            return !(key <= otherKey && key >= otherKey);
        });
    });
}
