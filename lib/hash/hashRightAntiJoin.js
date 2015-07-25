import hashLeftAntiJoin from './hashLeftAntiJoin';

/**
 * Hash right anti join
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function hashRightAntiJoin (a, aAccessor, b, bAccessor) {
    return hashLeftAntiJoin(b, bAccessor, a, aAccessor);
}
