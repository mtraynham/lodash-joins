import nestedLoopLeftOuterJoin from './nestedLoopLeftOuterJoin';

/**
 * Nested loop right outer join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
export default function nestedLoopRightOuterJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftOuterJoin(b, bAccessor, a, aAccessor);
}
