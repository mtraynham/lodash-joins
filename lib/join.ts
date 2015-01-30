/// <reference path="../typings/tsd.d.ts" />

/**
 * IAccessor
 * A functional type interface that takes in a datum object and returns
 * the key for that object.  Similarly known as a `pluck` function.
 */
export interface IAccessor<O extends Object, A> {
    (datum: O): A;
}

/**
 * The default accessor
 * @param {Object} datum
 * @returns {Object}
 * @constructor
 */
export var DefaultAccessor: IAccessor<Object, Object> = (datum: Object) => datum;

/**
 * IMerger
 * A functional type interface that takes in two different objects and is able
 * to merge them to produce a different object.
 */
export interface IMerger<L extends Object, R extends Object, T extends Object> {
    (left: L, right: R): T;
}

/**
 * The default merger
 * @param {Object} left
 * @param {Object} right
 * @returns {Object}
 * @constructor
 */
export var DefaultMerger: IMerger<Object, Object, Object> = (left: Object, right: Object) => _.assign(new Object(), left, right);

/**
 * IJoin
 * A functional type interface that can take two arrays and join them into a single
 * array.  This interface provides the basis for all join types.  It takes the left & right
 * arrays, along with their accessors and merges them into an array of a new type,
 * which is defined by the merger.  Some joins, may not require a merger as they
 * are not full-joins and produce a filtered left-array.
 */
export interface IJoin<L extends Object, R extends Object, A, T extends Object> {
    (left: Array<L>, leftAccessor: IAccessor<L, A>,
     right: Array<R>, rightAccessor: IAccessor<R, A>): Array<T>;
}

export interface IMergeJoin<L extends Object, R extends Object, A, T extends Object> {
    (left: Array<L>, leftAccessor: IAccessor<L, A>,
     right: Array<R>, rightAccessor: IAccessor<R, A>,
     merger: IMerger<L, R, T>): Array<T>;
}


export var HashFullOuterJoin: IMergeJoin<Object, Object, any, Object> =
    (left: Array<Object>, leftAccessor: IAccessor<Object, any>,
     right: Array<Object>, rightAccessor: IAccessor<Object, any>,
     merger: IMerger<Object, Object, Object> = DefaultMerger): Array<Object> => {
        var idx: _.List<Object>,
            markedValues: any = {},
            result: Array<Object>,
            val: any;
        if (left.length < right.length) {
            idx = _.groupBy(left, leftAccessor);
            result = _.reduceRight(right, (previous: Array<Object>, datum: Object) => {
                markedValues[val = rightAccessor(datum)] = true;
                if (_.has(idx, val)) {
                    return _.map(idx[val], (oDatum: Object) => merger(oDatum, datum)).concat(previous);
                }
                previous.unshift(datum);
                return previous;
            }, []);
        } else {
            idx = _.groupBy(right, rightAccessor);
            result = _.reduceRight(left, (previous: Array<Object>, datum: Object) => {
                markedValues[val = leftAccessor(datum)] = true;
                if (_.has(idx, val)) {
                    return _.map(idx[val], (oDatum: Object) => merger(datum, oDatum)).concat(previous);
                }
                previous.unshift(datum);
                return previous;
            }, []);
        }
        return result.concat(_(idx).filter((value: Object, key: string) => !_.has(markedValues, key)).values().flatten());
    };

export var HashLeftOuterJoin: IMergeJoin<Object, Object, any, Object> =
    (left: Array<Object>, leftAccessor: IAccessor<Object, any>,
     right: Array<Object>, rightAccessor: IAccessor<Object, any>,
     merger: IMerger<Object, Object, Object> = DefaultMerger): Array<Object> => {
        var idx: _.Dictionary<Object>,
            val: any;
        if (left.length < right.length) {
            var markedVals: Object = {};
            idx = _.groupBy(left, leftAccessor);
            return _.reduceRight(right, (previous: Array<Object>, datum: Object) => {
                markedVals[val = rightAccessor(datum)] = true;
                return !_.has(idx, val) ? _.map(idx[val], (oDatum: Object) => merger(oDatum, datum)).concat(previous) : previous;
            }, []).concat(_(idx).filter((value: Object, key: string) => !_.has(markedValues, key)).values().flatten());
        } else {
            idx = _.groupBy(right, rightAccessor);
            return reduceRight(a, (previous: Array<Object>, datum: Object) => {
                if (_.has(idx, (val = leftAccessor(datum)))) {
                    return _.map(idx[val], (oDatum: Object) => merger(datum, oDatum)).concat(previous);
                }
                previous.unshift(datum);
                return previous;
            }, []);
        }
    };

export var HashInnerJoin: IMergeJoin<Object, Object, any, Object> =
    (left: Array<Object>, leftAccessor: IAccessor<Object, any>,
     right: Array<Object>, rightAccessor: IAccessor<Object, any>,
     merger: IMerger<Object, Object, Object> = DefaultMerger): Array<Object> => {

    };

export var HashLeftAntiJoin: IJoin<Object, Object, any, Object> =
    (left: Array<Object>, leftAccessor: IAccessor<Object, any>,
     right: Array<Object>, rightAccessor: IAccessor<Object, any>): Array<Object> => {
        var idx: _.Dictionary = _.indexBy(right, rightAccessor);
        return _.filter(left, (datum: Object) => !_.has(idx, leftAccessor(datum)));
    };

export var HashLeftSemiJoin: IJoin<Object, Object, any, Object> =
    (left: Array<Object>, leftAccessor: IAccessor<Object, any>,
     right: Array<Object>, rightAccessor: IAccessor<Object, any>): Array<Object> => {
        var idx: _.Dictionary = _.indexBy(right, rightAccessor);
        return _.filter(left, (datum: Object) => _.has(idx, leftAccessor(datum)));
    };
