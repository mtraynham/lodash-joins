var assert = require('assert');

describe('Hash Joins', function () {
    var left = [
            {id: 'a', left: 1},
            {id: 'a', left: 2},
            {id: 'b', left: 3},
            {id: 'c', left: 4},
        ],
        right = [
            {id: 'a', right: 1},
            {id: 'a', right: 2},
            {id: 'c', right: 3},
            {id: 'd', right: 4},
            {id: 'e', right: 5}
        ],
        accessor = function (obj) {
            return obj['id'];
        };
    describe('#hashFullOuterJoin()', function () {
        var hashFullOuterJoin = require('../lib/hash/hashFullOuterJoin'),
            expectedA = [
                {id: 'a', left: 1, right: 1},
                {id: 'a', left: 2, right: 1},
                {id: 'a', left: 1, right: 2},
                {id: 'a', left: 2, right: 2},
                {id: 'c', left: 4, right: 3},
                {id: 'd', right: 4},
                {id: 'e', right: 5},
                {id: 'b', left: 3}
            ],
            expectedB = [
                {id: 'a', right: 1, left: 1},
                {id: 'a', right: 1, left: 2},
                {id: 'a', right: 2, left: 1},
                {id: 'a', right: 2, left: 2},
                {id: 'c', right: 3, left: 4},
                {id: 'd', right: 4},
                {id: 'e', right: 5},
                {id: 'b', left: 3}
            ],
            resultA = hashFullOuterJoin(left, accessor, right, accessor),
            resultB = hashFullOuterJoin(right, accessor, left, accessor);
        it('should return 8 rows if parent is left', function () {
            assert.equal(8, resultA.length);
        });
        it('should match the expected output if parent is left', function () {
            assert.equal(JSON.stringify(expectedA), JSON.stringify(resultA));
        });
        it('should return 8 rows if parent is right', function () {
            assert.equal(8, resultB.length);
        });
        it('should match the expected output if parent is right', function () {
            assert.equal(JSON.stringify(expectedB), JSON.stringify(resultB));
        });
    });
    describe('#hashInnerJoin()', function () {
        var hashInnerJoin = require('../lib/hash/hashInnerJoin'),
            expectedA = [
                {id: 'a', left: 1, right: 1},
                {id: 'a', left: 2, right: 1},
                {id: 'a', left: 1, right: 2},
                {id: 'a', left: 2, right: 2},
                {id: 'c', left: 4, right: 3}
            ],
            expectedB = [
                {id: 'a', right: 1, left: 1},
                {id: 'a', right: 1, left: 2},
                {id: 'a', right: 2, left: 1},
                {id: 'a', right: 2, left: 2},
                {id: 'c', right: 3, left: 4}
            ],
            resultA = hashInnerJoin(left, accessor, right, accessor),
            resultB = hashInnerJoin(right, accessor, left, accessor);
        it('should return 5 rows if parent is left', function () {
            assert.equal(5, resultA.length);
        });
        it('should match the expected output if parent is left', function () {
            assert.equal(JSON.stringify(expectedA), JSON.stringify(resultA));
        });
        it('should return 5 rows if parent is right', function () {
            assert.equal(5, resultB.length);
        });
        it('should match the expected output if parent is right', function () {
            assert.equal(JSON.stringify(expectedB), JSON.stringify(resultB));
        });
    });
    describe('#hashLeftAntiJoin()', function () {
        var hashLeftAntiJoin = require('../lib/hash/hashLeftAntiJoin'),
            expected = [
                {id: 'b', left: 3}
            ],
            result = hashLeftAntiJoin(left, accessor, right, accessor);
        it('should return 1 rows', function () {
            assert.equal(1, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#hashLeftOuterJoin()', function () {
        var hashLeftOuterJoin = require('../lib/hash/hashLeftOuterJoin'),
            expected = [
                {id: 'a', left: 1, right: 1},
                {id: 'a', left: 2, right: 1},
                {id: 'a', left: 1, right: 2},
                {id: 'a', left: 2, right: 2},
                {id: 'c', left: 4, right: 3},
                {id: 'b', left: 3}
            ],
            result = hashLeftOuterJoin(left, accessor, right, accessor);
        it('should return 6 rows', function () {
            assert.equal(6, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#hashLeftSemiJoin()', function () {
        var hashLeftSemiJoin = require('../lib/hash/hashLeftSemiJoin'),
            expected = [
                {id: 'a', left: 1},
                {id: 'a', left: 2},
                {id: 'c', left: 4}
            ],
            result = hashLeftSemiJoin(left, accessor, right, accessor);
        it('should return 3 rows', function () {
            assert.equal(3, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#hashRightAntiJoin()', function () {
        var hashRightAntiJoin = require('../lib/hash/hashRightAntiJoin'),
            expected = [
                {id: 'd', right: 4},
                {id: 'e', right: 5}
            ],
            result = hashRightAntiJoin(left, accessor, right, accessor);
        it('should return 2 rows', function () {
            assert.equal(2, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left anti join with right as the parent', function () {
            var hashLeftAntiJoin = require('../lib/hash/hashLeftAntiJoin');
            assert.equal(JSON.stringify(result), JSON.stringify(hashLeftAntiJoin(right, accessor, left, accessor)));
        });
    });
    describe('#hashRightOuterJoin()', function () {
        var hashRightOuterJoin = require('../lib/hash/hashRightOuterJoin'),
            expected = [
                {id: 'a', right: 1, left: 1},
                {id: 'a', right: 1, left: 2},
                {id: 'a', right: 2, left: 1},
                {id: 'a', right: 2, left: 2},
                {id: 'c', right: 3, left: 4},
                {id: 'd', right: 4},
                {id: 'e', right: 5}
            ],
            result = hashRightOuterJoin(left, accessor, right, accessor);
        it('should return 7 rows', function () {
            assert.equal(7, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left outer join with right as the parent', function () {
            var hashLeftOuterJoin = require('../lib/hash/hashLeftOuterJoin');
            assert.equal(JSON.stringify(result), JSON.stringify(hashLeftOuterJoin(right, accessor, left, accessor)));
        });
    });
    describe('#hashRightSemiJoin()', function () {
        var hashRightSemiJoin = require('../lib/hash/hashRightSemiJoin'),
            expected = [
                {id: 'a', right: 1},
                {id: 'a', right: 2},
                {id: 'c', right: 3}
            ],
            result = hashRightSemiJoin(left, accessor, right, accessor);
        it('should return 3 rows', function () {
            assert.equal(3, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left semi join with right as the parent', function () {
            var hashLeftSemiJoin = require('../lib/hash/hashLeftSemiJoin');
            assert.equal(JSON.stringify(result), JSON.stringify(hashLeftSemiJoin(right, accessor, left, accessor)));
        });
    });
});