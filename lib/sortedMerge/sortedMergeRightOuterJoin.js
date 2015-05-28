import sortedMergeLeftOuterJoin from './sortedMergeLeftOuterJoin';

/**
 * Sorted merge right outer join.  Returns the b-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function sortedMergeRightOuterJoin (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftOuterJoin(b, bAccessor, a, aAccessor);
}
