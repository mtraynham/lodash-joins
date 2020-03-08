import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import {Accessor, Merger} from '../typings';
import {mergeLists, yieldRightSubList, Sublist} from './util';

/**
 * Sorted merge left outer join.  Returns a new array.
 */
export default function sortedMergeLeftOuterJoin<LeftRow, RightRow, Key, MergeResult>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>,
    merger: Merger<LeftRow, RightRow | undefined, MergeResult>
): MergeResult[] {
    if (a.length < 1 || b.length < 1) {
        return map(a, (a: LeftRow) => merger(a, undefined));
    }
    const aSorted: LeftRow[] = sortBy(a, aAccessor),
        bSorted: RightRow[] = sortBy(b, bAccessor),
        aGenerator: Generator<Sublist<LeftRow, Key>> = yieldRightSubList(aSorted, aAccessor),
        bGenerator: Generator<Sublist<RightRow, Key>> = yieldRightSubList(bSorted, bAccessor);
    let rows: MergeResult[] = [],
        aDatums: Sublist<LeftRow, Key> = aGenerator.next().value,
        bDatums: Sublist<RightRow, Key> = bGenerator.next().value;
    while (aDatums && bDatums) {
        if (aDatums.key > bDatums.key) {
            rows = map(aDatums.rows, aDatum => merger(aDatum, undefined)).concat(rows);
            aDatums = aGenerator.next().value;
        } else if (aDatums.key < bDatums.key) {
            bDatums = bGenerator.next().value;
        } else {
            rows = mergeLists(aDatums.rows, bDatums.rows, merger).concat(rows);
            aDatums = aGenerator.next().value;
            bDatums = bGenerator.next().value;
        }
    }
    while (aDatums) {
        rows = map(aDatums.rows, aDatum => merger(aDatum, undefined)).concat(rows);
        aDatums = aGenerator.next().value;
    }
    return rows;
}
