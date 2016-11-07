import sortedMergeLeftAntiJoin from './sortedMergeLeftAntiJoin';

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @returns {Array<Object>}
 */
export default function sortedMergeRightAntiJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftAntiJoin(b, bAccessor, a, aAccessor);
}
