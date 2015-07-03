import {assign, filter, has, reduceRight} from 'lodash';

/**
 * Nested loop left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopLeftOuterJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    let value,
        otherValue;
    if (a.length < b.length) {
        let tmpLength;
        return reduceRight(a, (previous, aDatum) => {
            value = aAccessor(aDatum);
            tmpLength = previous.length;
            previous = reduceRight(b, (oPrevious, bDatum) => {
                otherValue = bAccessor(bDatum);
                if (value <= otherValue && value >= otherValue) {
                    oPrevious.unshift(assign({}, aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
            if (tmpLength === previous.length) {
                previous.unshift(aDatum);
            }
            return previous;
        }, []);
    } else {
        let seen = {};
        return reduceRight(b, (previous, bDatum) => {
            value = bAccessor(bDatum);
            return reduceRight(a, (oPrevious, aDatum, aIndex) => {
                otherValue = aAccessor(aDatum);
                if (value <= otherValue && value >= otherValue) {
                    seen[aIndex] = true;
                    oPrevious.unshift(assign({}, aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
        }, []).concat(filter(a, (aDatum, aIndex) => !has(seen, aIndex)));
    }
}
