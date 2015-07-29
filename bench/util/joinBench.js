import {generateRandomObjectArray} from './random';

/**
 * Generate a join bench test
 * @param  {String} name
 * @param  {Number} size
 * @param  {Function} hashJoin
 * @param  {Function} sortedMergeJoin
 * @param  {Function} nestedLoopJoin
 * @return {BenchmarkSuite}
 */
export default function joinBench (name, size, hashJoin, sortedMergeJoin, nestedLoopJoin) {
    let spec = [
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
