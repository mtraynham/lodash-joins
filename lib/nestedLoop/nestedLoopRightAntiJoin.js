import nestedLoopLeftAntiJoin from './nestedLoopLeftAntiJoin';

/**
 * Nested loop right outer join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
export default function nestedLoopRightAntiJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftAntiJoin(b, bAccessor, a, aAccessor);
}
