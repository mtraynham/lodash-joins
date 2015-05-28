/**
 * Wrap a join function to process inputs in a more succinct manner
 * @param {Function} joinFn
 * @returns {Function}
 */
export default function joinWrapper (joinFn) {
    return (a, aAccessor, b = a, bAccessor = aAccessor) => {
        if (!a) {
            throw new Error('Missing required left array');
        } else if (!aAccessor) {
            throw new Error('Missing required left accessor');
        }
        return joinFn(a, aAccessor, b, bAccessor);
    };
}
