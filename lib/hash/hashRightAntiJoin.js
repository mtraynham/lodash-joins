import hashLeftAntiJoin from './hashLeftAntiJoin';

/**
 * Hash right anti join
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function hashRightAntiJoin (a, aAccessor, b, bAccessor) {
    return hashLeftAntiJoin(b, bAccessor, a, aAccessor);
}
