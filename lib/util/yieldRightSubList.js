/**
 * From a sorted list, yield a subList where the accessor values are the same
 * @param  {*[]} sortedList
 * @param  {Function} accessor
 * @return {{}}
 */
export default function* yieldRightSubList (sortedList, accessor) {
    let r,
        datum,
        val,
        tmpVal,
        i;
    if (sortedList.length > 0) {
        val = accessor(datum = sortedList.pop());
        r = [datum];
        i = sortedList.length;
        while (i--) {
            tmpVal = accessor(sortedList[i]);
            if (val <= tmpVal && val >= tmpVal) {
                r.unshift(sortedList.pop());
            } else {
                yield {r: r, val: val};
            }
        }
    }
    yield r;
}
