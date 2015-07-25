import nestedLoopLeftSemiJoin from './nestedLoopLeftSemiJoin';

/**
 * Nested loop right semi join
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function nestedLoopRightSemiJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftSemiJoin(b, bAccessor, a, aAccessor);
}
