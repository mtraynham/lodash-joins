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
interface IAccessor<TObject, TValueOf extends Object> extends Function {
    (a: TObject): TValueOf
}

interface IMerger<TLeft, TRight, TMergeResult> extends Function {
    (left: TLeft, right: TRight): TMergeResult;
}

interface ICartesianProduct extends Function {
    (
        ...arrays: any[][]
    ): any[][]
}

interface SelfJoin extends Function {
    <TLeft, TValueOf>(
        left: TLeft[],
        leftAccessor: IAccessor<TLeft, TValueOf>
    ): TLeft[];
}

interface IOuterJoin extends SelfJoin {
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

interface IInnerJoin extends SelfJoin {
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

interface IMergeLeftJoin extends SelfJoin {
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

interface IMergeRightJoin extends SelfJoin {
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

interface INonMergeLeftJoin extends SelfJoin {
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

interface INonMergeRightJoin extends SelfJoin {
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

declare module 'lodash-joins' {
    import {LoDashStatic} from 'lodash';

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

    const _: LoDashJoinsStatic;
    export default _;
}

declare module 'lodash-joins/lib/cartesianProduct' {
    const cartesianProduct: ICartesianProduct;
    export default cartesianProduct;
}

declare module 'lodash-joins/lib/hash/hashFullOuterJoin' {
    const join: IOuterJoin;
    export default join;
}

declare module 'lodash-joins/lib/hash/hashInnerJoin' {
    const join: IInnerJoin;
    export default join;
}

declare module 'lodash-joins/lib/hash/hashLeftAntiJoin' {
    const join: INonMergeLeftJoin;
    export default join;
}

declare module 'lodash-joins/lib/hash/hashLeftOuterJoin' {
    const join: IMergeLeftJoin;
    export default join;
}

declare module 'lodash-joins/lib/hash/hashLeftSemiJoin' {
    const join: INonMergeLeftJoin;
    export default join;
}

declare module 'lodash-joins/lib/hash/hashRightAntiJoin' {
    const join: INonMergeRightJoin;
    export default join;
}

declare module 'lodash-joins/lib/hash/hashRightOuterJoin' {
    const join: IMergeRightJoin;
    export default join;
}

declare module 'lodash-joins/lib/hash/hashRightSemiJoin' {
    const join: INonMergeRightJoin;
    export default join;
}

declare module 'lodash-joins/lib/nestedLoop/nestedLoopFullOuterJoin' {
    const join: IOuterJoin;
    export default join;
}

declare module 'lodash-joins/lib/nestedLoop/nestedLoopInnerJoin' {
    const join: IInnerJoin;
    export default join;
}

declare module 'lodash-joins/lib/nestedLoop/nestedLoopLeftAntiJoin' {
    const join: INonMergeLeftJoin;
    export default join;
}

declare module 'lodash-joins/lib/nestedLoop/nestedLoopLeftOuterJoin' {
    const join: IMergeLeftJoin;
    export default join;
}

declare module 'lodash-joins/lib/nestedLoop/nestedLoopLeftSemiJoin' {
    const join: INonMergeLeftJoin;
    export default join;
}

declare module 'lodash-joins/lib/nestedLoop/nestedLoopRightAntiJoin' {
    const join: INonMergeRightJoin;
    export default join;
}

declare module 'lodash-joins/lib/nestedLoop/nestedLoopRightOuterJoin' {
    const join: IMergeRightJoin;
    export default join;
}

declare module 'lodash-joins/lib/nestedLoop/nestedLoopRightSemiJoin' {
    const join: INonMergeRightJoin;
    export default join;
}

declare module 'lodash-joins/lib/sortedMerge/sortedMergeFullOuterJoin' {
    const join: IOuterJoin;
    export default join;
}

declare module 'lodash-joins/lib/sortedMerge/sortedMergeInnerJoin' {
    const join: IInnerJoin;
    export default join;
}

declare module 'lodash-joins/lib/sortedMerge/sortedMergeLeftAntiJoin' {
    const join: INonMergeLeftJoin;
    export default join;
}

declare module 'lodash-joins/lib/sortedMerge/sortedMergeLeftOuterJoin' {
    const join: IMergeLeftJoin;
    export default join;
}

declare module 'lodash-joins/lib/sortedMerge/sortedMergeLeftSemiJoin' {
    const join: INonMergeLeftJoin;
    export default join;
}

declare module 'lodash-joins/lib/sortedMerge/sortedMergeRightAntiJoin' {
    const join: INonMergeRightJoin;
    export default join;
}

declare module 'lodash-joins/lib/sortedMerge/sortedMergeRightOuterJoin' {
    const join: IMergeRightJoin;
    export default join;
}

declare module 'lodash-joins/lib/sortedMerge/sortedMergeRightSemiJoin' {
    const join: INonMergeRightJoin;
    export default join;
}