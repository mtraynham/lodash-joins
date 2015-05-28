import nestedLoopLeftSemiJoin from './nestedLoopLeftSemiJoin';

/**
 * Nested loop right semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopRightSemiJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftSemiJoin(b, bAccessor, a, aAccessor);
}
