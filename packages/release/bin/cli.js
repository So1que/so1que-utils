const { program } = require("commander")
const { repoUrl } = require("rc")("release")

const { createTaskChangelog } = require("../scripts/createTaskChangelog/index.js")
const { createRelease } = require("../scripts/createRelease/index.js")
const { createArchive } = require("../scripts/packageArchive/create.js")
const { deleteArchives } = require("../scripts/packageArchive/clear.js")
const { createPreRelease } = require("../scripts/createPreRelease/index.js")
const { checkIsTaskChangelogsExist } = require("../scripts/changelogPRValidator/index.js")
const { sendPublishUpdates } = require("../scripts/sendUpdates/publish.js")

program
  .option("--create-task-changelog")
  .option("--create-release")
  .option("--create-archive")
  .option("--create-pre-release")
  .option("--delete-archives")
  .option("--validate-changelog")
  .option("--send-publish-updates")
  .option("--skip-build")

program.parse()

const options = program.opts()

if (options.createTaskChangelog) {
  createTaskChangelog()
}

if (options.createRelease) {
  createRelease(repoUrl)
}

if (options.createArchive) {
  createArchive(options.skipBuild)
}

if (options.createPreRelease) {
  createPreRelease()
}

if (options.deleteArchives) {
  deleteArchives()
}

if (options.validateChangelog) {
  const [prNumber, prLabels] = program.args

  checkIsTaskChangelogsExist(prNumber, prLabels?.split(",") ?? "")
}

if (options.sendPublishUpdates) {
  sendPublishUpdates(repoUrl)
}
