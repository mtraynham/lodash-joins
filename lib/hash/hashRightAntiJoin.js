import hashLeftAntiJoin from './hashLeftAntiJoin';

/**
 * Hash right anti join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashRightAntiJoin (a, aAccessor, b, bAccessor) {
    return hashLeftAntiJoin(b, bAccessor, a, aAccessor);
}
