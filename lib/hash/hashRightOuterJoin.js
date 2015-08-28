import hashLeftOuterJoin from './hashLeftOuterJoin';

/**
 * Hash right outer join
 *
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function hashRightOuterJoin (a, aAccessor, b, bAccessor) {
    return hashLeftOuterJoin(b, bAccessor, a, aAccessor);
}
