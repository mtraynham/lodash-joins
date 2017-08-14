import { LoDashStatic } from 'lodash';

export = _;
export as namespace _;

declare var _: _.LoDashJoinsStatic;

declare namespace _ {
    export interface LoDashJoinsStatic extends LoDashStatic {
        cartesianProduct: ICartesianProduct;

        hashFullOuterJoin: IOuterJoin;
        hashInnerJoin: IInnerJoin;
        hashLeftAntiJoin: INonMergeLeftJoin;
        hashLeftOuterJoin: IMergeLeftJoin;
        hashLeftSemiJoin: INonMergeLeftJoin;
        hashRightAntiJoin: INonMergeRightJoin;
        hashRightOuterJoin: IMergeRightJoin;
        hashRightSemiJoin: INonMergeRightJoin;

        nestedLoopFullOuterJoin: IOuterJoin;
        nestedLoopInnerJoin: IInnerJoin;
        nestedLoopLeftAntiJoin: INonMergeLeftJoin;
        nestedLoopLeftOuterJoin: IMergeLeftJoin;
        nestedLoopLeftSemiJoin: INonMergeLeftJoin;
        nestedLoopRightAntiJoin: INonMergeRightJoin;
        nestedLoopRightOuterJoin: IMergeRightJoin;
        nestedLoopRightSemiJoin: INonMergeRightJoin;

        sortedMergeFullOuterJoin: IOuterJoin;
        sortedMergeInnerJoin: IInnerJoin;
        sortedMergeLeftAntiJoin: INonMergeLeftJoin;
        sortedMergeLeftOuterJoin: IMergeLeftJoin;
        sortedMergeLeftSemiJoin: INonMergeLeftJoin;
        sortedMergeRightAntiJoin: INonMergeRightJoin;
        sortedMergeRightOuterJoin: IMergeRightJoin;
        sortedMergeRightSemiJoin: INonMergeRightJoin;
    }

    /**
     * An accessor is a function that returns a coercive value from an item.  Coercive
     * items include:
     *  - Primitives (boolean, number, string)
     *  - Dates
     *  - Objects that implement .valueOf()
     *  - Arrays of the previous 3
     *
     * Key comparisons within the library are performed using the following trick:
     *
     *    const equals = a <= b & a >= b;
     *
     * This is done because == and === are either not coercive or type converting:
     * @example
     *    var x = ['a', 'b'];
     *    var y = ['a', 'c'];
     *    var z = ['a', 'b'];
     *    x == z // false
     *    x === z // false
     *    x <= z && x >= z // true (converts to String)
     *    x <= y && x >= y //false
     *
     *    x = new Date();
     *    y = new Date(x.getTime());
     *    x == y // false
     *    x === y // false
     *    x <= y && x >= y // true (converts to Integer)
     */
    export interface IAccessor<TObject, TValueOf extends Object> extends Function {
        (a: TObject): TValueOf
    }

    export interface IMerger<TLeft, TRight, TMergeResult> extends Function {
        (left: TLeft, right: TRight): TMergeResult;
    }

    export interface ICartesianProduct extends Function {
        (
            ...arrays: any[][]
        ): any[][]
    }

    export interface SelfJoin extends Function {
        <TLeft, TValueOf>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>
        ): TLeft[];
    }

    export interface IOuterJoin extends SelfJoin {
        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            accessor: IAccessor<TLeft | TRight, TValueOf>,
            right: TRight[]
        ): (TLeft | TRight | TLeft & TRight)[];

        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>
        ): (TLeft | TRight | TLeft & TRight)[];

        <TLeft, TRight, TValueOf, TMergeResult>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>,
            merger: IMerger<TLeft, TRight, TMergeResult>
        ): TMergeResult[];
    }

    export interface IInnerJoin extends SelfJoin {
        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            accessor: IAccessor<TLeft | TRight, TValueOf>,
            right: TRight[]
        ): (TLeft & TRight)[];

        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>
        ): (TLeft & TRight)[];

        <TLeft, TRight, TValueOf, TMergeResult>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>,
            merger: IMerger<TLeft, TRight, TMergeResult>
        ): TMergeResult[];
    }

    export interface IMergeLeftJoin extends SelfJoin {
        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            accessor: IAccessor<TLeft | TRight, TValueOf>,
            right: TRight[]
        ): (TLeft | TLeft & TRight)[];

        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>
        ): (TLeft | TLeft & TRight)[];

        <TLeft, TRight, TValueOf, TMergeResult>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>,
            merger: IMerger<TLeft, TRight, TMergeResult>
        ): TMergeResult[];
    }

    export interface IMergeRightJoin extends SelfJoin {
        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            accessor: IAccessor<TLeft | TRight, TValueOf>,
            right: TRight[]
        ): (TRight | TLeft & TRight)[];

        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>
        ): (TRight | TLeft & TRight)[];

        <TLeft, TRight, TValueOf, TMergeResult>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>,
            merger: IMerger<TLeft, TRight, TMergeResult>
        ): TMergeResult[];
    }

    export interface INonMergeLeftJoin extends SelfJoin {
        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            accessor: IAccessor<TLeft | TRight, TValueOf>,
            right: TRight[]
        ): TLeft[];

        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>
        ): TLeft[];
    }

    export interface INonMergeRightJoin extends SelfJoin {
        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            accessor: IAccessor<TLeft | TRight, TValueOf>,
            right: TRight[]
        ): TRight[];

        <TLeft, TRight, TValueOf>(
            left: TLeft[],
            leftAccessor: IAccessor<TLeft, TValueOf>,
            right: TRight[],
            rightAccessor: IAccessor<TRight, TValueOf>
        ): TRight[];
    }
}
