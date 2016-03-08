import nestedLoopLeftSemiJoin from './nestedLoopLeftSemiJoin';

/**
 * Nested loop right semi join
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function nestedLoopRightSemiJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftSemiJoin(b, bAccessor, a, aAccessor);
}
