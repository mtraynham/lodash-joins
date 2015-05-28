import nestedLoopLeftOuterJoin from './nestedLoopLeftOuterJoin';

/**
 * Nested loop right outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopRightOuterJoin (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftOuterJoin(b, bAccessor, a, aAccessor);
}
