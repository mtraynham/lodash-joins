import sortedMergeFullOuterJoin from '../lib/sortedMerge/sortedMergeFullOuterJoin';
import sortedMergeInnerJoin from '../lib/sortedMerge/sortedMergeInnerJoin';
import sortedMergeLeftAntiJoin from '../lib/sortedMerge/sortedMergeLeftAntiJoin';
import sortedMergeLeftOuterJoin from '../lib/sortedMerge/sortedMergeLeftOuterJoin';
import sortedMergeLeftSemiJoin from '../lib/sortedMerge/sortedMergeLeftSemiJoin';
import sortedMergeRightAntiJoin from '../lib/sortedMerge/sortedMergeRightAntiJoin';
import sortedMergeRightOuterJoin from '../lib/sortedMerge/sortedMergeRightOuterJoin';
import sortedMergeRightSemiJoin from '../lib/sortedMerge/sortedMergeRightSemiJoin';

describe('Sorted Merge Joins', () => {
    const left = [
            {id: 'c', left: 0},
            {id: 'c', left: 1},
            {id: 'e', left: 2}
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
        accessor = obj => obj.id;
    describe('#sortedMergeFullOuterJoin()', () => {
        const expectedA = [
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
            resultC = sortedMergeFullOuterJoin([], accessor, [], accessor);
        it('should return 10 rows if parent is left', () =>
            expect(resultA.length).toBe(10));
        it('should match the expected output if parent is left', () =>
            expect(resultA).toEqual(expectedA));
        it('should return 8 rows if parent is right', () =>
            expect(resultB.length).toBe(10));
        it('should match the expected output if parent is right', () =>
            expect(resultB).toEqual(expectedB));
        it('should return empty results for empty input', () =>
            expect(resultC.length).toBe(0));
    });
    describe('#sortedMergeInnerJoin()', () => {
        const expectedA = [
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
            expect(resultA.length).toBe(4));
        it('should match the expected output if parent is left', () =>
            expect(resultA).toEqual(expectedA));
        it('should return 5 rows if parent is right', () =>
            expect(resultB.length).toBe(4));
        it('should match the expected output if parent is right', () =>
            expect(resultB).toEqual(expectedB));
        it('should return empty results for empty input', () =>
            expect(resultC.length).toBe(0));
    });
    describe('#sortedMergeLeftAntiJoin()', () => {
        const expected = [
                {id: 'e', left: 2}
            ],
            result = sortedMergeLeftAntiJoin(left, accessor, right, accessor),
            resultB = sortedMergeLeftAntiJoin([], accessor, right, accessor);
        it('should return 1 rows', () =>
            expect(result.length).toBe(1));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#sortedMergeLeftOuterJoin()', () => {
        const expected = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2}
            ],
            result = sortedMergeLeftOuterJoin(left, accessor, right, accessor),
            resultB = sortedMergeLeftOuterJoin([], accessor, right, accessor);
        it('should return 5 rows', () =>
            expect(result.length).toBe(5));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#sortedMergeLeftSemiJoin()', () => {
        const expected = [
                {id: 'c', left: 0},
                {id: 'c', left: 1}
            ],
            result = sortedMergeLeftSemiJoin(left, accessor, right, accessor),
            resultB = sortedMergeLeftSemiJoin([], accessor, right, accessor);
        it('should return 2 rows', () =>
            expect(result.length).toBe(2));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#sortedMergeRightAntiJoin()', () => {
        const expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = sortedMergeRightAntiJoin(left, accessor, right, accessor),
            resultB = sortedMergeRightAntiJoin(left, accessor, [], accessor);
        it('should return 5 rows', () =>
            expect(result.length).toBe(5));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left anti join with right as the parent', () =>
            expect(sortedMergeLeftAntiJoin(right, accessor, left, accessor)).toEqual(result));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#sortedMergeRightOuterJoin()', () => {
        const expected = [
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
            expect(result.length).toBe(9));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left outer join with right as the parent', () =>
            expect(sortedMergeLeftOuterJoin(right, accessor, left, accessor)).toEqual(result));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#sortedMergeRightSemiJoin()', () => {
        const expected = [
                {id: 'c', right: 2},
                {id: 'c', right: 3}
            ],
            result = sortedMergeRightSemiJoin(left, accessor, right, accessor),
            resultB = sortedMergeRightSemiJoin(left, accessor, [], accessor);
        it('should return 2 rows', () =>
            expect(result.length).toBe(2));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left semi join with right as the parent', () =>
            expect(sortedMergeLeftSemiJoin(right, accessor, left, accessor)).toEqual(result));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
});
