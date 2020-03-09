import Chance from 'chance';
import assign from 'lodash/assign';

import {Join} from '../../lib/typings';

interface Row {
    id: string;
}

interface ChanceExtended extends Chance.Chance {
    row(): Row;
}

interface Suite {
    name: string;
    tests: {[key: string]: () => Row[]};
}

/**
 * Generate a join bench test.
 */
export default function joinBench (
    name: string,
    size: number,
    hashJoin: Join<Row, Row, string, Row>,
    sortedMergeJoin: Join<Row, Row, string, Row>,
    nestedLoopJoin: Join<Row, Row, string, Row>
): Suite {
    const chance: ChanceExtended = new Chance() as ChanceExtended;
    chance.mixin({row: (): Row => ({id: chance.character({pool: 'aeiouy'})})});
    const left: Row[] = chance.n(chance.row, size),
        right: Row[] = chance.n(chance.row, size),
        accessor = (obj: Row): string => obj.id,
        merger = (a: Row, b: Row): Row => assign({}, a, b);
    return {
        name,
        tests: {
            'Hash Join': (): Row[] => hashJoin(left, accessor, right, accessor, merger),
            'Sorted Merge Join': (): Row[] => sortedMergeJoin(left, accessor, right, accessor, merger),
            'Nested Loop Join': (): Row[] => nestedLoopJoin(left, accessor, right, accessor, merger)
        }
    };
}
