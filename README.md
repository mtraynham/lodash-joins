![Node.js CI](https://github.com/mtraynham/lodash-joins/workflows/test/badge.svg)
[![Join the chat at https://gitter.im/mtraynham/lodash-joins](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mtraynham/lodash-joins?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# lodash-joins

## Contents

- [About](#about)
    - [Description](#description)
- [Implementations](#implementations)
    - [Supported Join Types](#supported-join-types)
    - [Usage](#usage)
    - [Available Functions](#available-functions)
        - [Example](#example)
    - [ES6 Note](#babel-note)
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

### Babel Note
The `main` file for npm point to a [Webpack](http://webpack.github.io/) build that includes the necessary
[babel-regenerator-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) functions to properly execute the script.
The npm module still includes the `index.js` file and `lib` directory to require the functions independently, but you
are on your own to install `babel` as well and invoke the runtime beforehand.

A simple way to do this is:
```
$ npm install --save babel
$ node
> require('@babel/runtime');
> var hashLeftOuterJoin = require('lodash-joins/lib/hash/hashLeftOuterJoin');
```

It's likely better to just use the library as intended.  :smile:

## Testing
Tested using [Jasmine](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/latest/index.html).  See the ```/spec``` directory.  There is also a browser test invoked through
Webpack and Mocha.

### Latest Benchmarks
Typically for the Inner & Outer joins, with larger arrays stick with the Sorted Merge, then Hash, then Nested.  With the
Anti & Semi joins, Nested can out perform when there is a small cardinality of keys, but Hash may be more efficient
since only one of the Arrays needs to be hashed.

Tests were run using Node v5.3.0.

Each suite performs three joins on randomly generated arrays with string keys.  The sizes 'Large', 'Medium' and 'Small'
correlate to the size of the join arrays being used, i.e. 1000, 100, 10 respectively.

#### Full Outer Joins
Running suite Full Outer Joins Large...

- Hash Join x 1.39 ops/sec ±2.60% (8 runs sampled)
- Sorted Merge Join x 4.41 ops/sec ±1.79% (15 runs sampled)
- Nested Loop Join x 1.26 ops/sec ±3.46% (8 runs sampled)

Fastest test is Sorted Merge Join at 3.2x faster than Hash Join

Running suite Full Outer Joins Medium...

- Hash Join x 586 ops/sec ±2.15% (96 runs sampled)
- Sorted Merge Join x 528 ops/sec ±0.50% (95 runs sampled)
- Nested Loop Join x 406 ops/sec ±0.51% (96 runs sampled)

Fastest test is Hash Join at 1.11x faster than Sorted Merge Join

Running suite Full Outer Joins Small...

- Hash Join x 33,906 ops/sec ±0.47% (98 runs sampled)
- Sorted Merge Join x 19,541 ops/sec ±4.74% (75 runs sampled)
- Nested Loop Join x 23,448 ops/sec ±1.48% (94 runs sampled)

Fastest test is Hash Join at 1.45x faster than Nested Loop Join

#### Inner Joins
Running suite Inner Joins Large...

- Hash Join x 1.28 ops/sec ±7.35% (8 runs sampled)
- Sorted Merge Join x 4.21 ops/sec ±2.39% (15 runs sampled)
- Nested Loop Join x 1.25 ops/sec ±1.18% (8 runs sampled)

Fastest test is Sorted Merge Join at 3.4x faster than Nested Loop Join

Running suite Inner Joins Medium...

- Hash Join x 570 ops/sec ±1.57% (97 runs sampled)
- Sorted Merge Join x 511 ops/sec ±0.45% (95 runs sampled)
- Nested Loop Join x 407 ops/sec ±0.43% (97 runs sampled)

Fastest test is Hash Join at 1.12x faster than Sorted Merge Join

Running suite Inner Joins Small...

- Hash Join x 45,350 ops/sec ±0.56% (97 runs sampled)
- Sorted Merge Join x 17,038 ops/sec ±2.10% (92 runs sampled)
- Nested Loop Join x 29,532 ops/sec ±1.35% (98 runs sampled)

Fastest test is Hash Join at 1.54x faster than Nested Loop Join

#### Left Anti Joins
Running suite Left Anti Joins Large...

- Hash Join x 9,069 ops/sec ±0.47% (100 runs sampled)
- Sorted Merge Join x 956 ops/sec ±2.22% (93 runs sampled)
- Nested Loop Join x 6,560 ops/sec ±0.53% (96 runs sampled)

Fastest test is Hash Join at 1.38x faster than Nested Loop Join

Running suite Left Anti Joins Medium...

- Hash Join x 87,509 ops/sec ±0.64% (99 runs sampled)
- Sorted Merge Join x 12,587 ops/sec ±0.70% (99 runs sampled)
- Nested Loop Join x 63,211 ops/sec ±0.54% (98 runs sampled)

Fastest test is Hash Join at 1.38x faster than Nested Loop Join

Running suite Left Anti Joins Small...

- Hash Join x 650,783 ops/sec ±0.91% (97 runs sampled)
- Sorted Merge Join x 106,545 ops/sec ±2.59% (95 runs sampled)
- Nested Loop Join x 688,611 ops/sec ±0.69% (95 runs sampled)

Fastest test is Nested Loop Join at 1.06x faster than Hash Join

#### Left Outer Joins
Running suite Left Outer Joins Large...

- Hash Join x 1.30 ops/sec ±14.08% (8 runs sampled)
- Sorted Merge Join x 4.31 ops/sec ±2.37% (15 runs sampled)
- Nested Loop Join x 1.21 ops/sec ±4.50% (7 runs sampled)

Fastest test is Sorted Merge Join at 3.6x faster than Nested Loop Join

Running suite Left Outer Joins Medium...

- Hash Join x 507 ops/sec ±5.73% (94 runs sampled)
- Sorted Merge Join x 499 ops/sec ±0.48% (97 runs sampled)
- Nested Loop Join x 388 ops/sec ±0.48% (91 runs sampled)
Fastest test is Sorted Merge Join at 0.98x faster than Hash Join

Running suite Left Outer Joins Small...

- Hash Join x 42,728 ops/sec ±1.74% (97 runs sampled)
- Sorted Merge Join x 18,222 ops/sec ±0.40% (99 runs sampled)
- Nested Loop Join x 26,640 ops/sec ±3.21% (91 runs sampled)

Fastest test is Hash Join at 1.60x faster than Nested Loop Join

#### Left Semi Joins
Running suite Left Semi Joins Large...

- Hash Join x 8,573 ops/sec ±1.05% (100 runs sampled)
- Sorted Merge Join x 754 ops/sec ±4.15% (85 runs sampled)
- Nested Loop Join x 6,061 ops/sec ±0.64% (97 runs sampled)

Fastest test is Hash Join at 1.41x faster than Nested Loop Join

Running suite Left Semi Joins Medium...

- Hash Join x 82,541 ops/sec ±1.34% (100 runs sampled)
- Sorted Merge Join x 11,076 ops/sec ±0.95% (99 runs sampled)
- Nested Loop Join x 44,804 ops/sec ±0.60% (100 runs sampled)

Fastest test is Hash Join at 1.84x faster than Nested Loop Join

Running suite Left Semi Joins Small...

- Hash Join x 753,035 ops/sec ±0.63% (96 runs sampled)
- Sorted Merge Join x 94,891 ops/sec ±1.76% (93 runs sampled)
- Nested Loop Join x 615,382 ops/sec ±0.82% (95 runs sampled)

Fastest test is Hash Join at 1.22x faster than Nested Loop Join


## Future
------
* Support for smart picking join implementations
* Rework Hash join object comparisons
* More tests!
