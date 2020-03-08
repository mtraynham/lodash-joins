import assign from 'lodash/assign';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import property from 'lodash/property';

import {Accessor, Join, Merger} from './typings';

/**
 * Get an accessor function from an object.  If it's a string or an array, use _.property.
 */
function getAccessor<Row, Key>(
    obj: Accessor<Row, Key> | string | string[]
): Accessor<Row, Key> {
    return isString(obj) || isArray(obj) ?
        property(obj) :
        obj;
}

/**
 * Wrap a join function to process inputs in a more succinct manner.
 */
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/consistent-type-assertions */
export function joinWrapper<LeftRow, Key>(
    joinFn: Join<LeftRow, LeftRow, Key, LeftRow>
): Join<LeftRow, LeftRow, Key, LeftRow>;
export function joinWrapper<LeftRow, RightRow, Key>(
    joinFn: Join<LeftRow, RightRow, Key, {} & LeftRow & RightRow>
): Join<LeftRow, RightRow, Key, {} & LeftRow & RightRow>;
export function joinWrapper<LeftRow, RightRow, Key, MergeResult>(
    joinFn: Join<LeftRow, RightRow, Key, MergeResult>
): Join<LeftRow, RightRow, Key, MergeResult> {
    return (
        a: LeftRow[],
        aAccessor: Accessor<LeftRow, Key>,
        b: RightRow[] = <any> a,
        bAccessor: Accessor<RightRow, Key> = <any> aAccessor,
        merger: Merger<LeftRow, RightRow, MergeResult> = <any> ((left: LeftRow, right: RightRow) => assign({}, left, right))
    ): MergeResult[] => {
        if (!a) {
            throw new Error('Missing required left array');
        } else if (!aAccessor) {
            throw new Error('Missing required left accessor');
        }
        return joinFn(
            a,
            getAccessor(aAccessor),
            b,
            getAccessor(bAccessor),
            merger
        );
    };
}
/* eslint-enable @typescript-eslint/no-explicit-any,@typescript-eslint/consistent-type-assertions */
