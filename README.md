lodash-joins
============
A library providing SQL-like joins for JavaScript Arrays.  LoDash is the only dependency and this library appends itself as an extension to that library.

Lodash already supports some standard SQL-like features:

* [_.pluck](http://lodash.com/docs#pluck) (ES6 could use destructuring assignments)
* [_.sortBy](http://lodash.com/docs#sortBy)
* [_.groupBy](http://lodash.com/docs#groupBy)
* [_.filter](http://lodash.com/docs#filter)

Limit and offset can be accomplished using [```Array.slice```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

Description
-----------
These functions only act on arrays of objects (comparable to database rows).  Key comparisons are coercive, so Dates should work as well.

All joined rows are generated from LoDash's [```assign```](http://lodash.com/docs#assign) function, to avoid changing the original object reference:

    _.assign({}. leftRow, rightRow);

Otherwise the row is the same reference from the initial array.

Order of the output is indeterminate.

Implementations
---------------
* [Nested Loop](http://en.wikipedia.org/wiki/Nested_loop_join)
* [Hash](http://en.wikipedia.org/wiki/Hash_join)
* [Sorted Merge](http://en.wikipedia.org/wiki/Sort-merge_join)

Supported Join Types
--------------------
* [Full Outer-Joins](http://en.wikipedia.org/wiki/Join_(SQL)#Full_outer_join)
* [Inner-Joins](http://en.wikipedia.org/wiki/Join_(SQL)#Inner_join)
* [Left Anti-Joins](http://en.wikipedia.org/wiki/Relational_algebra#Antijoin_.28.E2.96.B7.29)
* [Left Outer-Joins](http://en.wikipedia.org/wiki/Join_(SQL)#Left_outer_join)
* [Left Semi-Joins](http://en.wikipedia.org/wiki/Relational_algebra#Semijoin_.28.E2.8B.89.29.28.E2.8B.8A.29)
* [Right Anti-Joins](http://en.wikipedia.org/wiki/Relational_algebra#Antijoin_.28.E2.96.B7.29)
* [Right Outer-Joins](http://en.wikipedia.org/wiki/Join_(SQL)#Right_outer_join)
* [Right Semi-Joins](http://en.wikipedia.org/wiki/Relational_algebra#Semijoin_.28.E2.8B.89.29.28.E2.8B.8A.29)

Usage
-----
Each join function expects two arrays and an acccessor function for each array that will act as the key-comparator.

    _.joinFunction(leftArray, leftKeyAccessor, rightArray, rightKeyAccessor);

Available Functions
-------------------
* _.hashFullOuterJoin
* _.hashInnerJoin
* _.hashLeftOuterJoin
* _.hashLeftSemiJoin
* _.hashRightOuterJoin
* _.hashRightSemiJoin
* _.nestedLoopFullOuterJoin
* _.nestedLoopInnerJoin
* _.nestedLoopLeftOuterJoin
* _.nestedLoopLeftSemiJoin
* _.nestedLoopRightOuterJoin
* _.nestedLoopRightSemiJoin
* _.sortedMergeFullOuterJoin
* _.sortedMergeInnerJoin
* _.sortedMergeLeftOuterJoin
* _.sortedMergeLeftSemiJoin
* _.sortedMergeRightOuterJoin
* _.sortedMergeRightSemiJoin

Example:
--------
    > var _ = require('index.js');
    > var left = [
    ...       {id: 'c', left: 0},
    ...       {id: 'c', left: 1},
    ...       {id: 'e', left: 2},
    ...   ],
    ...   right = [
    ...       {id: 'a', right: 0},
    ...       {id: 'b', right: 1},
    ...       {id: 'c', right: 2},
    ...       {id: 'c', right: 3},
    ...       {id: 'd', right: 4},
    ...       {id: 'f', right: 5},
    ...       {id: 'g', right: 6}
    ...   ],
    ...   accessor = function (obj) {
    ...       return obj['id'];
    ...   };
    >
    > var a = _.hashInnerJoin(left, accessor, right, accessor);
    undefined
    > a
    [ { id: 'c', left: 0, right: 2 },
      { id: 'c', left: 1, right: 2 },
      { id: 'c', left: 0, right: 3 },
      { id: 'c', left: 1, right: 3 } ]
    >
    > var b = _.nestedLoopLeftOuterJoin(left, accessor, right, accessor);
    undefined
    > b
    [ { id: 'c', left: 0, right: 2 },
      { id: 'c', left: 0, right: 3 },
      { id: 'c', left: 1, right: 2 },
      { id: 'c', left: 1, right: 3 },
      { id: 'e', left: 2 } ]
    >
    > var c = _.sortedMergeFullOuterJoin(left, accessor, right, accessor);
    undefined
    > c
    [ { id: 'a', right: 0 },
      { id: 'b', right: 1 },
      { id: 'c', left: 0, right: 2 },
      { id: 'c', left: 0, right: 3 },
      { id: 'c', left: 1, right: 2 },
      { id: 'c', left: 1, right: 3 },
      { id: 'd', right: 4 },
      { id: 'e', left: 2 },
      { id: 'f', right: 5 },
      { id: 'g', right: 6 } ]

Testing
-------
Tested using mocha.  See the ```/test``` directory.

Future
------
* Support for smart picking join implementations
* Better support for parent/child array selection
* Support LoDash chaining
* More tests!
