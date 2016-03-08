import nestedLoopLeftOuterJoin from './nestedLoopLeftOuterJoin';

/**
 * Nested loop right outer join
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function nestedLoopRightOuterJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftOuterJoin(b, bAccessor, a, aAccessor);
}
