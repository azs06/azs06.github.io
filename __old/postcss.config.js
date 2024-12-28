/* eslint-disable import/no-extraneous-dependencies, global-require */
const plugins = [require('autoprefixer'), require('postcss-nested')];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        require('cssnano')({
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        }),
    );
}

module.exports = { plugins };