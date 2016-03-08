import hashLeftOuterJoin from './hashLeftOuterJoin';

/**
 * Hash right outer join
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function hashRightOuterJoin (a, aAccessor, b, bAccessor) {
    return hashLeftOuterJoin(b, bAccessor, a, aAccessor);
}
