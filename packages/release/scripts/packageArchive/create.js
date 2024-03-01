const fs = require("fs")
const path = require("path")

const { promisifyExec } = require("../shared/lib/promisifyExec")
const { isPackageDirExist, packageDir } = require("../shared/constants/directory")

const createArchive = async (skipBuild) => {
  if (!skipBuild) {
    console.info("Build")

    await promisifyExec("pnpm build")
  }

  console.info("Pack")

  const { stdout } = await promisifyExec(isPackageDirExist ? `cd ${packageDir} && pnpm pack` : "pnpm pack")
  const currentArchiveName = stdout.replace("\n", "")
  const archiveName = `${Date.now()}-${currentArchiveName}`

  const archiveTargetDirectory = isPackageDirExist ? `${packageDir}/` : ""
  fs.renameSync(`${archiveTargetDirectory}${currentArchiveName}`, archiveName)

  console.info(`Created archive: ${path.resolve(archiveName)}`)
}

module.exports = { createArchive }
