import sortedMergeLeftAntiJoin from './sortedMergeLeftAntiJoin';

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function sortedMergeRightAntiJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftAntiJoin(b, bAccessor, a, aAccessor);
}
