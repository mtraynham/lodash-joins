import flatten from 'lodash/flatten';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

/**
 * Produce the cartesian product of multiple arrays.
 *
 * @param  {Object[][]} [array=[]]
 * @return {Object[]}
 */
export default function cartesianProduct (array = []) {
    return array.length ?
        reduce(array, (a, b) =>
            flatten(map(a, (x) =>
                map(b, (y) =>
                    x.concat([y]))),
                true),
            [[]]) :
        [];
}
