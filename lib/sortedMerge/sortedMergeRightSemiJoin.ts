import sortedMergeLeftSemiJoin from './sortedMergeLeftSemiJoin';

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @returns {Array<Object>}
 */
export default function sortedMergeRightSemiJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftSemiJoin(b, bAccessor, a, aAccessor);
}
