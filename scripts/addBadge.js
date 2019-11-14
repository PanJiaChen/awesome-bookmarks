const fs = require('fs')
const readline = require('readline')
const { pathResolve, isGithub } = require('./utils.js')

const filePath = pathResolve('docs/repository/README.md')

const getRepoName = url => {
  const reg = /github\.com\/(.*)\)/
  const m = url.match(reg)

  if (m[0] && m[1]) {
    const b = 'https://badgen.net/github/stars/'

    return url.replace(reg, m[0] + createImg(b + m[1]))
  }
  return ''
}

const createImg = url => {
  return `<img src=${url} alt="GitHub release">`
}

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
  output: fs.createReadStream(filePath)
})

const lines = []

rl.on('line', line => {
  if (isGithub(line)) {
    lines.push(getRepoName(line))
  } else {
    lines.push(line)
  }
})

rl.on('close', () => {
  fs.writeFile(filePath, lines.join('\n'), 'utf8', () => {
    console.log('success')
  })
})
