const fs = require('fs')
const TOC = require('markdown-toc')
const { pathResolve, readFile } = require('./utils.js')

const files = ['docs/repository/README.md', 'docs/website/README.md']
const headerMd = 'scripts/README-base.md'

async function generate() {
  var content = []
  for (const file of files) {
    content.push(await readFile(file))
  }

  const header = await readFile(headerMd)

  const toc = TOC(content.join('\n')).content

  content = [header, toc, ...content]

  fs.writeFile(pathResolve('README.md'), content.join('\n'), 'utf8', () => {
    console.log('success')
  })
}

generate()
