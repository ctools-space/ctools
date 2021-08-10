module.exports = {
    extends: [
        'plugin:@pokemonon/common/common',
        'plugin:@pokemonon/common/vue3',
    ],
    'rules': {
        'array-bracket-spacing': ['error','never'],
        'object-curly-spacing': ['error','always'],
        'space-before-function-paren': ['error', 'never'],
    },
};