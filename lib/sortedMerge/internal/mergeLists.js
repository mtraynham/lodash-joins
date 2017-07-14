import reduceRight from 'lodash/reduceRight';

/**
 * Merge two lists into one
 * @param {Array<Object>} aDatumsR
 * @param {Array<Object>} bDatumsR
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function mergeLists (aDatumsR, bDatumsR, merger) {
    return reduceRight(aDatumsR, (previous, datum) =>
        reduceRight(bDatumsR, (prev, cDatum) => {
            prev.unshift(merger(datum, cDatum));
            return prev;
        }, []).concat(previous), []);
}
