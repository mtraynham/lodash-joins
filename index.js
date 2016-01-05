import {runInContext} from 'lodash';
import joinWrapper from './lib/joinWrapper';

let _ = runInContext();

import cartesianProduct from './lib/cartesianProduct';
_.mixin({'cartesianProduct': cartesianProduct});

import hashFullOuterJoin from './lib/hash/hashFullOuterJoin';
_.mixin({'hashFullOuterJoin': joinWrapper(hashFullOuterJoin)});
import hashInnerJoin from './lib/hash/hashInnerJoin';
_.mixin({'hashInnerJoin': joinWrapper(hashInnerJoin)});
import hashLeftOuterJoin from './lib/hash/hashLeftOuterJoin';
_.mixin({'hashLeftOuterJoin': joinWrapper(hashLeftOuterJoin)});
import hashLeftSemiJoin from './lib/hash/hashLeftSemiJoin';
_.mixin({'hashLeftSemiJoin': joinWrapper(hashLeftSemiJoin)});
import hashLeftAntiJoin from './lib/hash/hashLeftAntiJoin';
_.mixin({'hashLeftAntiJoin': joinWrapper(hashLeftAntiJoin)});
import hashRightOuterJoin from './lib/hash/hashRightOuterJoin';
_.mixin({'hashRightOuterJoin': joinWrapper(hashRightOuterJoin)});
import hashRightSemiJoin from './lib/hash/hashRightSemiJoin';
_.mixin({'hashRightSemiJoin': joinWrapper(hashRightSemiJoin)});
import hashRightAntiJoin from './lib/hash/hashRightAntiJoin';
_.mixin({'hashRightAntiJoin': joinWrapper(hashRightAntiJoin)});

import sortedMergeFullOuterJoin from './lib/sortedMerge/sortedMergeFullOuterJoin';
_.mixin({'sortedMergeFullOuterJoin': joinWrapper(sortedMergeFullOuterJoin)});
import sortedMergeInnerJoin from './lib/sortedMerge/sortedMergeInnerJoin';
_.mixin({'sortedMergeInnerJoin': joinWrapper(sortedMergeInnerJoin)});
import sortedMergeLeftOuterJoin from './lib/sortedMerge/sortedMergeLeftOuterJoin';
_.mixin({'sortedMergeLeftOuterJoin': joinWrapper(sortedMergeLeftOuterJoin)});
import sortedMergeLeftSemiJoin from './lib/sortedMerge/sortedMergeLeftSemiJoin';
_.mixin({'sortedMergeLeftSemiJoin': joinWrapper(sortedMergeLeftSemiJoin)});
import sortedMergeLeftAntiJoin from './lib/sortedMerge/sortedMergeLeftAntiJoin';
_.mixin({'sortedMergeLeftAntiJoin': joinWrapper(sortedMergeLeftAntiJoin)});
import sortedMergeRightOuterJoin from './lib/sortedMerge/sortedMergeRightOuterJoin';
_.mixin({'sortedMergeRightOuterJoin': joinWrapper(sortedMergeRightOuterJoin)});
import sortedMergeRightSemiJoin from './lib/sortedMerge/sortedMergeRightSemiJoin';
_.mixin({'sortedMergeRightSemiJoin': joinWrapper(sortedMergeRightSemiJoin)});
import sortedMergeRightAntiJoin from './lib/sortedMerge/sortedMergeRightAntiJoin';
_.mixin({'sortedMergeRightAntiJoin': joinWrapper(sortedMergeRightAntiJoin)});

import nestedLoopFullOuterJoin from './lib/nestedLoop/nestedLoopFullOuterJoin';
_.mixin({'nestedLoopFullOuterJoin': joinWrapper(nestedLoopFullOuterJoin)});
import nestedLoopInnerJoin from './lib/nestedLoop/nestedLoopInnerJoin';
_.mixin({'nestedLoopInnerJoin': joinWrapper(nestedLoopInnerJoin)});
import nestedLoopLeftOuterJoin from './lib/nestedLoop/nestedLoopLeftOuterJoin';
_.mixin({'nestedLoopLeftOuterJoin': joinWrapper(nestedLoopLeftOuterJoin)});
import nestedLoopLeftSemiJoin from './lib/nestedLoop/nestedLoopLeftSemiJoin';
_.mixin({'nestedLoopLeftSemiJoin': joinWrapper(nestedLoopLeftSemiJoin)});
import nestedLoopLeftAntiJoin from './lib/nestedLoop/nestedLoopLeftAntiJoin';
_.mixin({'nestedLoopLeftAntiJoin': joinWrapper(nestedLoopLeftAntiJoin)});
import nestedLoopRightOuterJoin from './lib/nestedLoop/nestedLoopRightOuterJoin';
_.mixin({'nestedLoopRightOuterJoin': joinWrapper(nestedLoopRightOuterJoin)});
import nestedLoopRightSemiJoin from './lib/nestedLoop/nestedLoopRightSemiJoin';
_.mixin({'nestedLoopRightSemiJoin': joinWrapper(nestedLoopRightSemiJoin)});
import nestedLoopRightAntiJoin from './lib/nestedLoop/nestedLoopRightAntiJoin';
_.mixin({'nestedLoopRightAntiJoin': joinWrapper(nestedLoopRightAntiJoin)});

// Temporary hack?  Don't know why the Babel folks are straying from the ES6 spec.
// https://phabricator.babeljs.io/T2212
// https://www.npmjs.com/package/babel-plugin-add-module-exports
//
// This is the only public facing default export, so I'm only making the change here.
// All of the other ones should be handled by babel directly and still work.
// appropriately.
export default _;
module.exports = exports['default'];
