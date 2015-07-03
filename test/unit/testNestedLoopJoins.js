import {assert} from 'chai';
import nestedLoopFullOuterJoin from '../../lib/nestedLoop/nestedLoopFullOuterJoin';
import nestedLoopInnerJoin from '../../lib/nestedLoop/nestedLoopInnerJoin';
import nestedLoopLeftAntiJoin from '../../lib/nestedLoop/nestedLoopLeftAntiJoin';
import nestedLoopLeftOuterJoin from '../../lib/nestedLoop/nestedLoopLeftOuterJoin';
import nestedLoopLeftSemiJoin from '../../lib/nestedLoop/nestedLoopLeftSemiJoin';
import nestedLoopRightAntiJoin from '../../lib/nestedLoop/nestedLoopRightAntiJoin';
import nestedLoopRightOuterJoin from '../../lib/nestedLoop/nestedLoopRightOuterJoin';
import nestedLoopRightSemiJoin from '../../lib/nestedLoop/nestedLoopRightSemiJoin';

describe('Nested Loop Joins', () => {
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
    describe('#nestedLoopFullOuterJoin()', () => {
        let expectedA = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2},
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            expectedB = [
                {id: 'c', right: 2, left: 0},
                {id: 'c', right: 3, left: 0},
                {id: 'c', right: 2, left: 1},
                {id: 'c', right: 3, left: 1},
                {id: 'e', left: 2},
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            resultA = nestedLoopFullOuterJoin(left, accessor, right, accessor),
            resultB = nestedLoopFullOuterJoin(right, accessor, left, accessor);
        it('should return 10 rows if parent is left', () =>
            assert.equal(10, resultA.length));
        it('should match the expected output if parent is left', () =>
            assert.deepEqual(expectedA, resultA));
        it('should return 8 rows if parent is right', () =>
            assert.equal(10, resultB.length));
        it('should match the expected output if parent is right', () =>
            assert.deepEqual(expectedB, resultB));
    });
    describe('#nestedLoopInnerJoin()', () => {
        let expectedA = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3}
            ],
            expectedB = [
                {id: 'c', right: 2, left: 0},
                {id: 'c', right: 3, left: 0},
                {id: 'c', right: 2, left: 1},
                {id: 'c', right: 3, left: 1}
            ],
            resultA = nestedLoopInnerJoin(left, accessor, right, accessor),
            resultB = nestedLoopInnerJoin(right, accessor, left, accessor);
        it('should return 5 rows if parent is left', () =>
            assert.equal(4, resultA.length));
        it('should match the expected output if parent is left', () =>
            assert.deepEqual(expectedA, resultA));
        it('should return 5 rows if parent is right', () =>
            assert.equal(4, resultB.length));
        it('should match the expected output if parent is right', () =>
            assert.deepEqual(expectedB, resultB));
    });
    describe('#nestedLoopLeftAntiJoin()', () => {
        let expected = [
                {id: 'e', left: 2}
            ],
            result = nestedLoopLeftAntiJoin(left, accessor, right, accessor);
        it('should return 1 rows', () =>
            assert.equal(1, result.length));
        it('should match the expected output', () =>
            assert.deepEqual(expected, result));
    });
    describe('#nestedLoopLeftOuterJoin()', () => {
        let expected = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2}
            ],
            result = nestedLoopLeftOuterJoin(left, accessor, right, accessor);
        it('should return 5 rows', () =>
            assert.equal(5, result.length));
        it('should match the expected output', () =>
            assert.deepEqual(expected, result));
    });
    describe('#nestedLoopLeftSemiJoin()', () => {
        let expected = [
                {id: 'c', left: 0},
                {id: 'c', left: 1}
            ],
            result = nestedLoopLeftSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', () =>
            assert.equal(2, result.length));
        it('should match the expected output', () =>
            assert.deepEqual(expected, result));
    });
    describe('#nestedLoopRightAntiJoin()', () => {
        let expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = nestedLoopRightAntiJoin(left, accessor, right, accessor);
        it('should return 5 rows', () =>
            assert.equal(5, result.length));
        it('should match the expected output', () =>
            assert.deepEqual(expected, result));
        it('should match the left anti join with right as the parent', () =>
            assert.deepEqual(result, nestedLoopLeftAntiJoin(right, accessor, left, accessor)));
    });
    describe('#nestedLoopRightOuterJoin()', () => {
        let expected = [
                {id: 'c', right: 2, left: 0},
                {id: 'c', right: 3, left: 0},
                {id: 'c', right: 2, left: 1},
                {id: 'c', right: 3, left: 1},
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = nestedLoopRightOuterJoin(left, accessor, right, accessor);
        it('should return 9 rows', () =>
            assert.equal(9, result.length));
        it('should match the expected output', () =>
            assert.deepEqual(expected, result));
        it('should match the left outer join with right as the parent', () =>
            assert.deepEqual(result, nestedLoopLeftOuterJoin(right, accessor, left, accessor)));
    });
    describe('#nestedLoopRightSemiJoin()', () => {
        let expected = [
                {id: 'c', right: 2},
                {id: 'c', right: 3}
            ],
            result = nestedLoopRightSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', () =>
            assert.equal(2, result.length));
        it('should match the expected output', () =>
            assert.deepEqual(expected, result));
        it('should match the left semi join with right as the parent', () =>
            assert.deepEqual(result, nestedLoopLeftSemiJoin(right, accessor, left, accessor)));
    });
});
