import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import {Accessor, Merger} from '../typings';
import {mergeLists, yieldRightSubList, Sublist} from './util';

/**
 * Sorted merge left outer join.  Returns a new array.
 */
export default function sortedMergeFullOuterJoin<LeftRow, RightRow, Key, MergeResult>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>,
    merger: Merger<LeftRow | undefined, RightRow | undefined, MergeResult>
): MergeResult[] {
    if (a.length < 1 || b.length < 1) {
        return [
            ...a.map((a: LeftRow) => merger(a, undefined)),
            ...b.map((b: RightRow) => merger(undefined, b))
        ];
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
            rows = map(aDatums.rows, (aDatum: LeftRow) => merger(aDatum, undefined)).concat(rows);
            aDatums = aGenerator.next().value;
        } else if (aDatums.key < bDatums.key) {
            rows = map(bDatums.rows, (bDatum: RightRow) => merger(undefined, bDatum)).concat(rows);
            bDatums = bGenerator.next().value;
        } else {
            rows = mergeLists(aDatums.rows, bDatums.rows, merger).concat(rows);
            aDatums = aGenerator.next().value;
            bDatums = bGenerator.next().value;
        }
    }
    while (bDatums) {
        rows = map(bDatums.rows, (bDatum: RightRow) => merger(undefined, bDatum)).concat(rows);
        bDatums = bGenerator.next().value;
    }
    while (aDatums) {
        rows = map(aDatums.rows, (aDatum: LeftRow) => merger(aDatum, undefined)).concat(rows);
        aDatums = aGenerator.next().value;
    }
    return rows;
}
