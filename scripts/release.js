const path = require('path')
const fs = require('fs')
const matter = require('gray-matter')
const TOC = require('markdown-toc')

const files = ['docs/repository/README.md', 'docs/website/README.md']
const headerMd = 'scripts/README-base.md'

function pathResolve(dir) {
  return path.join(__dirname, '..', dir)
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const dirpath = pathResolve(file)
    fs.readFile(dirpath, 'utf8', (err, data) => {
      if (err) {
        reject()
      }
      resolve(matter(data).content)
    })
  })
}

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
