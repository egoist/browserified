# browserified

[![Build Status](https://img.shields.io/circleci/project/egoist/browserified/master.svg?style=flat)](https://circleci.com/gh/egoist/browserified) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Available modules

<!-- @modules start -->
|package|version|
|---|---|
|[pug](https://npm.im/pug)|[![version](https://img.shields.io/npm/v/browserified-pug.svg)](https://npm.im/browserified-pug)|
|[postcss](https://npm.im/postcss)|[![version](https://img.shields.io/npm/v/browserified-postcss.svg)](https://npm.im/browserified-postcss)|
|[less](https://npm.im/less)|[![version](https://img.shields.io/npm/v/browserified-less.svg)](https://npm.im/browserified-less)|
|[postcss-cssnext](https://npm.im/postcss-cssnext)|[![version](https://img.shields.io/npm/v/browserified-postcss-cssnext.svg)](https://npm.im/browserified-postcss-cssnext)|
|[buble](https://npm.im/buble)|[![version](https://img.shields.io/npm/v/browserified-buble.svg)](https://npm.im/browserified-buble)|
<!-- @modules end -->

## Usage

These modules are bundled in UMD format, for example:

```html
<script src="https://unpkg.com/browserified-pug"></script>

<script>
  pug.render('#id content')
</script>
```

You can still use it as CommonJS module:

```js
const pug = require('browserified-pug')
```

You can use all these modules by prefixing `browserified-`.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**browserified** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGoIST with help from contributors ([list](https://github.com/egoist/browserified/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
