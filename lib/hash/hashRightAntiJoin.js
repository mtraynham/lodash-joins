import hashLeftAntiJoin from './hashLeftAntiJoin';

/**
 * Hash right anti join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
export default function hashRightAntiJoin (a, aAccessor, b, bAccessor) {
    return hashLeftAntiJoin(b, bAccessor, a, aAccessor);
}
