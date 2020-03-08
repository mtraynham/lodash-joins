import reduceRight from 'lodash/reduceRight';

import {Merger} from '../../typings';

/**
 * Merge two lists into one
 */
export default function mergeLists<LeftRow, RightRow, MergeResult>(
    aDatumsR: LeftRow[],
    bDatumsR: RightRow[],
    merger: Merger<LeftRow, RightRow, MergeResult>
): MergeResult[] {
    return reduceRight(aDatumsR, (previous: MergeResult[], datum: LeftRow) =>
        reduceRight(bDatumsR, (prev: MergeResult[], cDatum: RightRow) => {
            prev.unshift(merger(datum, cDatum));
            return prev;
        }, []).concat(previous), []);
}
