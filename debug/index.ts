import Chance from 'chance';
import assign from 'lodash/assign';
import {
    hashLeftOuterJoin,
    sortedMergeFullOuterJoin,
    nestedLoopLeftOuterJoin
} from '../index';

interface Row {
    date: Date;
    vowels: string;
    county: string;
    age: number;
    bool: boolean;
    float: number;
    integer: number;
    positiveInteger: number;
    string: string;
}

interface ChanceExtended extends Chance.Chance {
    row(): Row;
}

// Test Data
const chance: ChanceExtended = new Chance() as ChanceExtended;
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

const left: Row[] = chance.n(chance.row, 100);
const right: Row[] = chance.n(chance.row, 100);
const accessor = (d: Row): number => d.age;
const merger = (a: Row, b: Row): Row => assign({}, a, b);

let results: Row[] = hashLeftOuterJoin(left, accessor, right, accessor, merger);
console.log(results);
results = sortedMergeFullOuterJoin(left, accessor, right, accessor, merger);
console.log(results);
results = nestedLoopLeftOuterJoin(left, accessor, right, accessor, merger);
console.log(results);
