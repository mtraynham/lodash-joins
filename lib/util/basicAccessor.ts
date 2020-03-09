import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import property from 'lodash/property';

import {Accessor} from '../typings';

/**
 * Create an accessor from a string, string[] or a different accessor.
 * If it's a string or an array, use _.property.
 */
export default function basicAccessor<Row, Key>(
    obj: Accessor<Row, Key> | string | string[]
): Accessor<Row, Key> {
    return isString(obj) || isArray(obj) ?
        property(obj) :
        obj;
}
