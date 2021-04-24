'use strict'

const {createSSRApp} = require('vue')
const {renderToString} = require('@vue/server-renderer')

const startTag = '<html'

const babelOptions = {
    presets: [
        '@babel/preset-env'
    ],
    plugins: [
        [
            '@vue/babel-plugin-jsx'
        ]
    ]
}

require('@babel/register')(babelOptions)

function compile(data) {

    const component = require(data.path)

    return async function (locals) {
        const app = createSSRApp(component, locals)

        // test if the layout is root layout file so we can skip costly large string comparison
        if ('layout' in locals && 'view_dir' in locals && 'filename' in locals) {
            if (locals.filename.startsWith(locals.view_dir) && locals.layout === false) {
                // this is root layout file, add doctype
                return '<!doctype html>\n' + await renderToString(app)
            }
            return await renderToString(app)
        }
        const markup = await renderToString(app)
        // do not use substr, substring, slice to prevent string copy
        for (let i = 0; i < 5; i++) {
            if (markup.charAt(i).toLowerCase() !== startTag.charAt(i)) {
                return markup
            }
        }
        return '<!doctype html>\n' + markup
    }

}

module.exports = compile
