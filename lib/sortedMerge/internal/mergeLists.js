import assign from 'lodash/assign';
import reduceRight from 'lodash/reduceRight';

/**
 * Merge two lists into one
 * @param {Array<Object>} aDatumsR
 * @param {Array<Object>} bDatumsR
 * @returns {Array<Object>}
 */
export default function mergeLists (aDatumsR, bDatumsR) {
    return reduceRight(aDatumsR, (previous, datum) => {
        return reduceRight(bDatumsR, (prev, cDatum) => {
            prev.unshift(assign({}, datum, cDatum));
            return prev;
        }, []).concat(previous);
    }, []);
}
