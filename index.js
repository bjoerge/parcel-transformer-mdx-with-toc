/* eslint-disable @typescript-eslint/no-use-before-define */
const {Transformer} = require('@parcel/plugin')
const mdx = require('@mdx-js/mdx')
const toc = require('markdown-toc')
const slug = require('remark-slug')
const ghSlugger = require('github-slugger')

const slugify = ghSlugger()

module.exports = new Transformer({
  getConfig({asset}) {
    return asset.getConfig(['.mdxrc', 'mdx.config.js', 'package.json'], {
      packageKey: 'mdx',
    })
  },
  async transform({asset, config}) {
    const contents = asset.getCode()

    const mdxConfig = {
      ...config,
      skipExport: true,
      remarkPlugins: [...(config.remarkPlugins || []), slug],
    }

    const tocResult = toc(await contents, {slugify})

    const compiled = mdx(await contents, mdxConfig)
    const compiledToc = mdx(tocResult.content, mdxConfig)

    asset.type = 'js'
    asset.setCode(`/* @jsx mdx */
import React from 'react';
import { mdx } from '@mdx-js/react'
export default ${iife(await compiled)};
export const Toc = ${iife(await compiledToc)}
`)

    return [asset]
  },
})

function iife(body) {
  return `(function() {${body}
return MDXContent})()`
}
