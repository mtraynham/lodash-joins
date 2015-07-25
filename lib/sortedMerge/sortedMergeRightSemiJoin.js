import sortedMergeLeftSemiJoin from './sortedMergeLeftSemiJoin';

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function sortedMergeRightSemiJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftSemiJoin(b, bAccessor, a, aAccessor);
}
