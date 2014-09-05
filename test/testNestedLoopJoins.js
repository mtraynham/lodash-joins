var assert = require('assert');

describe('Nested Loop Joins', function () {
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
    describe('#nestedLoopFullOuterJoin()', function () {
        var nestedLoopFullOuterJoin = require('../lib/nestedLoop/nestedLoopFullOuterJoin'),
            expectedA = [
                {id: 'a', left: 1, right: 1},
                {id: 'a', left: 1, right: 2},
                {id: 'a', left: 2, right: 1},
                {id: 'a', left: 2, right: 2},
                {id: 'b', left: 3},
                {id: 'c', left: 4, right: 3},
                {id: 'd', right: 4},
                {id: 'e', right: 5}
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
            resultA = nestedLoopFullOuterJoin(left, accessor, right, accessor),
            resultB = nestedLoopFullOuterJoin(right, accessor, left, accessor);
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
    describe('#nestedLoopInnerJoin()', function () {
        var nestedLoopInnerJoin = require('../lib/nestedLoop/nestedLoopInnerJoin'),
            expectedA = [
                {id: 'a', left: 1, right: 1},
                {id: 'a', left: 1, right: 2},
                {id: 'a', left: 2, right: 1},
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
            resultA = nestedLoopInnerJoin(left, accessor, right, accessor),
            resultB = nestedLoopInnerJoin(right, accessor, left, accessor);
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
    describe('#nestedLoopLeftAntiJoin()', function () {
        var nestedLoopLeftAntiJoin = require('../lib/nestedLoop/nestedLoopLeftAntiJoin'),
            expected = [
                {id: 'b', left: 3}
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
                {id: 'a', left: 1, right: 1},
                {id: 'a', left: 1, right: 2},
                {id: 'a', left: 2, right: 1},
                {id: 'a', left: 2, right: 2},
                {id: 'b', left: 3},
                {id: 'c', left: 4, right: 3}
            ],
            result = nestedLoopLeftOuterJoin(left, accessor, right, accessor);
        it('should return 6 rows', function () {
            assert.equal(6, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#nestedLoopLeftSemiJoin()', function () {
        var nestedLoopLeftSemiJoin = require('../lib/nestedLoop/nestedLoopLeftSemiJoin'),
            expected = [
                {id: 'a', left: 1},
                {id: 'a', left: 2},
                {id: 'c', left: 4}
            ],
            result = nestedLoopLeftSemiJoin(left, accessor, right, accessor);
        it('should return 3 rows', function () {
            assert.equal(3, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#nestedLoopRightAntiJoin()', function () {
        var nestedLoopRightAntiJoin = require('../lib/nestedLoop/nestedLoopRightAntiJoin'),
            expected = [
                {id: 'd', right: 4},
                {id: 'e', right: 5}
            ],
            result = nestedLoopRightAntiJoin(left, accessor, right, accessor);
        it('should return 2 rows', function () {
            assert.equal(2, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left anti join with right as the parent', function () {
            var nestedLoopLeftAntiJoin = require('../lib/nestedLoop/nestedLoopLeftAntiJoin');
            assert.equal(JSON.stringify(result),
                JSON.stringify(nestedLoopLeftAntiJoin(right, accessor, left, accessor)));
        });
    });
    describe('#nestedLoopRightOuterJoin()', function () {
        var nestedLoopRightOuterJoin = require('../lib/nestedLoop/nestedLoopRightOuterJoin'),
            expected = [
                {id: 'a', right: 1, left: 1},
                {id: 'a', right: 1, left: 2},
                {id: 'a', right: 2, left: 1},
                {id: 'a', right: 2, left: 2},
                {id: 'c', right: 3, left: 4},
                {id: 'd', right: 4},
                {id: 'e', right: 5}
            ],
            result = nestedLoopRightOuterJoin(left, accessor, right, accessor);
        it('should return 7 rows', function () {
            assert.equal(7, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left outer join with right as the parent', function () {
            var nestedLoopLeftOuterJoin = require('../lib/nestedLoop/nestedLoopLeftOuterJoin');
            assert.equal(JSON.stringify(result),
                JSON.stringify(nestedLoopLeftOuterJoin(right, accessor, left, accessor)));
        });
    });
    describe('#nestedLoopRightSemiJoin()', function () {
        var nestedLoopRightSemiJoin = require('../lib/nestedLoop/nestedLoopRightSemiJoin'),
            expected = [
                {id: 'a', right: 1},
                {id: 'a', right: 2},
                {id: 'c', right: 3}
            ],
            result = nestedLoopRightSemiJoin(left, accessor, right, accessor);
        it('should return 3 rows', function () {
            assert.equal(3, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left semi join with right as the parent', function () {
            var nestedLoopLeftSemiJoin = require('../lib/nestedLoop/nestedLoopLeftSemiJoin');
            assert.equal(JSON.stringify(result),
                JSON.stringify(nestedLoopLeftSemiJoin(right, accessor, left, accessor)));
        });
    });
});