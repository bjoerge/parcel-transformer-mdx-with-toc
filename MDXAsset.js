const {Asset} = require('parcel-bundler')

const mdx = require('@mdx-js/mdx')
const toc = require('markdown-toc')
const slug = require('remark-slug')
const slugify = require('github-slugger')()

class MDXAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options)
    this.type = 'js'
  }

  async generate() {
    const config = await this.getConfig(['.mdxrc', 'mdx.config.js', 'package.json'], {
      packageKey: 'mdx',
    })

    const tocResult = toc(this.contents, {slugify})

    const compiled = mdx(this.contents, {
      ...config,
      skipExport: true,
      remarkPlugins: (config.remarkPlugins || []).concat(slug),
    })
    const compiledToc = mdx(tocResult.content, {...config, skipExport: true})

    return [
      {
        type: 'js',
        value: `
        import React from 'react';
        import { mdx } from '@mdx-js/react'

        export default ${iife(await compiled)};

        export const Toc = ${iife(await compiledToc)}
        `,
        sourceMap: undefined,
      },
    ]
  }
}

module.exports = MDXAsset

function iife(body) {
  return `(function() {${body}
return MDXContent})()`
}
