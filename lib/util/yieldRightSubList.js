/**
 * From a sorted list, yield a subList where the accessor values are the same
 * @param  {*[]} sortedList
 * @param  {Function} accessor
 * @return {{}}
 */
var yieldRightSubList = function (sortedList, accessor) {
    var r,
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
                break;
            }
        }
    }
    return r ? {r: r, val: val} : r;
};

module.exports = yieldRightSubList;
