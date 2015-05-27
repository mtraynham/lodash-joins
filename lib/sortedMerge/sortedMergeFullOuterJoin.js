import {assign, reduceRight, sortBy} from 'lodash';
import yieldRightSubList from '../util/yieldRightSubList';

/**
 * Sorted merge left outer join.  Returns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function sortedMergeLeftOuterJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
    let r = [],
        aGenerator = yieldRightSubList(a, aAccessor),
        aDatums = aGenerator.next().value,
        bGenerator = yieldRightSubList(b, bAccessor),
        bDatums = bGenerator.next().value;
    while (aDatums && bDatums) {
        if (aDatums.val > bDatums.val) {
            r = aDatums.r.concat(r);
            aDatums = aGenerator.next().value;
        } else if (aDatums.val < bDatums.val) {
            r = bDatums.r.concat(r);
            bDatums = bGenerator.next().value;
        } else {
            r = reduceRight(aDatums.r, (orevious, datum) => {
                return reduceRight(bDatums.r, (prev, cDatum) => {
                    prev.unshift(assign({}, datum, cDatum));
                    return prev;
                }, []).concat(orevious);
            }, []).concat(r);
            aDatums = aGenerator.next().value;
            bDatums = bGenerator.next().value;
        }
    }
    if (bDatums) {
        do {
            r = bDatums.r.concat(r);
        } while ((bDatums = bGenerator.next().value));
    }
    if (aDatums) {
        do {
            r = aDatums.r.concat(r);
        } while ((aDatums = aGenerator.next().value));
    }
    return r;
}
