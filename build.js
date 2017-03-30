#!/usr/bin/env node
const path = require('path')
const fs = require('fs-promise')
const browserify = require('browserify')
const uglify = require('uglify-js')
const replaceSection = require('replace-section')
const modules = require('./package.json').modules

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
        replaceWith: `<!-- @modules start -->
${modules.map(m => `- [${m.name}](https://npm.im/${m.name})`).join('\n')}
<!-- @modules end -->`
      })
    }).then(content => {
      return fs.writeFile('./README.md', content, 'utf8')
    })
}
