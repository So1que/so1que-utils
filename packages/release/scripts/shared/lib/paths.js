const { packageDir, isPackageDirExist } = require("../constants/directory")

const createPathWithPackageDir = (fileName) => (isPackageDirExist ? `./${packageDir}/${fileName}` : `./${fileName}`)

const createPackageChangelogPath = () => createPathWithPackageDir("CHANGELOG.md")

const createTaskChangelogPath = () => createPathWithPackageDir("changelogs")

const createPackageJsonPath = () => createPathWithPackageDir("package.json")

module.exports = {
  createPackageJsonPath,
  createPackageChangelogPath,
  createTaskChangelogPath
}
