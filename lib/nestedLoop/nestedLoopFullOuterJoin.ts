import filter from 'lodash/filter';
import has from 'lodash/has';
import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';

import {Accessor, Merger} from '../typings';

/**
 * Nested loop left semi join
 */
export default function nestedLoopFullOuterJoin<LeftRow, RightRow, Key, MergeResult>(
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
    const seen: {[index: number]: boolean} = {};
    let key: Key,
        otherKey: Key,
        tmpLength: number,
        output: MergeResult[];
    if (a.length < b.length) {
        return reduceRight(a, (previous: MergeResult[], aDatum: LeftRow) => {
            key = aAccessor(aDatum);
            tmpLength = previous.length;
            output = reduceRight(b, (oPrevious: MergeResult[], bDatum: RightRow, bIndex: number) => {
                otherKey = bAccessor(bDatum);
                if (key <= otherKey && key >= otherKey) {
                    seen[bIndex] = true;
                    oPrevious.unshift(merger(aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
            if (tmpLength === output.length) {
                output.unshift(merger(aDatum, undefined));
            }
            return output;
        }, []).concat(
            map(
                filter(b, (bDatum: RightRow, bIndex: number) => !has(seen, bIndex)),
                (bDatum: RightRow) => merger(undefined, bDatum)));
    }
    return reduceRight(b, (previous: MergeResult[], bDatum: RightRow) => {
        key = bAccessor(bDatum);
        tmpLength = previous.length;
        output = reduceRight(a, (oPrevious: MergeResult[], aDatum: LeftRow, aIndex: number) => {
            otherKey = aAccessor(aDatum);
            if (key <= otherKey && key >= otherKey) {
                seen[aIndex] = true;
                oPrevious.unshift(merger(aDatum, bDatum));
            }
            return oPrevious;
        }, []).concat(previous);
        if (tmpLength === output.length) {
            output.unshift(merger(undefined, bDatum));
        }
        return output;
    }, []).concat(
        map(
            filter(a, (aDatum: LeftRow, aIndex: number) => !has(seen, aIndex)),
            (aDatum: LeftRow) => merger(aDatum, undefined)));
}
