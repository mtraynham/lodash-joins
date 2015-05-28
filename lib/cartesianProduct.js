import {flatten, map, reduce} from 'lodash';

/**
 * Produce the cartesian product of multiple arrays
 * @param  {*[[]]} array
 * @return {*[]}
 */
export default function cartesianProduct (array) {
    return array.length ?
        reduce(array, (a, b) =>
            flatten(map(a, (x) =>
                map(b, (y) =>
                    x.concat([y]))),
                true),
            [[]]) :
        [];
}
