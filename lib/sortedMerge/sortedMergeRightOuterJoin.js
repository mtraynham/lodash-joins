import sortedMergeLeftOuterJoin from './sortedMergeLeftOuterJoin';

/**
 * Sorted merge right outer join.  Returns the b-array reference.
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function sortedMergeRightOuterJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftOuterJoin(b, bAccessor, a, aAccessor);
}
