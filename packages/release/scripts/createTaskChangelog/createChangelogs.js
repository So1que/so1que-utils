const { existsSync } = require("fs")
const { writeFile, mkdir } = require("fs/promises")

const { createTaskChangelogPath } = require("../shared/lib/paths")
const { changelogFormat } = require("../shared/constants/format")

const defaultTemplate = `
patch:
-\u0020

minor:
-\u0020

major:
-\u0020
`

const createChangelogs = async ({ selectedTaskNumber, updates }) => {
  const packageChangelogsPath = createTaskChangelogPath()

  if (!existsSync(packageChangelogsPath)) {
    await mkdir(packageChangelogsPath)
  }

  const changelogPath = `${packageChangelogsPath}/${selectedTaskNumber}${changelogFormat}`

  let changelogTemplate = defaultTemplate

  if (updates?.length > 0) {
    const readableUpdates = updates.map(({ updatedType, update }) => `${updatedType}: \n- ${update} \n`).join("\n")

    changelogTemplate = readableUpdates
  }

  await writeFile(changelogPath, changelogTemplate)

  console.info(`file ${selectedTaskNumber}${changelogFormat} generated. Check changelogs folder and fill by your own`)
}

module.exports = { createChangelogs }
