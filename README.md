[![Stories in Ready](https://badge.waffle.io/mtraynham/lodash-joins.png?label=ready&title=Ready)](https://waffle.io/mtraynham/lodash-joins)
[![Build Status](https://travis-ci.org/mtraynham/lodash-joins.svg?branch=master)](https://travis-ci.org/mtraynham/lodash-joins)
[![Dependency Status](https://gemnasium.com/mtraynham/lodash-joins.svg)](https://gemnasium.com/mtraynham/lodash-joins)
[![Coverage Status](https://img.shields.io/coveralls/mtraynham/lodash-joins.svg)](https://coveralls.io/r/mtraynham/lodash-joins)
[![Code Climate](https://codeclimate.com/github/mtraynham/lodash-joins/badges/gpa.svg)](https://codeclimate.com/github/mtraynham/lodash-joins)
[![built with gulp](https://camo.githubusercontent.com/2a01d8fcbdfc09eb24d02c6655c897f0ab9ca69a/687474703a2f2f696d672e736869656c64732e696f2f62616467652f6275696c74253230776974682d67756c702e6a732d7265642e737667)](http://gulpjs.com)
#lodash-joins

## Contents

- [About](#about)
    - [Description](#description)
- [Implementations](#implementations)
    - [Supported Join Types](#supported-join-types)
    - [Usage](#usage)
    - [Available Functions](#available-functions)
        - [Example](#example)
- [Testing](#testing)
    - [Latest Benchmarks](#latest-benchmarks)
        - [Full Outer Joins](#full-outer-joins)
        - [Inner Joins](#inner-joins)
        - [Left Anti Joins](#left-anti-joins)
        - [Left Outer Joins](#left-outer-joins)
        - [Left Semi Joins](#left-semi-joins)
- [Future](#future)

## About
A library providing join algorithms for JavaScript Arrays.  LoDash is the only dependency and this library appends itself as an extension to that library.

Lodash already supports some standard SQL-like features:

* [_.pluck](http://lodash.com/docs#pluck) (ES6 could use destructuring assignments)
* [_.sortBy](http://lodash.com/docs#sortBy)
* [_.groupBy](http://lodash.com/docs#groupBy)
* [_.filter](http://lodash.com/docs#filter)

Limit and offset can be accomplished using [```Array.slice```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

### Description
These functions only work on arrays of objects (comparable to database rows).  Key comparisons are coercive, so Dates should work as well.

All joined rows are generated from LoDash's [```assign```](http://lodash.com/docs#assign) function, to avoid changing the original object reference:

    _.assign({}. leftRow, rightRow);

Otherwise the row is the same reference from the initial array.

Order of the output is indeterminate.

## Implementations
* [Nested Loop](http://en.wikipedia.org/wiki/Nested_loop_join)
* [Hash](http://en.wikipedia.org/wiki/Hash_join) (Uses LoDash _.groupBy to hash, thus key comparisons are String based)
* [Sorted Merge](http://en.wikipedia.org/wiki/Sort-merge_join)

### Supported Join Types
* [Full Outer-Joins](http://en.wikipedia.org/wiki/Join_(SQL)#Full_outer_join)
* [Inner-Joins](http://en.wikipedia.org/wiki/Join_(SQL)#Inner_join)
* [Left Anti-Joins](http://en.wikipedia.org/wiki/Relational_algebra#Antijoin_.28.E2.96.B7.29)
* [Left Outer-Joins](http://en.wikipedia.org/wiki/Join_(SQL)#Left_outer_join)
* [Left Semi-Joins](http://en.wikipedia.org/wiki/Relational_algebra#Semijoin_.28.E2.8B.89.29.28.E2.8B.8A.29)
* [Right Anti-Joins](http://en.wikipedia.org/wiki/Relational_algebra#Antijoin_.28.E2.96.B7.29)
* [Right Outer-Joins](http://en.wikipedia.org/wiki/Join_(SQL)#Right_outer_join)
* [Right Semi-Joins](http://en.wikipedia.org/wiki/Relational_algebra#Semijoin_.28.E2.8B.89.29.28.E2.8B.8A.29)

### Usage
Each join function accepts two arrays and two acccessor functions for each array that will act as the pluck function for key comparison.

    _.joinFunction(leftArray, leftKeyAccessor, rightArray, rightKeyAccessor);

### Available Functions
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

#### Example:
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

## Testing
Tested using mocha.  See the ```/test``` directory.

### Latest Benchmarks
Typically for the Inner & Outer joins, with larger arrays stick with the Sorted Merge, then Hash, then Nested.  With the
Anti & Semi joins, Nested can out perform when there is a small cardinality of keys, but Hash may be more efficient
since only one of the Arrays needs to be hashed.

#### Full Outer Joins
Running suite Full Outer Joins Large...

- Hash Join x 0.40 ops/sec ±3.37% (6 runs sampled)
- Sorted Merge Join x 2.25 ops/sec ±1.89% (10 runs sampled)
- Nested Loop Join x 0.39 ops/sec ±1.40% (5 runs sampled)

Fastest test is Sorted Merge Join at 5.7x faster than Nested Loop Join and Hash Join

Running suite Full Outer Joins Medium...

- Hash Join x 358 ops/sec ±1.82% (94 runs sampled)
- Sorted Merge Join x 339 ops/sec ±1.01% (93 runs sampled)
- Nested Loop Join x 253 ops/sec ±0.15% (94 runs sampled)

Fastest test is Hash Join at 1.06x faster than Sorted Merge Join

Running suite Full Outer Joins Small...

- Hash Join x 23,865 ops/sec ±0.42% (98 runs sampled)
- Sorted Merge Join x 20,354 ops/sec ±1.73% (94 runs sampled)
- Nested Loop Join x 18,838 ops/sec ±0.40% (101 runs sampled)

Fastest test is Hash Join at 1.17x faster than Sorted Merge Join

#### Inner Joins
Running suite Inner Joins Large...

- Hash Join x 0.42 ops/sec ±1.84% (6 runs sampled)
- Sorted Merge Join x 2.47 ops/sec ±1.69% (11 runs sampled)
- Nested Loop Join x 0.24 ops/sec ±9.85% (5 runs sampled)

Fastest test is Sorted Merge Join at 5.9x faster than Hash Join

Running suite Inner Joins Medium...

- Hash Join x 203 ops/sec ±17.04% (50 runs sampled)
- Sorted Merge Join x 361 ops/sec ±3.61% (89 runs sampled)
- Nested Loop Join x 273 ops/sec ±2.80% (90 runs sampled)

Fastest test is Sorted Merge Join at 1.78x faster than Hash Join and Nested Loop Join

Running suite Inner Joins Small...

- Hash Join x 25,679 ops/sec ±1.90% (99 runs sampled)
- Sorted Merge Join x 18,317 ops/sec ±0.93% (98 runs sampled)
- Nested Loop Join x 19,398 ops/sec ±0.23% (99 runs sampled)

Fastest test is Hash Join at 1.32x faster than Nested Loop Join

#### Left Anti Joins
Running suite Left Anti Joins Large...

- Hash Join x 4,000 ops/sec ±0.38% (98 runs sampled)
- Sorted Merge Join x 547 ops/sec ±2.38% (92 runs sampled)
- Nested Loop Join x 2,815 ops/sec ±0.33% (102 runs sampled)

Fastest test is Hash Join at 1.42x faster than Nested Loop Join

Running suite Left Anti Joins Medium...

- Hash Join x 37,990 ops/sec ±0.48% (101 runs sampled)
- Sorted Merge Join x 7,914 ops/sec ±0.65% (100 runs sampled)
- Nested Loop Join x 29,075 ops/sec ±1.41% (99 runs sampled)

Fastest test is Hash Join at 1.31x faster than Nested Loop Join

Running suite Left Anti Joins Small...

- Hash Join x 200,125 ops/sec ±13.05% (78 runs sampled)
- Sorted Merge Join x 99,719 ops/sec ±5.48% (95 runs sampled)
- Nested Loop Join x 238,297 ops/sec ±0.76% (98 runs sampled)

Fastest test is Nested Loop Join at 1.19x faster than Hash Join

#### Left Outer Joins
Running suite Left Outer Joins Large...

- Hash Join x 0.38 ops/sec ±15.38% (5 runs sampled)
- Sorted Merge Join x 2.38 ops/sec ±2.25% (10 runs sampled)
- Nested Loop Join x 0.19 ops/sec ±18.08% (5 runs sampled)

Fastest test is Sorted Merge Join at 6.2x faster than Hash Join

Running suite Left Outer Joins Medium...

- Hash Join x 316 ops/sec ±5.58% (82 runs sampled)
- Sorted Merge Join x 346 ops/sec ±1.50% (91 runs sampled)
- Nested Loop Join x 262 ops/sec ±1.23% (91 runs sampled)

Fastest tests are Sorted Merge Join,Hash Join at 1.10x faster than Hash Join

Running suite Left Outer Joins Small...

- Hash Join x 24,795 ops/sec ±0.94% (94 runs sampled)
- Sorted Merge Join x 18,073 ops/sec ±0.47% (98 runs sampled)
- Nested Loop Join x 19,287 ops/sec ±1.27% (97 runs sampled)

Fastest test is Hash Join at 1.29x faster than Nested Loop Join

#### Left Semi Joins
Running suite Left Semi Joins Large...

- Hash Join x 3,865 ops/sec ±0.28% (101 runs sampled)
- Sorted Merge Join x 487 ops/sec ±0.79% (94 runs sampled)
- Nested Loop Join x 1,576 ops/sec ±1.03% (88 runs sampled)

Fastest test is Hash Join at 2.5x faster than Nested Loop Join

Running suite Left Semi Joins Medium...

- Hash Join x 35,987 ops/sec ±0.93% (99 runs sampled)
- Sorted Merge Join x 7,070 ops/sec ±0.58% (102 runs sampled)
- Nested Loop Join x 21,173 ops/sec ±1.41% (84 runs sampled)

Fastest test is Hash Join at 1.70x faster than Nested Loop Join

Running suite Left Semi Joins Small...

- Hash Join x 233,031 ops/sec ±0.46% (94 runs sampled)
- Sorted Merge Join x 93,037 ops/sec ±0.23% (101 runs sampled)
- Nested Loop Join x 177,407 ops/sec ±1.62% (93 runs sampled)

Fastest test is Hash Join at 1.31x faster than Nested Loop Join


## Future
------
* Support for smart picking join implementations
* Better support for parent/child array selection
* Support LoDash chaining
* Rework Hash join object comparisons
* More tests!
