import sortedMergeLeftAntiJoin from './sortedMergeLeftAntiJoin';

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function sortedMergeRightAntiJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftAntiJoin(b, bAccessor, a, aAccessor);
}
