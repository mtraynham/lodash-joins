import hashLeftOuterJoin from './hashLeftOuterJoin';

/**
 * Hash right outer join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
export default function hashRightOuterJoin (a, aAccessor, b, bAccessor) {
    return hashLeftOuterJoin(b, bAccessor, a, aAccessor);
}
