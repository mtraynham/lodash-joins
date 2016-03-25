import hashLeftSemiJoin from './hashLeftSemiJoin';

/**
 * Hash right semi join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
export default function hashRightSemiJoin (a, aAccessor, b, bAccessor) {
    return hashLeftSemiJoin(b, bAccessor, a, aAccessor);
}
