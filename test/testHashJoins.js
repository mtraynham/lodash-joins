import assert from 'assert';

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
        import hashFullOuterJoin from '../lib/hash/hashFullOuterJoin';
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
            assert.equal(10, resultA.length));
        it('should match the expected output if parent is left', () =>
            assert.equal(JSON.stringify(expectedA), JSON.stringify(resultA)));
        it('should return 8 rows if parent is right', () =>
            assert.equal(10, resultB.length));
        it('should match the expected output if parent is right', () =>
            assert.equal(JSON.stringify(expectedB), JSON.stringify(resultB)));
    });
    describe('#hashInnerJoin()', () => {
        import hashInnerJoin from '../lib/hash/hashInnerJoin';
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
            assert.equal(4, resultA.length));
        it('should match the expected output if parent is left', () =>
            assert.equal(JSON.stringify(expectedA), JSON.stringify(resultA)));
        it('should return 5 rows if parent is right', () =>
            assert.equal(4, resultB.length));
        it('should match the expected output if parent is right', () =>
            assert.equal(JSON.stringify(expectedB), JSON.stringify(resultB)));
    });
    describe('#hashLeftAntiJoin()', () => {
        import hashLeftAntiJoin from '../lib/hash/hashLeftAntiJoin';
        let expected = [
                {id: 'e', left: 2}
            ],
            result = hashLeftAntiJoin(left, accessor, right, accessor);
        it('should return 1 rows', () =>
            assert.equal(1, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
    });
    describe('#hashLeftOuterJoin()', () => {
        import hashLeftOuterJoin from '../lib/hash/hashLeftOuterJoin';
        let expected = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2}
            ],
            result = hashLeftOuterJoin(left, accessor, right, accessor);
        it('should return 5 rows', () =>
            assert.equal(5, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
    });
    describe('#hashLeftSemiJoin()', () => {
        import hashLeftSemiJoin from '../lib/hash/hashLeftSemiJoin';
        let expected = [
                {id: 'c', left: 0},
                {id: 'c', left: 1}
            ],
            result = hashLeftSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', () =>
            assert.equal(2, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
    });
    describe('#hashRightAntiJoin()', () => {
        import hashRightAntiJoin from '../lib/hash/hashRightAntiJoin';
        let expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = hashRightAntiJoin(left, accessor, right, accessor);
        it('should return 5 rows', () =>
            assert.equal(5, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
        it('should match the left anti join with right as the parent', () => {
            import hashLeftAntiJoin from '../lib/hash/hashLeftAntiJoin';
            assert.equal(JSON.stringify(result), JSON.stringify(hashLeftAntiJoin(right, accessor, left, accessor)));
        });
    });
    describe('#hashRightOuterJoin()', () => {
        import hashRightOuterJoin from '../lib/hash/hashRightOuterJoin';
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
            assert.equal(9, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
        it('should match the left outer join with right as the parent', () => {
            import hashLeftOuterJoin from '../lib/hash/hashLeftOuterJoin';
            assert.equal(JSON.stringify(result), JSON.stringify(hashLeftOuterJoin(right, accessor, left, accessor)));
        });
    });
    describe('#hashRightSemiJoin()', () => {
        import hashRightSemiJoin from '../lib/hash/hashRightSemiJoin';
        let expected = [
                {id: 'c', right: 2},
                {id: 'c', right: 3}
            ],
            result = hashRightSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', () =>
            assert.equal(2, result.length));
        it('should match the expected output', () =>
            assert.equal(JSON.stringify(expected), JSON.stringify(result)));
        it('should match the left semi join with right as the parent', () => {
            import hashLeftSemiJoin from '../lib/hash/hashLeftSemiJoin';
            assert.equal(JSON.stringify(result), JSON.stringify(hashLeftSemiJoin(right, accessor, left, accessor)));
        });
    });
});
