import flatten from 'lodash/flatten';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

/**
 * Produce the cartesian product of multiple arrays.
 * @param  {Array<Array<Object>>} [arrays=[]]
 * @returns {Array<Object>}
 */
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/consistent-type-assertions */
export default function cartesianProduct(...arrays: any[][]): any[][] {
    return arrays.length ?
        reduce(arrays, (a, b) =>
            flatten(map(a, x =>
                map(b, y =>
                    x.concat([y])))),
        [[]]) :
        [];
}
/* eslint-enable @typescript-eslint/no-explicit-any,@typescript-eslint/consistent-type-assertions */
