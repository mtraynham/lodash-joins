import hashLeftSemiJoin from './hashLeftSemiJoin';

/**
 * Hash right semi join
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function hashRightSemiJoin (a, aAccessor, b, bAccessor) {
    return hashLeftSemiJoin(b, bAccessor, a, aAccessor);
}
