import assert from 'assert';
import sortedMergeFullOuterJoin from '../lib/sortedMerge/sortedMergeFullOuterJoin';
import sortedMergeInnerJoin from '../lib/sortedMerge/sortedMergeInnerJoin';
import sortedMergeLeftAntiJoin from '../lib/sortedMerge/sortedMergeLeftAntiJoin';
import sortedMergeLeftOuterJoin from '../lib/sortedMerge/sortedMergeLeftOuterJoin';
import sortedMergeLeftSemiJoin from '../lib/sortedMerge/sortedMergeLeftSemiJoin';
import sortedMergeRightAntiJoin from '../lib/sortedMerge/sortedMergeRightAntiJoin';
import sortedMergeRightOuterJoin from '../lib/sortedMerge/sortedMergeRightOuterJoin';
import sortedMergeRightSemiJoin from '../lib/sortedMerge/sortedMergeRightSemiJoin';

describe('Sorted Merge Joins', () => {
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
    describe('#sortedMergeFullOuterJoin()', () => {
        let expectedA = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3},
                {id: 'd', right: 4},
                {id: 'e', left: 2},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            expectedB = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'c', right: 2, left: 0},
                {id: 'c', right: 2, left: 1},
                {id: 'c', right: 3, left: 0},
                {id: 'c', right: 3, left: 1},
                {id: 'd', right: 4},
                {id: 'e', left: 2},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            resultA = sortedMergeFullOuterJoin(left, accessor, right, accessor),
            resultB = sortedMergeFullOuterJoin(right, accessor, left, accessor),
            resultC = sortedMergeFullOuterJoin([], accessor, right, accessor);
        it('should return 10 rows if parent is left', () =>
            assert.equal(10, resultA.length));
        it('should match the expected output if parent is left', () =>
            assert.equal(JSON.stringify(expectedA), JSON.stringify(resultA)));
        it('should return 8 rows if parent is right', () =>
            assert.equal(10, resultB.length));
        it('should match the expected output if parent is right', () =>
            assert.equal(JSON.stringify(expectedB), JSON.stringify(resultB)));
        it('should return empty results for empty input', () =>
            assert.equal(0, resultC.length));
    });
    describe('#sortedMergeInnerJoin()', () => {
        let expectedA = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3}
            ],
            expectedB = [
                {id: 'c', right: 2, left: 0},
                {id: 'c', right: 2, left: 1},
                {id: 'c', right: 3, left: 0},
                {id: 'c', right: 3, left: 1}
            ],
            resultA = sortedMergeInnerJoin(left, accessor, right, accessor),
            resultB = sortedMergeInnerJoin(right, accessor, left, accessor),
            resultC = sortedMergeInnerJoin([], accessor, right, accessor);
        it('should return 5 rows if parent is left', () =>
            assert.equal(4, resultA.length));
        it('should match the expected output if parent is left', () =>
            assert.equal(JSON.stringify(expectedA), JSON.stringify(resultA)));
        it('should return 5 rows if parent is right', () =>
            assert.equal(4, resultB.length));
        it('should match the expected output if parent is right', () =>
            assert.equal(JSON.stringify(expectedB), JSON.stringify(resultB)));
        it('should return empty results for empty input', () =>
            assert.equal(0, resultC.length));
    });
    describe('#sortedMergeLeftAntiJoin()', () => {
        let expected = [
                {id: 'e', left: 2}
            ],
            result = sortedMergeLeftAntiJoin(left, accessor, right, accessor),
            resultB = sortedMergeLeftAntiJoin([], accessor, right, accessor);
        it('should return 1 rows', () =>
            assert.equal(1, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
        it('should return empty results for empty input', () =>
            assert.equal(0, resultB.length));
    });
    describe('#sortedMergeLeftOuterJoin()', () => {
        let expected = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2}
            ],
            result = sortedMergeLeftOuterJoin(left, accessor, right, accessor),
            resultB = sortedMergeLeftOuterJoin([], accessor, right, accessor);
        it('should return 5 rows', () =>
            assert.equal(5, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
        it('should return empty results for empty input', () =>
            assert.equal(0, resultB.length));
    });
    describe('#sortedMergeLeftSemiJoin()', () => {
        let expected = [
                {id: 'c', left: 0},
                {id: 'c', left: 1}
            ],
            result = sortedMergeLeftSemiJoin(left, accessor, right, accessor),
            resultB = sortedMergeLeftSemiJoin([], accessor, right, accessor);
        it('should return 2 rows', () =>
            assert.equal(2, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
        it('should return empty results for empty input', () =>
            assert.equal(0, resultB.length));
    });
    describe('#sortedMergeRightAntiJoin()', () => {
        let expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = sortedMergeRightAntiJoin(left, accessor, right, accessor),
            resultB = sortedMergeRightAntiJoin(left, accessor, [], accessor);
        it('should return 5 rows', () =>
            assert.equal(5, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
        it('should match the left anti join with right as the parent', () =>
            assert.equal(JSON.stringify(result),
                JSON.stringify(sortedMergeLeftAntiJoin(right, accessor, left, accessor))));
        it('should return empty results for empty input', () =>
            assert.equal(0, resultB.length));
    });
    describe('#sortedMergeRightOuterJoin()', () => {
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
            result = sortedMergeRightOuterJoin(left, accessor, right, accessor),
            resultB = sortedMergeRightOuterJoin(left, accessor, [], accessor);
        it('should return 9 rows', () =>
            assert.equal(9, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
        it('should match the left outer join with right as the parent', () =>
            assert.equal(JSON.stringify(result), JSON.stringify(sortedMergeLeftOuterJoin(right, accessor, left, accessor))));
        it('should return empty results for empty input', () =>
            assert.equal(0, resultB.length));
    });
    describe('#sortedMergeRightSemiJoin()', () => {
        let expected = [
                {id: 'c', right: 2},
                {id: 'c', right: 3}
            ],
            result = sortedMergeRightSemiJoin(left, accessor, right, accessor),
            resultB = sortedMergeRightSemiJoin(left, accessor, [], accessor);
        it('should return 2 rows', () =>
            assert.equal(2, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
        it('should match the left semi join with right as the parent', () =>
            assert.equal(JSON.stringify(result),
                JSON.stringify(sortedMergeLeftSemiJoin(right, accessor, left, accessor))));
        it('should return empty results for empty input', () =>
            assert.equal(0, resultB.length));
    });
});
