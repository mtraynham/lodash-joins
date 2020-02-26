import sortedMergeLeftOuterJoin from './sortedMergeLeftOuterJoin';

/**
 * Sorted merge right outer join.  Returns the b-array reference.
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function sortedMergeRightOuterJoin (a, aAccessor, b, bAccessor, merger) {
    return sortedMergeLeftOuterJoin(b, bAccessor, a, aAccessor, merger);
}
