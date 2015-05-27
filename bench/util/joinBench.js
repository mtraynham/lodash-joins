import {generateRandomObjectArray} from './random';

/**
 * Generate a join bench test
 * @param  {String} name
 * @param  {Integer} size
 * @param  {HashJoin} hashJoin
 * @param  {SortedMergeJoin} sortedMergeJoin
 * @param  {NestedLoopJoin} nestedLoopJoin
 * @return {BenchmarkSuite}
 */
export default function joinBench (name, size, hashJoin, sortedMergeJoin, nestedLoopJoin) {
    var spec = [
            {
                field: 'id',
                type: 'string',
                domain: ['a', 'e', 'i', 'o', 'u', 'y'],
                length: 1
            }
        ],
        left = generateRandomObjectArray(spec, size),
        right = generateRandomObjectArray(spec, size),
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
