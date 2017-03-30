#!/usr/bin/env node
const path = require('path')
const fs = require('fs-promise')
const browserify = require('browserify')
const uglify = require('uglify-js')
const replaceSection = require('replace-section')
const minimost = require('minimost')

const cli = minimost(process.argv.slice(2))
let modules
let isTemp

if (cli.flags.name) {
  isTemp = true
  modules = [cli.flags] // --name foo --module-name Foo
} else {
  modules = require('./package.json').modules
}

const uglifyOptions = {
  fromString: true,
  compressor: {
    warnings: false,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true,
    negate_iife: false
  },
  output: {
    comments: false
  }
}

Promise.all(modules.map(m => {
  const name = m.name
  const moduleName = m.moduleName || m.name
  console.log(`> Browserifing ${name}`)
  const pipe = new Promise((resolve, reject) => {
    const b = browserify([require.resolve(name)], {
      standalone: moduleName
    })

    b.bundle((err, buf) => {
      if (err) return reject(err)
      resolve(uglify.minify(buf.toString(), uglifyOptions).code)
    })
  })
  return pipe.then(string => {
    const outFile = path.join(__dirname, `packages/browserified-${name}/index.js`)
    return fs.ensureDir(path.dirname(outFile))
      .then(() => fs.writeFile(outFile, string, 'utf8'))
  }).then(() => {
    console.log(`> Browserified ${name}`)
  }).then(() => updateREADME())
})).then(() => {
  console.log('Done!')
}).catch(err => {
  console.error(err.stack)
  process.exit(1)
})

function updateREADME() {
  return fs.readFile('./README.md', 'utf8')
    .then(content => {
      return replaceSection({
        input: content,
        startWith: '<!-- @modules start -->',
        endWith: '<!-- @modules end -->',
        replaceWith(_, p1) {
          if (isTemp) {
            const re = new RegExp(`^\\|\\[${cli.flags.name}\\]\\|`, 'm')
            console.log(re, p1)
            console.log(re.test(p1))
            if (re.test(p1)) {
              // is in readme already
              return wrap(p1.trim())
            }
            // append
            return wrap(`${p1.trim()}
${formatTable(cli.flags.name)}`)
          }
          return wrap(`|package|version|
|---|---|
${modules.map(m => formatTable(m.name)).join('\n')}`)
        }
      })
    }).then(content => {
      return fs.writeFile('./README.md', content, 'utf8')
    })
}

function wrap(str) {
  return `<!-- @modules start -->
${str}
<!-- @modules end -->`
}

function formatTable(name) {
  return `|[${name}](https://npm.im/${name})|[![version](https://img.shields.io/npm/v/browserified-${name}.svg)](https://npm.im/browserified-${name})|`
}
