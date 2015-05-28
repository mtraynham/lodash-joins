/**
 * From a sorted list, yield a subList where the accessor values are the same
 * @param  {*[]} sortedList
 * @param  {Function} accessor
 * @return {{}}
 */
export default function* yieldRightSubList (sortedList, accessor) {
    if (sortedList.length === 1) {
        yield {r: sortedList, val: accessor(sortedList[sortedList.length - 1])};
    } else if (sortedList.length > 1) {
        let datum,
            tmpVal,
            i = sortedList.length,
            val = accessor(datum = sortedList[--i]), // pull the first value
            r = [datum];
        // for each subsequent value, we'll yield when there is a
        // new tmpVal that is not equal the current val
        while (i--) {
            tmpVal = accessor(sortedList[i]);
            if (val <= tmpVal && val >= tmpVal) {
                r.unshift(sortedList[i]);
            } else {
                yield {r: r, val: val};
                r = [sortedList[i]];
                val = tmpVal;
            }
        }
        yield {r: r, val: val};
    }
}
