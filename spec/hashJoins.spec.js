import assign from 'lodash/assign';
import hashFullOuterJoin from '../lib/hash/hashFullOuterJoin';
import hashInnerJoin from '../lib/hash/hashInnerJoin';
import hashLeftAntiJoin from '../lib/hash/hashLeftAntiJoin';
import hashLeftOuterJoin from '../lib/hash/hashLeftOuterJoin';
import hashLeftSemiJoin from '../lib/hash/hashLeftSemiJoin';
import hashRightAntiJoin from '../lib/hash/hashRightAntiJoin';
import hashRightOuterJoin from '../lib/hash/hashRightOuterJoin';
import hashRightSemiJoin from '../lib/hash/hashRightSemiJoin';

describe('Hash Joins', () => {
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
        accessor = obj => obj.id,
        merger = (l, r) => assign({}, l, r);
    describe('#hashFullOuterJoin()', () => {
        const expectedA = [
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
            resultA = hashFullOuterJoin(left, accessor, right, accessor, merger),
            resultB = hashFullOuterJoin(right, accessor, left, accessor, merger),
            resultC = hashFullOuterJoin([], accessor, [], accessor, merger);
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
    describe('#hashInnerJoin()', () => {
        const expectedA = [
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
            resultA = hashInnerJoin(left, accessor, right, accessor, merger),
            resultB = hashInnerJoin(right, accessor, left, accessor, merger),
            resultC = hashInnerJoin([], accessor, right, accessor, merger);
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
    describe('#hashLeftAntiJoin()', () => {
        const expected = [
                {id: 'e', left: 2}
            ],
            result = hashLeftAntiJoin(left, accessor, right, accessor),
            resultB = hashLeftAntiJoin([], accessor, right, accessor);
        it('should return 1 rows', () =>
            expect(result.length).toBe(1));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#hashLeftOuterJoin()', () => {
        const expected = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2}
            ],
            result = hashLeftOuterJoin(left, accessor, right, accessor, merger),
            resultB = hashLeftOuterJoin([], accessor, right, accessor, merger);
        it('should return 5 rows', () =>
            expect(result.length).toBe(5));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#hashLeftSemiJoin()', () => {
        const expected = [
                {id: 'c', left: 0},
                {id: 'c', left: 1}
            ],
            result = hashLeftSemiJoin(left, accessor, right, accessor),
            resultB = hashLeftSemiJoin([], accessor, right, accessor);
        it('should return 2 rows', () =>
            expect(result.length).toBe(2));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#hashRightAntiJoin()', () => {
        const expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = hashRightAntiJoin(left, accessor, right, accessor),
            resultB = hashRightAntiJoin(left, accessor, [], accessor);
        it('should return 5 rows', () =>
            expect(result.length).toBe(5));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left anti join with right as the parent', () =>
            expect(hashLeftAntiJoin(right, accessor, left, accessor)).toEqual(result));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#hashRightOuterJoin()', () => {
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
            result = hashRightOuterJoin(left, accessor, right, accessor, merger),
            resultB = hashRightOuterJoin(left, accessor, [], accessor, merger);
        it('should return 9 rows', () =>
            expect(result.length).toBe(9));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left outer join with right as the parent', () =>
            expect(hashLeftOuterJoin(right, accessor, left, accessor, merger)).toEqual(result));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#hashRightSemiJoin()', () => {
        const expected = [
                {id: 'c', right: 2},
                {id: 'c', right: 3}
            ],
            result = hashRightSemiJoin(left, accessor, right, accessor),
            resultB = hashRightSemiJoin(left, accessor, [], accessor);
        it('should return 2 rows', () =>
            expect(result.length).toBe(2));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left semi join with right as the parent', () =>
            expect(hashLeftSemiJoin(right, accessor, left, accessor)).toEqual(result));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
});
