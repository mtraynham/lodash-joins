var assert = require('assert');

describe('Sorted Merge Joins', function () {
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
    describe('#sortedMergeFullOuterJoin()', function () {
        var sortedMergeFullOuterJoin = require('../lib/sortedMerge/sortedMergeFullOuterJoin'),
            expectedA = [
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
            resultB = sortedMergeFullOuterJoin(right, accessor, left, accessor);
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
    describe('#sortedMergeInnerJoin()', function () {
        var sortedMergeInnerJoin = require('../lib/sortedMerge/sortedMergeInnerJoin'),
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
            resultA = sortedMergeInnerJoin(left, accessor, right, accessor),
            resultB = sortedMergeInnerJoin(right, accessor, left, accessor);
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
    describe('#sortedMergeLeftAntiJoin()', function () {
        var sortedMergeLeftAntiJoin = require('../lib/sortedMerge/sortedMergeLeftAntiJoin'),
            expected = [
                {id: 'e', left: 2}
            ],
            result = sortedMergeLeftAntiJoin(left, accessor, right, accessor);
        it('should return 1 rows', function () {
            assert.equal(1, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#sortedMergeLeftOuterJoin()', function () {
        var sortedMergeLeftOuterJoin = require('../lib/sortedMerge/sortedMergeLeftOuterJoin'),
            expected = [
                {id: 'c', left: 0, right: 2},
                {id: 'c', left: 0, right: 3},
                {id: 'c', left: 1, right: 2},
                {id: 'c', left: 1, right: 3},
                {id: 'e', left: 2}
            ],
            result = sortedMergeLeftOuterJoin(left, accessor, right, accessor);
        it('should return 5 rows', function () {
            assert.equal(5, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#sortedMergeLeftSemiJoin()', function () {
        var sortedMergeLeftSemiJoin = require('../lib/sortedMerge/sortedMergeLeftSemiJoin'),
            expected = [
                {id: 'c', left: 0},
                {id: 'c', left: 1}
            ],
            result = sortedMergeLeftSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', function () {
            assert.equal(2, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
    });
    describe('#sortedMergeRightAntiJoin()', function () {
        var sortedMergeRightAntiJoin = require('../lib/sortedMerge/sortedMergeRightAntiJoin'),
            expected = [
                {id: 'a', right: 0},
                {id: 'b', right: 1},
                {id: 'd', right: 4},
                {id: 'f', right: 5},
                {id: 'g', right: 6}
            ],
            result = sortedMergeRightAntiJoin(left, accessor, right, accessor);
        it('should return 5 rows', function () {
            assert.equal(5, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left anti join with right as the parent', function () {
            var sortedMergeLeftAntiJoin = require('../lib/sortedMerge/sortedMergeLeftAntiJoin');
            assert.equal(JSON.stringify(result),
                JSON.stringify(sortedMergeLeftAntiJoin(right, accessor, left, accessor)));
        });
    });
    describe('#sortedMergeRightOuterJoin()', function () {
        var sortedMergeRightOuterJoin = require('../lib/sortedMerge/sortedMergeRightOuterJoin'),
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
            result = sortedMergeRightOuterJoin(left, accessor, right, accessor);
        it('should return 9 rows', function () {
            assert.equal(9, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left outer join with right as the parent', function () {
            var sortedMergeLeftOuterJoin = require('../lib/sortedMerge/sortedMergeLeftOuterJoin');
            assert.equal(JSON.stringify(result),
                JSON.stringify(sortedMergeLeftOuterJoin(right, accessor, left, accessor)));
        });
    });
    describe('#sortedMergeRightSemiJoin()', function () {
        var sortedMergeRightSemiJoin = require('../lib/sortedMerge/sortedMergeRightSemiJoin'),
            expected = [
                {id: 'c', right: 2},
                {id: 'c', right: 3}
            ],
            result = sortedMergeRightSemiJoin(left, accessor, right, accessor);
        it('should return 2 rows', function () {
            assert.equal(2, result.length);
        });
        it('should match the expected output', function () {
            assert.equal(JSON.stringify(expected), JSON.stringify(result));
        });
        it('should match the left semi join with right as the parent', function () {
            var sortedMergeLeftSemiJoin = require('../lib/sortedMerge/sortedMergeLeftSemiJoin');
            assert.equal(JSON.stringify(result),
                JSON.stringify(sortedMergeLeftSemiJoin(right, accessor, left, accessor)));
        });
    });
});