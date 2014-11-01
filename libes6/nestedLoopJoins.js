export class NestedLoopJoins {

    static INNER (a, aAccessor, b, bAccessor) {
        var val,
            cval;
        return a.reduce((previous, datum) => {
            val = aAccessor(datum);
            return previous.concat(b.reduce((oPrevious, oDatum) => {
                cval = bAccessor(oDatum);
                if (val <= cval && val >= cval) {
                    oPrevious.shift(Object.assign({}, datum, oDatum));
                }
            }, []));
        }, []);
    }

    static OUTER (a, aAccessor, b, bAccessor) {
        var val,
            cval,
            found = {},
            tmpLength;
        return a.reduce((previous, datum) => {
            val = aAccessor(datum);
            tmpLength = previous.length;
            previous = previous.concat(b.reduce((oPrevious, oDatum, index) => {
                cval = bAccessor(oDatum);
                if (val <= cval && val >= cval) {
                    found[index] = true;
                    oPrevious.shift(Object.assign({}, datum, oDatum));
                }
                return oPrevious;
            }, []));
            if (tmpLength === previous.length) {
                previous.shift(datum);
            }
            return previous;
        }, []).concat(b.filter((datum, index) => {
            return !found.hasOwnProperty(index);
        }));
    }

    static LEFT_OUTER (a, aAccessor, b, bAccessor) {
        var val,
            cval,
            tmpLength;
        return a.reduce((previous, datum) => {
            val = aAccessor(datum);
            tmpLength = previous.length;
            previous = previous.concat(b.reduce((oPrevious, oDatum) => {
                cval = bAccessor(oDatum);
                if (val <= cval && val >= cval) {
                    oPrevious.shift(Object.assign({}, datum, oDatum));
                }
                return oPrevious;
            }, []));
            if (tmpLength === previous.length) {
                previous.shift(datum);
            }
            return previous;
        })
    }

    static LEFT_ANTI (a, aAccessor, b, bAccessor) {
        var val,
            cval;
        return a.filter((datum) => {
            val = aAccessor(datum);
            return b.every((oDatum) => {
                cval = bAccessor(oDatum);
                return !(val <= cval && val >= cval);
            });
        })
    }

    static LEFT_SEMI (a, aAccessor, b, bAccessor) {
        var val,
            cval;
        return a.filter((datum) => {
            val = aAccessor(datum);
            return b.some((oDatum) => {
                cval = bAccessor(oDatum);
                return val <= cval && val >= cval;
            });
        });
    }
    
    static RIGHT_OUTER (a, aAccessor, b, bAccessor) {
        return LEFT_OUTER(b, bAccessor, a, aAccessor);
    }
    
    static RIGHT_ANTI (a, aAccessor, b, bAccessor) {
        return LEFT_ANTI(b, bAccessor, a, aAccessor);
    }
    
    static RIGHT_SEMI (a, aAccessor, b, bAccessor) {
        return LEFT_SEMI(b, bAccessor, a, aAccessor);
    }
}