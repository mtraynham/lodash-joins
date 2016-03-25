import nestedLoopLeftSemiJoin from './nestedLoopLeftSemiJoin';

/**
 * Nested loop right semi join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
export default function nestedLoopRightSemiJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftSemiJoin(b, bAccessor, a, aAccessor);
}
