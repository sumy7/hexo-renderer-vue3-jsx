require('chai').should()
const fs = require('hexo-fs')
const pathFn = require('path')

describe("Vue3 SSR renderer", () => {
    const r = require('../lib/compile')

    it('default', async () => {
        const expected = '<div><h1>Hello world!</h1></div>'
        const path = pathFn.join(__dirname, 'fixture', 'simple.jsx')
        const text = await fs.readFile(path)
        const result = await r({text: text, path: path})({
            content: '<h1>Hello world!</h1>'
        })
        result.should.eq(expected)
    })

    it('import', async () => {
        const expected = '<!doctype html>\n<html><h1>Hello world!</h1><p>From Vue3</p></html>'
        const path = pathFn.join(__dirname, 'fixture', 'complex.jsx')
        const text = await fs.readFile(path)
        const result = await r({text: text, path: path})({
            title: 'Hello world!',
            content: 'From Vue3'
        })
        result.should.eq(expected)
    })

    it('root layout', async () => {
        const expected = '<!doctype html>\n<div><h1>Hello world!</h1></div>'
        const path = pathFn.join(__dirname, 'fixture', 'simple.jsx')
        const text = await fs.readFile(path)
        const result = await r({text: text, path: path})({
            content: '<h1>Hello world!</h1>',
            layout: false,
            filename: path,
            view_dir: pathFn.dirname(path)
        })
        result.should.eq(expected)
    })

    it('non-root layout', async () => {
        const expected = '<html><h1>Hello world!</h1><p>From inferno.js</p></html>'
        const path = pathFn.join(__dirname, 'fixture', 'complex.jsx')
        const text = fs.readFile(path)
        const result = await r({text: text, path: path})({
            title: 'Hello world!',
            content: 'From inferno.js',
            layout: 'complex',
            filename: path,
            view_dir: pathFn.dirname(path)
        })
        result.should.eq(expected)
    })
})
