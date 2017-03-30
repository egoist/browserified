# browserified

[![Build Status](https://img.shields.io/circleci/project/ream/browserified/master.svg?style=flat)](https://circleci.com/gh/ream/browserified) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/ream/donate)

## Available modules

<!-- @modules start -->
|package|version|
|---|---|
|[pug](https://npm.im/pug)|![version](https://img.shields.io/npm/v/browserified-pug.svg)|
|[postcss](https://npm.im/postcss)|![version](https://img.shields.io/npm/v/browserified-postcss.svg)|
|[less](https://npm.im/less)|![version](https://img.shields.io/npm/v/browserified-less.svg)|

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

**browserified** © [ream](https://github.com/ream), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by ream with help from contributors ([list](https://github.com/ream/browserified/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@ream](https://github.com/ream) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
