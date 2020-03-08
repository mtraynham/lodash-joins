import {Accessor} from '../../typings';

export interface Sublist<Row, Key> {
    rows: Row[];
    key: Key;
}

/**
 * From a sorted list, yield a subList where the accessor values are the same.
 */
export default function* yieldRightSubList<Row, Key>(
    sortedList: Row[],
    accessor: Accessor<Row, Key>
): Generator<Sublist<Row, Key>> {
    if (sortedList.length === 1) {
        yield {rows: sortedList, key: accessor(sortedList[sortedList.length - 1])};
    } else {
        let i: number = sortedList.length,
            rows: Row[] = [sortedList[--i]],
            key: Key = accessor(rows[0]),
            tmpKey: Key;
        // for each subsequent value, we'll yield when there is a
        // new tmpVal that is not equal the current val
        while (i--) {
            tmpKey = accessor(sortedList[i]);
            if (key <= tmpKey && key >= tmpKey) {
                rows.unshift(sortedList[i]);
            } else {
                yield {rows, key};
                rows = [sortedList[i]];
                key = tmpKey;
            }
        }
        yield {rows, key};
    }
}
