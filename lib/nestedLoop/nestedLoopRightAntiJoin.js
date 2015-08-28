import nestedLoopLeftAntiJoin from './nestedLoopLeftAntiJoin';

/**
 * Nested loop right outer join
 *
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function nestedLoopRightAntiJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftAntiJoin(b, bAccessor, a, aAccessor);
}
