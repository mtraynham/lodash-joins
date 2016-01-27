import Chance from 'chance';

/**
 * Generate a join bench test.
 *
 * @param  {String} name
 * @param  {Number} size
 * @param  {Function} hashJoin
 * @param  {Function} sortedMergeJoin
 * @param  {Function} nestedLoopJoin
 * @return {BenchmarkSuite}
 */
export default function joinBench (name, size, hashJoin, sortedMergeJoin, nestedLoopJoin) {
    let chance = new Chance();
    chance.mixin({'row': () => { return {'id': chance.character({pool: 'aeiouy'})}; }});
    let left = chance.n(chance.row, size),
        right = chance.n(chance.row, size),
        accessor = (obj) => obj.id;
    return {
        name: name,
        tests: {
            'Hash Join': () => hashJoin(left, accessor, right, accessor),
            'Sorted Merge Join': () => sortedMergeJoin(left, accessor, right, accessor),
            'Nested Loop Join': () => nestedLoopJoin(left, accessor, right, accessor)
        }
    };
}
