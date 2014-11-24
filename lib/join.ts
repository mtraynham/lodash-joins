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
export var DefaultAccessor: IAccessor<Object, Object> = (datum: Object) => {
    return datum;
};

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
export var DefaultMerger: IMerger<Object, Object, Object> = (left: Object, right: Object) => {
    return _.extend(new Object(), left, right);
};

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
     right: Array<R>, rightAccessor: IAccessor<R, A>,
     merger: IMerger<L, R, T>): Array<T>;
}

/*
class Joins {
    LeftAntiJoin:Join;
    LeftAntiJoin = <L, R, A, T>(left:Array<L> = [], leftAccessor:Accessor<L, A> = DefaultAccessor,
                                right:Array<R> = [], rightAccessor:Accessor<R, A> = DefaultAccessor,
                                merger:Merger<L, R, T> = DefaultMerger) => {
        var leftValue:A;
        return _.filter(left, (leftDatum) => {
            leftValue = leftAccessor(leftDatum);
            return _.every(right, (rightDatum) => {
                return _.isEqual(leftValue, rightAccessor(rightDatum));
            })
        })
    }
}
*/
