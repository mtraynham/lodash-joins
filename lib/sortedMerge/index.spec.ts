import assign from 'lodash/assign';
import sortedMergeFullOuterJoin from './sortedMergeFullOuterJoin';
import sortedMergeInnerJoin from './sortedMergeInnerJoin';
import sortedMergeLeftAntiJoin from './sortedMergeLeftAntiJoin';
import sortedMergeLeftOuterJoin from './sortedMergeLeftOuterJoin';
import sortedMergeLeftSemiJoin from './sortedMergeLeftSemiJoin';
import sortedMergeRightAntiJoin from './sortedMergeRightAntiJoin';
import sortedMergeRightOuterJoin from './sortedMergeRightOuterJoin';
import sortedMergeRightSemiJoin from './sortedMergeRightSemiJoin';
import {Accessor, Merger} from '../typings';

interface Row {
    id: string;
    left?: number;
    right?: number;
}

describe('Sorted Merge Joins', () => {
    const left: Row[] = [
        {id: 'c', left: 0},
        {id: 'c', left: 1},
        {id: 'e', left: 2}
    ];
    const right: Row[] = [
        {id: 'a', right: 0},
        {id: 'b', right: 1},
        {id: 'c', right: 2},
        {id: 'c', right: 3},
        {id: 'd', right: 4},
        {id: 'f', right: 5},
        {id: 'g', right: 6}
    ];
    const accessor: Accessor<Row, string> = (obj: Row): string => obj.id;
    const merger: Merger<Row, Row, Row> = (l: Row, r: Row): Row => assign({}, l, r);
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
            resultA = sortedMergeFullOuterJoin(left, accessor, right, accessor, merger),
            resultB = sortedMergeFullOuterJoin(right, accessor, left, accessor, merger),
            resultC = sortedMergeFullOuterJoin([], accessor, [], accessor, merger),
            resultD = sortedMergeFullOuterJoin(left, accessor, [], accessor, merger),
            resultE = sortedMergeFullOuterJoin([], accessor, right, accessor, merger),
            resultF = sortedMergeFullOuterJoin([left[0]], accessor, [right[0]], accessor, merger);
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
        it('should return just the left side if empty right side', () =>
            expect(resultD.length).toBe(left.length));
        it('should return just the right side if empty left side', () =>
            expect(resultE.length).toBe(right.length));
        it('should yield just 2 results', () =>
            expect(resultF.length).toBe(2));
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
            resultA = sortedMergeInnerJoin(left, accessor, right, accessor, merger),
            resultB = sortedMergeInnerJoin(right, accessor, left, accessor, merger),
            resultC = sortedMergeInnerJoin([], accessor, right, accessor, merger);
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
            result = sortedMergeLeftOuterJoin(left, accessor, right, accessor, merger),
            resultB = sortedMergeLeftOuterJoin([], accessor, right, accessor, merger),
            resultC = sortedMergeLeftOuterJoin(left, accessor, [], accessor, merger);
        it('should return 5 rows', () =>
            expect(result.length).toBe(5));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
        it('should return just the left side if empty right side', () =>
            expect(resultC.length).toBe(left.length));
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
            result = sortedMergeRightOuterJoin(left, accessor, right, accessor, merger),
            resultB = sortedMergeRightOuterJoin(left, accessor, [], accessor, merger);
        it('should return 9 rows', () =>
            expect(result.length).toBe(9));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left outer join with right as the parent', () =>
            expect(sortedMergeLeftOuterJoin(right, accessor, left, accessor, merger)).toEqual(result));
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
