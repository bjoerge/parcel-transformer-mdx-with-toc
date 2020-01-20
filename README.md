# `parcel-transformer-mdx-with-toc`

An experimental [Parcel][] v2 plugin for [MDX][] that also exports Table of Contents using [markdown-toc][] and [github-slugger][] to generate anchor names for headings.

Note: This plugin is based on the official [parcel-plugin-mdx][] and modified to also export the Table of Contents. If you don't need a Table of Contents, you are better off using the official [@parcel/transformer-mdx][].

## Installation

[npm][]:

```sh
npm i -D parcel-plugin-mdx-with-toc
```

Or with [Yarn][]:

```sh
yarn add -D parcel-plugin-mdx-with-toc
```

## Usage

```jsx
// index.js
import MDXContent, {Toc} from './content.mdx';
...

render(<><Toc /><MDXContent /></>, root);
```

## License

[MIT][]

<!-- Definitions -->

[mit]: https://github.com/bjoerge/parcel-plugin-mdx-with-toc/license

[mdx]: https://github.com/mdx-js/mdx

[parcel]: https://parceljs.org

[npm]: https://docs.npmjs.com/cli/install

[yarn]: https://yarnpkg.com/lang/en/docs/cli/install/

[markdown-toc]: https://www.npmjs.com/package/markdown-toc

[github-slugger]: https://www.npmjs.com/package/github-slugger

[@parcel/transformer-mdx]: https://www.npmjs.com/package/@mdx-js/parcel-plugin-mdx
