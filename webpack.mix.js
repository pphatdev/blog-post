const mix = require('laravel-mix');
const path = require('path');

/*
|--------------------------------------------------------------------------
| Mix Asset Management
|--------------------------------------------------------------------------
|
| Mix provides a clean, fluent API for defining some Webpack build steps
| for your Laravel applications. By default, we are compiling the CSS
| file for the application as well as bundling up all the JS files.
|
*/

mix.ts('resources/js/app.ts', 'public/ts')
    .postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss'),
    ])
    .react()
    .webpackConfig({
        resolve: {
            alias: {
                '@': path.resolve('resources/app'),
                '@components': path.resolve('resources/app/components'),
                '@data': path.resolve('resources/app/data'),
                '@hooks': path.resolve('resources/app/hooks'),
                '@lib': path.resolve('resources/app/lib'),
                '@pages': path.resolve('resources/app/pages'),
                '@routes': path.resolve('resources/app/routes'),
                '@demo': path.resolve('resources/js'),
                '@layouts': path.resolve('resources/app/layouts'),
            },
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            fallback: {
                "fs": false
            },
        },
    }).version();
