import filter from 'lodash/filter';
import has from 'lodash/has';
import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';

import {Accessor, Merger} from '../typings';

/**
 * Nested loop left outer join
 */
export default function nestedLoopLeftOuterJoin<LeftRow, RightRow, Key, MergeResult>(
    a: LeftRow[],
    aAccessor: Accessor<LeftRow, Key>,
    b: RightRow[],
    bAccessor: Accessor<RightRow, Key>,
    merger: Merger<LeftRow, RightRow | undefined, MergeResult>
): MergeResult[] {
    if (a.length < 1 || b.length < 1) {
        return map(a, (a: LeftRow) => merger(a, undefined));
    }
    let key: Key,
        otherKey: Key,
        tmpLength: number,
        output: MergeResult[];
    if (a.length < b.length) {
        return reduceRight(a, (previous: MergeResult[], aDatum: LeftRow) => {
            key = aAccessor(aDatum);
            tmpLength = previous.length;
            output = reduceRight(b, (oPrevious: MergeResult[], bDatum: RightRow) => {
                otherKey = bAccessor(bDatum);
                if (key <= otherKey && key >= otherKey) {
                    oPrevious.unshift(merger(aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
            if (tmpLength === output.length) {
                output.unshift(merger(aDatum, undefined));
            }
            return output;
        }, []);
    }
    const seen: {[index: number]: boolean} = {};
    return reduceRight(b, (previous: MergeResult[], bDatum: RightRow) => {
        key = bAccessor(bDatum);
        return reduceRight(a, (oPrevious: MergeResult[], aDatum: LeftRow, aIndex: number) => {
            otherKey = aAccessor(aDatum);
            if (key <= otherKey && key >= otherKey) {
                seen[aIndex] = true;
                oPrevious.unshift(merger(aDatum, bDatum));
            }
            return oPrevious;
        }, []).concat(previous);
    }, []).concat(
        map(
            filter(a, (aDatum: LeftRow, aIndex: number) => !has(seen, aIndex)),
            (aDatum: LeftRow) => merger(aDatum, undefined)));
}
