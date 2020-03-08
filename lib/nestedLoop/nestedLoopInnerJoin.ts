import reduceRight from 'lodash/reduceRight';

import {Accessor, Merger} from '../typings';

/**
 * Nested loop inner join
 */
export default function nestedLoopInnerJoin<LeftRow, RightRow, Key, MergeResult>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>,
    merger: Merger<LeftRow, RightRow, MergeResult>
): MergeResult[] {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    let key: Key,
        otherKey: Key;
    if (a.length < b.length) {
        return reduceRight(a, (previous: MergeResult[], aDatum: LeftRow) => {
            key = aAccessor(aDatum);
            return reduceRight(b, (oPrevious: MergeResult[], bDatum: RightRow) => {
                otherKey = bAccessor(bDatum);
                if (key <= otherKey && key >= otherKey) {
                    oPrevious.unshift(merger(aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
        }, []);
    }
    return reduceRight(b, (previous: MergeResult[], bDatum: RightRow) => {
        key = bAccessor(bDatum);
        return reduceRight(a, (oPrevious: MergeResult[], aDatum: LeftRow) => {
            otherKey = aAccessor(aDatum);
            if (key <= otherKey && key >= otherKey) {
                oPrevious.unshift(merger(aDatum, bDatum));
            }
            return oPrevious;
        }, []).concat(previous);
    }, []);
}
