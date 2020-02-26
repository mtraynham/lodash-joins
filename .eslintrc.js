module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'import',
        'jasmine'
    ],
    env: {
        'es6': true,
        'node': true,
        'browser': true,
        'jasmine': true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jasmine/recommended'
    ],
    rules: {
        indent: [2, 4],
        "max-len": [2, 140],
        "jasmine/new-line-between-declarations": [0],
        "jasmine/new-line-before-expect": [0],
        "jasmine/no-spec-dupes": [0]
    }
};
