import flatten from 'lodash/flatten';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

/**
 * Produce the cartesian product of multiple arrays.
 * @param  {Array<Array<Object>>} [arrays=[]]
 * @returns {Array<Object>}
 */
export default function cartesianProduct (...arrays) {
    return arrays.length ?
        reduce(arrays, (a, b) =>
            flatten(map(a, x =>
                map(b, y =>
                    x.concat([y]))),
            true),
        [[]]) :
        [];
}
