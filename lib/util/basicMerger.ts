import assign from 'lodash/assign';

/**
 * The default merger just creates a combined object using _.assign.
 */
export default function basicMerger<LeftRow, RightRow>(
    left: LeftRow,
    right: RightRow,
): LeftRow & RightRow {
    return assign({}, left, right);
}
