import sortedMergeLeftAntiJoin from './sortedMergeLeftAntiJoin';

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function sortedMergeRightAntiJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftAntiJoin(b, bAccessor, a, aAccessor);
}
