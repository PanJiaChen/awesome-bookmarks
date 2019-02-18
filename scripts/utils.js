const matter = require('gray-matter')
const path = require('path')

exports.pathResolve = function(dir) {
  return path.join(__dirname, '..', dir)
}

exports.readFile = function(file) {
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

exports.isGithub = function(url) {
  return /^.*(https?):\/\/github\.com\/.*/.test(url)
}
