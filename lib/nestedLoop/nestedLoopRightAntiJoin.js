import nestedLoopLeftAntiJoin from './nestedLoopLeftAntiJoin';

/**
 * Nested loop right outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopRightAntiJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftAntiJoin(b, bAccessor, a, aAccessor);
}
