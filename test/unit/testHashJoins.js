import {assert} from 'chai';
import hashFullOuterJoin from '../../lib/hash/hashFullOuterJoin';
import hashInnerJoin from '../../lib/hash/hashInnerJoin';
import hashLeftAntiJoin from '../../lib/hash/hashLeftAntiJoin';
import hashLeftOuterJoin from '../../lib/hash/hashLeftOuterJoin';
import hashLeftSemiJoin from '../../lib/hash/hashLeftSemiJoin';
import hashRightAntiJoin from '../../lib/hash/hashRightAntiJoin';
import hashRightOuterJoin from '../../lib/hash/hashRightOuterJoin';
import hashRightSemiJoin from '../../lib/hash/hashRightSemiJoin';

describe('Hash Joins', () => {
    let left = [
            {id: 'c', left: 0},
            {id: 'c', left: 1},
            {id: 'e', left: 2},
        ],
        right = [
            {id: 'a', right: 0},
            {id: 'b', right: 1},
            {id: 'c', right: 2},
            {id: 'c', right: 3},
            {id: 'd', right: 4},
            {id: 'f', right: 5},
            {id: 'g', right: 6}
        ],
        accessor = (obj) => obj['id'];
    describe('#hashFullOuterJoin()', () => {
        let expectedA = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 3},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6},
                {id: 'e', left: 2}
            ],
            expectedB = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'c', right: 2, left: 0},
                {id: 'c', right: 2, left: 1},
                {id: 'c', right: 3, left: 0},
                {id: 'c', right: 3, left: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6},
                {id: 'e', left: 2}
            ],
            resultA = hashFullOuterJoin(left, accessor, right, accessor),
            resultB = hashFullOuterJoin(right, accessor, left, accessor);
        it('should return 10 rows if parent is left', () =>
            assert.lengthOf(resultA, 10));
        it('should match the expected output if parent is left', () =>
            assert.deepEqual(resultA, expectedA));
        it('should return 8 rows if parent is right', () =>
            assert.lengthOf(resultB, 10));
        it('should match the expected output if parent is right', () =>
            assert.deepEqual(resultB, expectedB));
    });
    describe('#hashInnerJoin()', () => {
        let expectedA = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 3}
            ],
            expectedB = [
                {id: 'c', right: 2, left: 0},
                {id: 'c', right: 2, left: 1},
                {id: 'c', right: 3, left: 0},
                {id: 'c', right: 3, left: 1}
            ],
            resultA = hashInnerJoin(left, accessor, right, accessor),
            resultB = hashInnerJoin(right, accessor, left, accessor);
        it('should return 5 rows if parent is left', () =>
            assert.lengthOf(resultA, 4));
        it('should match the expected output if parent is left', () =>
            assert.deepEqual(resultA, expectedA));
        it('should return 5 rows if parent is right', () =>
            assert.lengthOf(resultB, 4));
        it('should match the expected output if parent is right', () =>
            assert.deepEqual(resultB, expectedB));
    });
    describe('#hashLeftAntiJoin()', () => {
        let expected = [
                {id: 'e', left: 2}
            ],
            result = hashLeftAntiJoin(left, accessor, right, accessor);
        it('should return 1 rows', () =>
            assert.lengthOf(result, 1));
        it('should match the expected output', () =>
            assert.deepEqual(result, expected));
    });
    describe('#hashLeftOuterJoin()', () => {
        let expected = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2}
            ],
            result = hashLeftOuterJoin(left, accessor, right, accessor);
        it('should return 5 rows', () =>
            assert.lengthOf(result, 5));
        it('should match the expected output', () =>
            assert.deepEqual(result, expected));
    });
    describe('#hashLeftSemiJoin()', () => {
        let expected = [
                {id: 'c', left: 0},
                {id: 'c', left: 1}
            ],
            result = hashLeftSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', () =>
            assert.lengthOf(result, 2));
        it('should match the expected output', () =>
            assert.deepEqual(result, expected));
    });
    describe('#hashRightAntiJoin()', () => {
        let expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = hashRightAntiJoin(left, accessor, right, accessor);
        it('should return 5 rows', () =>
            assert.lengthOf(result, 5));
        it('should match the expected output', () =>
            assert.deepEqual(result, expected));
        it('should match the left anti join with right as the parent', () =>
            assert.deepEqual(hashLeftAntiJoin(right, accessor, left, accessor), result));
    });
    describe('#hashRightOuterJoin()', () => {
        let expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'c', right: 2, left: 0},
                {id: 'c', right: 2, left: 1},
                {id: 'c', right: 3, left: 0},
                {id: 'c', right: 3, left: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = hashRightOuterJoin(left, accessor, right, accessor);
        it('should return 9 rows', () =>
            assert.lengthOf(result, 9));
        it('should match the expected output', () =>
            assert.deepEqual(result, expected));
        it('should match the left outer join with right as the parent', () =>
            assert.deepEqual(hashLeftOuterJoin(right, accessor, left, accessor), result));
    });
    describe('#hashRightSemiJoin()', () => {
        let expected = [
                {id: 'c', right: 2},
                {id: 'c', right: 3}
            ],
            result = hashRightSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', () =>
            assert.lengthOf(result, 2));
        it('should match the expected output', () =>
            assert.deepEqual(result, expected));
        it('should match the left semi join with right as the parent', () =>
            assert.deepEqual(hashLeftSemiJoin(right, accessor, left, accessor), result));
    });
});
