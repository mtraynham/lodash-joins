import assign from 'lodash/assign';
import nestedLoopFullOuterJoin from './nestedLoopFullOuterJoin';
import nestedLoopInnerJoin from './nestedLoopInnerJoin';
import nestedLoopLeftAntiJoin from './nestedLoopLeftAntiJoin';
import nestedLoopLeftOuterJoin from './nestedLoopLeftOuterJoin';
import nestedLoopLeftSemiJoin from './nestedLoopLeftSemiJoin';
import nestedLoopRightAntiJoin from './nestedLoopRightAntiJoin';
import nestedLoopRightOuterJoin from './nestedLoopRightOuterJoin';
import nestedLoopRightSemiJoin from './nestedLoopRightSemiJoin';
import {Accessor, Merger} from '../typings';

interface Row {
    id: string;
    left?: number;
    right?: number;
}

describe('Nested Loop Joins', () => {
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
    describe('#nestedLoopFullOuterJoin()', () => {
        const expectedA = [
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
            resultA = nestedLoopFullOuterJoin(left, accessor, right, accessor, merger),
            resultB = nestedLoopFullOuterJoin(right, accessor, left, accessor, merger),
            resultC = nestedLoopFullOuterJoin([], accessor, [], accessor, merger),
            resultD = nestedLoopFullOuterJoin(left, accessor, [], accessor, merger),
            resultE = nestedLoopFullOuterJoin([], accessor, right, accessor, merger);
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
    });
    describe('#nestedLoopInnerJoin()', () => {
        const expectedA = [
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
            resultA = nestedLoopInnerJoin(left, accessor, right, accessor, merger),
            resultB = nestedLoopInnerJoin(right, accessor, left, accessor, merger),
            resultC = nestedLoopInnerJoin([], accessor, right, accessor, merger);
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
    describe('#nestedLoopLeftAntiJoin()', () => {
        const expected = [
                {id: 'e', left: 2}
            ],
            result = nestedLoopLeftAntiJoin(left, accessor, right, accessor),
            resultB = nestedLoopLeftAntiJoin([], accessor, right, accessor);
        it('should return 1 rows', () =>
            expect(result.length).toBe(1));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#nestedLoopLeftOuterJoin()', () => {
        const expected = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2}
            ],
            result = nestedLoopLeftOuterJoin(left, accessor, right, accessor, merger),
            resultB = nestedLoopLeftOuterJoin([], accessor, right, accessor, merger),
            resultC = nestedLoopLeftOuterJoin(left, accessor, [], accessor, merger);
        it('should return 5 rows', () =>
            expect(result.length).toBe(5));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
        it('should return just the left side if empty right side', () =>
            expect(resultC.length).toBe(left.length));
    });
    describe('#nestedLoopLeftSemiJoin()', () => {
        const expected = [
                {id: 'c', left: 0},
                {id: 'c', left: 1}
            ],
            result = nestedLoopLeftSemiJoin(left, accessor, right, accessor),
            resultB = nestedLoopLeftSemiJoin([], accessor, right, accessor);
        it('should return 2 rows', () =>
            expect(result.length).toBe(2));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#nestedLoopRightAntiJoin()', () => {
        const expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = nestedLoopRightAntiJoin(left, accessor, right, accessor),
            resultB = nestedLoopRightAntiJoin(left, accessor, [], accessor);
        it('should return 5 rows', () =>
            expect(result.length).toBe(5));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left anti join with right as the parent', () =>
            expect(nestedLoopLeftAntiJoin(right, accessor, left, accessor)).toEqual(result));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#nestedLoopRightOuterJoin()', () => {
        const expected = [
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
            result = nestedLoopRightOuterJoin(left, accessor, right, accessor, merger),
            resultB = nestedLoopRightOuterJoin(left, accessor, [], accessor, merger);
        it('should return 9 rows', () =>
            expect(result.length).toBe(9));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left outer join with right as the parent', () =>
            expect(nestedLoopLeftOuterJoin(right, accessor, left, accessor, merger)).toEqual(result));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
    describe('#nestedLoopRightSemiJoin()', () => {
        const expected = [
                {id: 'c', right: 2},
                {id: 'c', right: 3}
            ],
            result = nestedLoopRightSemiJoin(left, accessor, right, accessor),
            resultB = nestedLoopRightSemiJoin(left, accessor, [], accessor);
        it('should return 2 rows', () =>
            expect(result.length).toBe(2));
        it('should match the expected output', () =>
            expect(result).toEqual(expected));
        it('should match the left semi join with right as the parent', () =>
            expect(nestedLoopLeftSemiJoin(right, accessor, left, accessor)).toEqual(result));
        it('should return empty results for empty input', () =>
            expect(resultB.length).toBe(0));
    });
});
