import assign from 'lodash/assign';
import * as joins from './index';
import {Join, Accessor, Merger, NonMergeJoin} from './typings';

interface Row {
    id: string;
    left?: number;
    right?: number;
}

function testJoins(
    groupName: string,
    fullOuterJoinFn: Join<Row, Row, string, Row>,
    innerJoinFn: Join<Row, Row, string, Row>,
    leftAntiJoinFn: NonMergeJoin<Row, Row, string>,
    leftOuterJoinFn: Join<Row, Row, string, Row>,
    leftSemiJoinFn: NonMergeJoin<Row, Row, string>,
    rightAntiJoinFn: NonMergeJoin<Row, Row, string>,
    rightOuterJoinFn: Join<Row, Row, string, Row>,
    rightSemiJoinFn: NonMergeJoin<Row, Row, string>
) {
    describe(groupName, () => {
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
        describe(`#${fullOuterJoinFn.name}()`, () => {
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
                resultA = fullOuterJoinFn(left, accessor, right, accessor, merger),
                resultB = fullOuterJoinFn(right, accessor, left, accessor, merger),
                resultC = fullOuterJoinFn([], accessor, [], accessor, merger),
                resultD = fullOuterJoinFn(left, accessor, [], accessor, merger),
                resultE = fullOuterJoinFn([], accessor, right, accessor, merger),
                resultF = fullOuterJoinFn([left[0]], accessor, [right[0]], accessor, merger);
            it('should return 10 rows if parent is left', () =>
                expect(resultA.length).toBe(10));
            it('should match the expected output if parent is left', () =>
                expect(resultA).toEqual(jasmine.arrayWithExactContents(expectedA)));
            it('should return 8 rows if parent is right', () =>
                expect(resultB.length).toBe(10));
            it('should match the expected output if parent is right', () =>
                expect(resultB).toEqual(jasmine.arrayWithExactContents(expectedB)));
            it('should return empty results for empty input', () =>
                expect(resultC.length).toBe(0));
            it('should return just the left side if empty right side', () =>
                expect(resultD.length).toBe(left.length));
            it('should return just the right side if empty left side', () =>
                expect(resultE.length).toBe(right.length));
            it('should yield just 2 results', () =>
                expect(resultF.length).toBe(2));
        });
        describe(`#${innerJoinFn.name}()`, () => {
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
                resultA = innerJoinFn(left, accessor, right, accessor, merger),
                resultB = innerJoinFn(right, accessor, left, accessor, merger),
                resultC = innerJoinFn([], accessor, right, accessor, merger);
            it('should return 5 rows if parent is left', () =>
                expect(resultA.length).toBe(4));
            it('should match the expected output if parent is left', () =>
                expect(resultA).toEqual(jasmine.arrayWithExactContents(expectedA)));
            it('should return 5 rows if parent is right', () =>
                expect(resultB.length).toBe(4));
            it('should match the expected output if parent is right', () =>
                expect(resultB).toEqual(jasmine.arrayWithExactContents(expectedB)));
            it('should return empty results for empty input', () =>
                expect(resultC.length).toBe(0));
        });
        describe(`#${leftAntiJoinFn.name}()`, () => {
            const expected = [
                    {id: 'e', left: 2}
                ],
                result = leftAntiJoinFn(left, accessor, right, accessor),
                resultB = leftAntiJoinFn([], accessor, right, accessor);
            it('should return 1 rows', () =>
                expect(result.length).toBe(1));
            it('should match the expected output', () =>
                expect(result).toEqual(expected));
            it('should return empty results for empty input', () =>
                expect(resultB.length).toBe(0));
        });
        describe(`#${leftOuterJoinFn.name}()`, () => {
            const expected = [
                    {id: 'c', left: 0, right: 2},
                    {id: 'c', left: 0, right: 3},
                    {id: 'c', left: 1, right: 2},
                    {id: 'c', left: 1, right: 3},
                    {id: 'e', left: 2}
                ],
                result = leftOuterJoinFn(left, accessor, right, accessor, merger),
                resultB = leftOuterJoinFn([], accessor, right, accessor, merger),
                resultC = leftOuterJoinFn(left, accessor, [], accessor, merger);
            it('should return 5 rows', () =>
                expect(result.length).toBe(5));
            it('should match the expected output', () =>
                expect(result).toEqual(jasmine.arrayWithExactContents(expected)));
            it('should return empty results for empty input', () =>
                expect(resultB.length).toBe(0));
            it('should return just the left side if empty right side', () =>
                expect(resultC.length).toBe(left.length));
        });
        describe(`#${leftSemiJoinFn.name}()`, () => {
            const expected = [
                    {id: 'c', left: 0},
                    {id: 'c', left: 1}
                ],
                result = leftSemiJoinFn(left, accessor, right, accessor),
                resultB = leftSemiJoinFn([], accessor, right, accessor);
            it('should return 2 rows', () =>
                expect(result.length).toBe(2));
            it('should match the expected output', () =>
                expect(result).toEqual(expected));
            it('should return empty results for empty input', () =>
                expect(resultB.length).toBe(0));
        });
        describe(`#${rightAntiJoinFn.name}()`, () => {
            const expected = [
                    {id: 'a', right: 0},
                    {id: 'b', right: 1},
                    {id: 'd', right: 4},
                    {id: 'f', right: 5},
                    {id: 'g', right: 6}
                ],
                result = rightAntiJoinFn(left, accessor, right, accessor),
                resultB = rightAntiJoinFn(left, accessor, [], accessor);
            it('should return 5 rows', () =>
                expect(result.length).toBe(5));
            it('should match the expected output', () =>
                expect(result).toEqual(expected));
            it('should match the left anti join with right as the parent', () =>
                expect(leftAntiJoinFn(right, accessor, left, accessor)).toEqual(result));
            it('should return empty results for empty input', () =>
                expect(resultB.length).toBe(0));
        });
        describe(`#${rightOuterJoinFn.name}()`, () => {
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
                result = rightOuterJoinFn(left, accessor, right, accessor, merger),
                resultB = rightOuterJoinFn(left, accessor, [], accessor, merger);
            it('should return 9 rows', () =>
                expect(result.length).toBe(9));
            it('should match the expected output', () =>
                expect(result).toEqual(jasmine.arrayWithExactContents(expected)));
            it('should match the left outer join with right as the parent', () =>
                expect(leftOuterJoinFn(right, accessor, left, accessor, merger)).toEqual(result));
            it('should return empty results for empty input', () =>
                expect(resultB.length).toBe(0));
        });
        describe(`#${rightSemiJoinFn.name}()`, () => {
            const expected = [
                    {id: 'c', right: 2},
                    {id: 'c', right: 3}
                ],
                result = rightSemiJoinFn(left, accessor, right, accessor),
                resultB = rightSemiJoinFn(left, accessor, [], accessor);
            it('should return 2 rows', () =>
                expect(result.length).toBe(2));
            it('should match the expected output', () =>
                expect(result).toEqual(expected));
            it('should match the left semi join with right as the parent', () =>
                expect(leftSemiJoinFn(right, accessor, left, accessor)).toEqual(result));
            it('should return empty results for empty input', () =>
                expect(resultB.length).toBe(0));
        });
    });
}

testJoins(
    'Hash Joins',
    joins.hashFullOuterJoin,
    joins.hashInnerJoin,
    joins.hashLeftAntiJoin,
    joins.hashLeftOuterJoin,
    joins.hashLeftSemiJoin,
    joins.hashRightAntiJoin,
    joins.hashRightOuterJoin,
    joins.hashRightSemiJoin,
);
testJoins(
    'Nested Loop Joins',
    joins.nestedLoopFullOuterJoin,
    joins.nestedLoopInnerJoin,
    joins.nestedLoopLeftAntiJoin,
    joins.nestedLoopLeftOuterJoin,
    joins.nestedLoopLeftSemiJoin,
    joins.nestedLoopRightAntiJoin,
    joins.nestedLoopRightOuterJoin,
    joins.nestedLoopRightSemiJoin,
);
testJoins(
    'Sorted Merge Joins',
    joins.sortedMergeFullOuterJoin,
    joins.sortedMergeInnerJoin,
    joins.sortedMergeLeftAntiJoin,
    joins.sortedMergeLeftOuterJoin,
    joins.sortedMergeLeftSemiJoin,
    joins.sortedMergeRightAntiJoin,
    joins.sortedMergeRightOuterJoin,
    joins.sortedMergeRightSemiJoin
);
