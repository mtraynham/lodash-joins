import sortBy from 'lodash/sortBy';

import {Accessor} from '../typings';
import {isUndefined} from './util';

/**
 * Sorted merge left semi join.  Returns a new array.
 */
export default function sortedMergeLeftSemiJoin<LeftRow, RightRow, Key>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>
): LeftRow[] {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    const aSorted: LeftRow[] = sortBy(a, aAccessor),
        bSorted: RightRow[] = sortBy(b, bAccessor),
        rows: LeftRow[] = [];
    let aDatum: LeftRow = aSorted.pop(),
        bDatum: RightRow = bSorted.pop(),
        aKey: Key = aAccessor(aDatum),
        bKey: Key = bAccessor(bDatum);
    while (aDatum && bDatum) {
        if (aKey > bKey) {
            aKey = isUndefined(aDatum = aSorted.pop(), aAccessor);
        } else if (aKey < bKey) {
            bKey = isUndefined(bDatum = bSorted.pop(), bAccessor);
        } else {
            rows.unshift(aDatum);
            aKey = isUndefined(aDatum = aSorted.pop(), aAccessor);
        }
    }
    return rows;
}
