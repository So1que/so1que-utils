const path = require("path"),
  fs = require("fs")

const fromDir = (startPath, filter, callback) => {
  if (!fs.existsSync(startPath)) {
    return
  }

  const files = fs.readdirSync(startPath)

  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i])
    const stat = fs.lstatSync(filename)

    if (stat.isDirectory()) {
      fromDir(filename, filter, callback)
    } else if (filter.test(filename)) {
      callback(filename)
    }
  }
}

module.exports = { fromDir }
