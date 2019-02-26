const matter = require('gray-matter')
const path = require('path')
const fs = require('fs')

exports.pathResolve = dir => {
  return path.join(__dirname, '..', dir)
}

exports.readFile = file => {
  return new Promise((resolve, reject) => {
    const dirpath = this.pathResolve(file)
    fs.readFile(dirpath, 'utf8', (err, data) => {
      if (err) {
        reject()
      }
      resolve(matter(data).content)
    })
  })
}

exports.isGithub = url => {
  return /^.*(https?):\/\/github\.com\/.*/.test(url)
}
