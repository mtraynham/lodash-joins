import nestedLoopLeftOuterJoin from './nestedLoopLeftOuterJoin';

/**
 * Nested loop right outer join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function nestedLoopRightOuterJoin (a, aAccessor, b, bAccessor, merger) {
    return nestedLoopLeftOuterJoin(b, bAccessor, a, aAccessor, merger);
}
