const { writeFile } = require("fs/promises")
const { readFileSync } = require("fs")

const { createPackageJsonPath } = require("./paths")

const SPACES = 4

const bumpSemverVersion = async ({ updatedVersion }) => {
  const packageJson = JSON.parse(readFileSync(createPackageJsonPath(), "utf8"))

  packageJson.version = updatedVersion

  await writeFile(
    createPackageJsonPath(),
    /**
     * With empty space for prettier fix
     */
    `${JSON.stringify(packageJson, null, SPACES)}\n`
  )
}

module.exports = {
  bumpSemverVersion
}
