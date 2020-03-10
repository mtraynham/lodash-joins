import {Event, Suite} from 'benchmark';
import Chance from 'chance';
import assign from 'lodash/assign';

import {
    Join,
    hashLeftSemiJoin,
    hashLeftOuterJoin,
    hashLeftAntiJoin,
    hashInnerJoin,
    hashFullOuterJoin,
    nestedLoopLeftSemiJoin,
    nestedLoopLeftOuterJoin,
    nestedLoopLeftAntiJoin,
    nestedLoopInnerJoin,
    nestedLoopFullOuterJoin,
    sortedMergeLeftSemiJoin,
    sortedMergeLeftOuterJoin,
    sortedMergeLeftAntiJoin,
    sortedMergeInnerJoin,
    sortedMergeFullOuterJoin
} from '../lib';

interface Row {
    id: string;
}

type BenchJoin = Join<Row, Row, string, Row>;

interface ChanceExtended extends Chance.Chance {
    row(): Row;
}

/**
 * Generate a join bench test.
 */
export default function joinBench (
    name: string,
    size: number,
    hashJoin: BenchJoin,
    sortedMergeJoin: BenchJoin,
    nestedLoopJoin: BenchJoin
): Suite {
    const chance: ChanceExtended = new Chance() as ChanceExtended;
    chance.mixin({row: (): Row => ({id: chance.character({pool: 'aeiouy'})})});
    const left: Row[] = chance.n(chance.row, size),
        right: Row[] = chance.n(chance.row, size),
        accessor = (obj: Row): string => obj.id,
        merger = (a: Row, b: Row): Row => assign({}, a, b);
    return (new Suite(name))
        .add('Hash Join', (): Row[] => hashJoin(left, accessor, right, accessor, merger))
        .add('Sorted Merge Join', (): Row[] => sortedMergeJoin(left, accessor, right, accessor, merger))
        .add('Nested Loop Join', (): Row[] => nestedLoopJoin(left, accessor, right, accessor, merger))
        .on('start', function () {
            console.log(`Running suite ${name}...`);
        })
        .on('cycle', function(this: Suite, event: Event) {
            console.log(String(event.target));
        })
        .on('complete', function(this: Suite) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            console.log('Fastest is ' + this.filter('fastest').map((d: any) => d.name));
            console.log('\n');
        });
}

const joinTests: {name: string; joins: [BenchJoin, BenchJoin, BenchJoin]}[] = [
    {
        name: 'Full Outer Joins',
        joins: [hashFullOuterJoin, sortedMergeFullOuterJoin, nestedLoopFullOuterJoin]
    },
    {
        name: 'Inner Joins',
        joins: [hashInnerJoin, sortedMergeInnerJoin, nestedLoopInnerJoin]
    },
    {
        name: 'Left Anti Joins',
        joins: [hashLeftAntiJoin, sortedMergeLeftAntiJoin, nestedLoopLeftAntiJoin]
    },
    {
        name: 'Left Outer Joins',
        joins: [hashLeftOuterJoin, sortedMergeLeftOuterJoin, nestedLoopLeftOuterJoin]
    },
    {
        name: 'Left Semi Joins',
        joins: [hashLeftSemiJoin, sortedMergeLeftSemiJoin, nestedLoopLeftSemiJoin]
    }
];

const sizeTests: {name: string; size: number}[] = [
    {name: 'Large', size: 1000},
    {name: 'Medium', size: 100},
    {name: 'Small', size: 10}
];

for (const joinTest of joinTests) {
    for (const sizeTest of sizeTests) {
        joinBench(
            `${joinTest.name} ${sizeTest.name}`,
            sizeTest.size,
            ...joinTest.joins
        ).run();
    }
}
