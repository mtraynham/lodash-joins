import Chance from 'chance';

/**
 * Generate a join bench test.
 *
 * @param  {String} name
 * @param  {Number} size
 * @param  {Function} hashJoin
 * @param  {Function} sortedMergeJoin
 * @param  {Function} nestedLoopJoin
 * @returns {Benchmark.Suite}
 */
export default function joinBench (name, size, hashJoin, sortedMergeJoin, nestedLoopJoin) {
    const chance = new Chance();
    chance.mixin({row: () => ({id: chance.character({pool: 'aeiouy'})})});
    const left = chance.n(chance.row, size),
        right = chance.n(chance.row, size),
        accessor = obj => obj.id;
    return {
        name,
        tests: {
            'Hash Join': () => hashJoin(left, accessor, right, accessor),
            'Sorted Merge Join': () => sortedMergeJoin(left, accessor, right, accessor),
            'Nested Loop Join': () => nestedLoopJoin(left, accessor, right, accessor)
        }
    };
}
