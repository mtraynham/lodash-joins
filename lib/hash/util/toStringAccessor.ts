import toString from 'lodash/toString';

import {Accessor} from '../../typings';

export default function toStringAccessor<Row, Key>(
    accessor: Accessor<Row, Key>
): Accessor<Row, string> {
    return (row: Row): string => toString(accessor(row));
}
