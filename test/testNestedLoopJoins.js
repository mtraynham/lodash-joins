var assert = require('assert');

describe('Nested Loop Joins', function () {
    var left = [
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
        accessor = function (obj) {
            return obj['id'];
        };
    describe('#nestedLoopFullOuterJoin()', function () {
        var nestedLoopFullOuterJoin = require('../lib/nestedLoop/nestedLoopFullOuterJoin'),
            expectedA = [
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
            resultA = nestedLoopFullOuterJoin(left, accessor, right, accessor),
            resultB = nestedLoopFullOuterJoin(right, accessor, left, accessor);
        it('should return 10 rows if parent is left', function () {
            assert.equal(10, resultA.length);
        });
        it('should match the expected output if parent is left', function () {
            assert.equal(JSON.stringify(expectedA), JSON.stringify(resultA));
        });
        it('should return 8 rows if parent is right', function () {
            assert.equal(10, resultB.length);
        });
        it('should match the expected output if parent is right', function () {
            assert.equal(JSON.stringify(expectedB), JSON.stringify(resultB));
        });
    });
    describe('#nestedLoopInnerJoin()', function () {
        var nestedLoopInnerJoin = require('../lib/nestedLoop/nestedLoopInnerJoin'),
            expectedA = [
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
            resultA = nestedLoopInnerJoin(left, accessor, right, accessor),
            resultB = nestedLoopInnerJoin(right, accessor, left, accessor);
        it('should return 5 rows if parent is left', function () {
            assert.equal(4, resultA.length);
        });
        it('should match the expected output if parent is left', function () {
            assert.equal(JSON.stringify(expectedA), JSON.stringify(resultA));
        });
        it('should return 5 rows if parent is right', function () {
            assert.equal(4, resultB.length);
        });
        it('should match the expected output if parent is right', function () {
            assert.equal(JSON.stringify(expectedB), JSON.stringify(resultB));
        });
    });
    describe('#nestedLoopLeftAntiJoin()', function () {
        var nestedLoopLeftAntiJoin = require('../lib/nestedLoop/nestedLoopLeftAntiJoin'),
            expected = [
                {id: 'e', left: 2}
            ],
            result = nestedLoopLeftAntiJoin(left, accessor, right, accessor);
        it('should return 1 rows', function () {
            assert.equal(1, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#nestedLoopLeftOuterJoin()', function () {
        var nestedLoopLeftOuterJoin = require('../lib/nestedLoop/nestedLoopLeftOuterJoin'),
            expected = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2}
            ],
            result = nestedLoopLeftOuterJoin(left, accessor, right, accessor);
        it('should return 5 rows', function () {
            assert.equal(5, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#nestedLoopLeftSemiJoin()', function () {
        var nestedLoopLeftSemiJoin = require('../lib/nestedLoop/nestedLoopLeftSemiJoin'),
            expected = [
                {id: 'c', left: 0},
                {id: 'c', left: 1}
            ],
            result = nestedLoopLeftSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', function () {
            assert.equal(2, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#nestedLoopRightAntiJoin()', function () {
        var nestedLoopRightAntiJoin = require('../lib/nestedLoop/nestedLoopRightAntiJoin'),
            expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = nestedLoopRightAntiJoin(left, accessor, right, accessor);
        it('should return 5 rows', function () {
            assert.equal(5, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left anti join with right as the parent', function () {
            var nestedLoopLeftAntiJoin = require('../lib/nestedLoop/nestedLoopLeftAntiJoin');
            assert.equal(JSON.stringify(result), JSON.stringify(nestedLoopLeftAntiJoin(right, accessor, left, accessor)));
        });
    });
    describe('#nestedLoopRightOuterJoin()', function () {
        var nestedLoopRightOuterJoin = require('../lib/nestedLoop/nestedLoopRightOuterJoin'),
            expected = [
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
            result = nestedLoopRightOuterJoin(left, accessor, right, accessor);
        it('should return 9 rows', function () {
            assert.equal(9, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left outer join with right as the parent', function () {
            var nestedLoopLeftOuterJoin = require('../lib/nestedLoop/nestedLoopLeftOuterJoin');
            assert.equal(JSON.stringify(result), JSON.stringify(nestedLoopLeftOuterJoin(right, accessor, left, accessor)));
        });
    });
    describe('#nestedLoopRightSemiJoin()', function () {
        var nestedLoopRightSemiJoin = require('../lib/nestedLoop/nestedLoopRightSemiJoin'),
            expected = [
                {id: 'c', right: 2},
                {id: 'c', right: 3}
            ],
            result = nestedLoopRightSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', function () {
            assert.equal(2, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left semi join with right as the parent', function () {
            var nestedLoopLeftSemiJoin = require('../lib/nestedLoop/nestedLoopLeftSemiJoin');
            assert.equal(JSON.stringify(result), JSON.stringify(nestedLoopLeftSemiJoin(right, accessor, left, accessor)));
        });
    });
});