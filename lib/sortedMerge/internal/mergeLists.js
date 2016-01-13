import assign from 'lodash/object/assign';
import reduceRight from 'lodash/collection/reduceRight';

/**
 * Merge two lists into one
 *
 * @param {Object[]} aDatumsR
 * @param {Object[]} bDatumsR
 * @returns {Object[]}
 */
export default function mergeLists (aDatumsR, bDatumsR) {
    return reduceRight(aDatumsR, (previous, datum) => {
        return reduceRight(bDatumsR, (prev, cDatum) => {
            prev.unshift(assign({}, datum, cDatum));
            return prev;
        }, []).concat(previous);
    }, []);
}
