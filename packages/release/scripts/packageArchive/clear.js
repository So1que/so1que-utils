const { readdir } = require("fs/promises")
const { unlinkSync } = require("fs")

const deleteArchives = async () => {
  const packageArchives = (await readdir(`.`)).filter((dir) => dir.includes(".tgz"))

  if (packageArchives.length > 0) {
    packageArchives.forEach((packageArchive) => unlinkSync(packageArchive))
  }
}

module.exports = { deleteArchives }
