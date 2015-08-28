import nestedLoopLeftOuterJoin from './nestedLoopLeftOuterJoin';

/**
 * Nested loop right outer join
 *
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function nestedLoopRightOuterJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftOuterJoin(b, bAccessor, a, aAccessor);
}
