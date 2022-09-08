![Node.js CI](https://github.com/mtraynham/lodash-joins/workflows/test/badge.svg)

# lodash-joins

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

For merge-type joins, a merger function may be provided to customize the output array.  By default, all joined rows are generated from 
LoDash's [```assign```](http://lodash.com/docs#assign) function:

    _.assign({}, leftRow, rightRow);
    
A merger function takes both the left and right record and provides a new output record.  The left or right record may be
`null` in cases like outer joins which do not have matching row keys. 

Order of the output is indeterminate.

## Implementations
* [Nested Loop](http://en.wikipedia.org/wiki/Nested_loop_join)
* [Hash](http://en.wikipedia.org/wiki/Hash_join) - Uses LoDash _.groupBy to hash, thus key comparisons are String based
* [Sorted Merge](http://en.wikipedia.org/wiki/Sort-merge_join) -  Uses natural sort comparisons (`<`, `>`), and should expect keys of the same type ([#43](https://github.com/mtraynham/lodash-joins/issues/43))

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
Each join function accepts two arrays and two accessor functions for each array that will act as the pluck function for key comparison.

    _.joinFunction(leftArray, leftKeyAccessor, rightArray, rightKeyAccessor, merger);

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
    > var _ = require('lodash-joins');
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
Tested using [Jasmine](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/latest/index.html).  See the ```/spec``` directory.  There is also a browser test invoked through
Webpack and Mocha.

### Latest Benchmarks
Typically for the Inner & Outer joins, with larger arrays stick with the Sorted Merge, then Hash, then Nested.  With the
Anti & Semi joins, Nested can outperform when there is a small cardinality of keys, but Hash may be more efficient
since only one of the Arrays needs to be hashed.

Each suite performs three joins on randomly generated arrays with string keys.  The sizes 'Large', 'Medium' and 'Small'
correlate to the size of the join arrays being used, i.e. 1000, 100, 10 respectively.

#### Full Outer Joins
Running suite Full Outer Joins Large...
- Hash Join x 5.45 ops/sec ±2.85% (18 runs sampled)
- Sorted Merge Join x 21.05 ops/sec ±3.92% (40 runs sampled)
- Nested Loop Join x 4.54 ops/sec ±4.48% (16 runs sampled)
- Fastest is Sorted Merge Join

Running suite Full Outer Joins Medium...
- Hash Join x 3,841 ops/sec ±1.15% (92 runs sampled)
- Sorted Merge Join x 3,192 ops/sec ±0.61% (96 runs sampled)
- Nested Loop Join x 2,295 ops/sec ±1.82% (90 runs sampled)
- Fastest is Hash Join

Running suite Full Outer Joins Small...
- Hash Join x 130,893 ops/sec ±1.41% (96 runs sampled)
- Sorted Merge Join x 98,704 ops/sec ±1.66% (92 runs sampled)
- Nested Loop Join x 136,792 ops/sec ±0.65% (95 runs sampled)
- Fastest is Nested Loop Join

#### Inner Joins
Running suite Inner Joins Large...
- Hash Join x 4.63 ops/sec ±9.42% (16 runs sampled)
- Sorted Merge Join x 15.29 ops/sec ±6.01% (43 runs sampled)
- Nested Loop Join x 4.41 ops/sec ±5.68% (16 runs sampled)
- Fastest is Sorted Merge Join

Running suite Inner Joins Medium...
- Hash Join x 3,970 ops/sec ±0.30% (97 runs sampled)
- Sorted Merge Join x 3,086 ops/sec ±0.78% (96 runs sampled)
- Nested Loop Join x 2,452 ops/sec ±1.26% (95 runs sampled)
- Fastest is Hash Join

Running suite Inner Joins Small...
- Hash Join x 255,618 ops/sec ±0.45% (94 runs sampled)
- Sorted Merge Join x 142,653 ops/sec ±0.54% (92 runs sampled)
- Nested Loop Join x 232,739 ops/sec ±0.59% (97 runs sampled)
- Fastest is Hash Join

#### Left Anti Joins
Running suite Left Anti Joins Large...
- Hash Join x 15,104 ops/sec ±1.18% (97 runs sampled)
- Sorted Merge Join x 2,755 ops/sec ±0.27% (99 runs sampled)
- Nested Loop Join x 18,295 ops/sec ±1.84% (89 runs sampled)
- Fastest is Nested Loop Join

Running suite Left Anti Joins Medium...
- Hash Join x 147,805 ops/sec ±1.86% (88 runs sampled)
- Sorted Merge Join x 33,078 ops/sec ±0.87% (96 runs sampled)
- Nested Loop Join x 250,000 ops/sec ±0.83% (94 runs sampled)
- Fastest is Nested Loop Join

Running suite Left Anti Joins Small...
- Hash Join x 1,421,230 ops/sec ±1.02% (96 runs sampled)
- Sorted Merge Join x 468,908 ops/sec ±0.45% (99 runs sampled)
- Nested Loop Join x 2,111,985 ops/sec ±1.77% (92 runs sampled)
- Fastest is Nested Loop Join

### Left Outer Joins
Running suite Left Outer Joins Large...
- Hash Join x 4.92 ops/sec ±4.17% (17 runs sampled)
- Sorted Merge Join x 17.43 ops/sec ±4.73% (49 runs sampled)
- Nested Loop Join x 4.26 ops/sec ±5.10% (15 runs sampled)
- Fastest is Sorted Merge Join

Running suite Left Outer Joins Medium...
- Hash Join x 3,854 ops/sec ±2.16% (88 runs sampled)
- Sorted Merge Join x 3,108 ops/sec ±0.58% (97 runs sampled)
- Nested Loop Join x 2,339 ops/sec ±0.98% (96 runs sampled)
- Fastest is Hash Join

Running suite Left Outer Joins Small...
- Hash Join x 200,502 ops/sec ±1.04% (96 runs sampled)
- Sorted Merge Join x 119,723 ops/sec ±0.44% (95 runs sampled)
- Nested Loop Join x 165,741 ops/sec ±0.34% (93 runs sampled)
- Fastest is Hash Join

#### Left Semi Joins
Running suite Left Semi Joins Large...
- Hash Join x 13,379 ops/sec ±1.92% (89 runs sampled)
- Sorted Merge Join x 2,414 ops/sec ±1.10% (94 runs sampled)
- Nested Loop Join x 22,084 ops/sec ±1.26% (93 runs sampled)
- Fastest is Nested Loop Join

Running suite Left Semi Joins Medium...
- Hash Join x 147,064 ops/sec ±0.47% (95 runs sampled)
- Sorted Merge Join x 31,176 ops/sec ±0.60% (95 runs sampled)
- Nested Loop Join x 99,841 ops/sec ±2.38% (90 runs sampled)
- Fastest is Hash Join

Running suite Left Semi Joins Small...
- Hash Join x 1,301,283 ops/sec ±1.51% (94 runs sampled)
- Sorted Merge Join x 409,401 ops/sec ±0.26% (96 runs sampled)
- Nested Loop Join x 1,749,187 ops/sec ±0.92% (95 runs sampled)
- Fastest is Nested Loop Join


## Future
* Support for smart picking join implementations
* Rework Hash join object comparisons
* More tests!
