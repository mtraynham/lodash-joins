import sortedMergeLeftOuterJoin from './sortedMergeLeftOuterJoin';

/**
 * Sorted merge right outer join.  Returns the b-array reference.
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function sortedMergeRightOuterJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftOuterJoin(b, bAccessor, a, aAccessor);
}
