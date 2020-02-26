/**
 * @typedef {{
 *      r: Array<*>,
 *      val: *
 * }} SubList
 */

/**
 * From a sorted list, yield a subList where the accessor values are the same.
 * @param  {Array<Object>} sortedList
 * @param  {AccessorFunction} accessor
 * @yield  {SubList}
 * @returns {undefined}
 */
export default function* yieldRightSubList (sortedList, accessor) {
    if (sortedList.length === 1) {
        yield {r: sortedList, val: accessor(sortedList[sortedList.length - 1])};
    } else if (sortedList.length > 1) {
        let i = sortedList.length,
            r = [sortedList[--i]],
            val = accessor(r[0]);
        // for each subsequent value, we'll yield when there is a
        // new tmpVal that is not equal the current val
        while (i--) {
            const tmpVal = accessor(sortedList[i]);
            if (val <= tmpVal && val >= tmpVal) {
                r.unshift(sortedList[i]);
            } else {
                yield {r, val};
                r = [sortedList[i]];
                val = tmpVal;
            }
        }
        yield {r, val};
    }
}
