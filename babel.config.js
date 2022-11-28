module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    plugins: [
        [
            'import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true,
            },
            'vant',
        ],
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-syntax-jsx',
    ],
}
