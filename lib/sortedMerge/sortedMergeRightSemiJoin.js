import sortedMergeLeftSemiJoin from './sortedMergeLeftSemiJoin';

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function sortedMergeRightSemiJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftSemiJoin(b, bAccessor, a, aAccessor);
}
