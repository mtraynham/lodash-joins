import Chance from 'chance';
import assign from 'lodash/assign';
import {
    hashLeftOuterJoin,
    sortedMergeFullOuterJoin,
    nestedLoopLeftOuterJoin
} from '../index';

// Test Data
const chance = new Chance();
chance.mixin({row: () => ({
    date: chance.date({year: 2016}),
    vowels: chance.character({pool: 'aeiouy'}),
    county: chance.country(),
    age: chance.age({type: 'adult'}),
    bool: chance.bool(),
    float: chance.floating({min: -25, max: 25}),
    integer: chance.integer({min: -25, max: 25}),
    positiveInteger: chance.integer({min: 0, max: 25}),
    string: chance.string({length: 4})
})});

const left = chance.n(chance.row, 100);
const right = chance.n(chance.row, 100);
const accessor = d => d.age;
const merger = (a, b) => assign({}, a, b);

let results = hashLeftOuterJoin(left, accessor, right, accessor, merger);
console.log(results);
results = sortedMergeFullOuterJoin(left, accessor, right, accessor, merger);
console.log(results);
results = nestedLoopLeftOuterJoin(left, accessor, right, accessor, merger);
console.log(results);
