import hashLeftOuterJoin from './hashLeftOuterJoin';

/**
 * Hash right outer join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function hashRightOuterJoin (a, aAccessor, b, bAccessor, merger) {
    return hashLeftOuterJoin(b, bAccessor, a, aAccessor, merger);
}
