const formatChangelogInfo = (info) =>
  info
    .replaceAll("---", "")
    // Replace semver versions titles
    .replace(/major:|minor:|patch:/g, "")
    // Replace blank lines
    .replace(/(^[ \t]*\n)/gm, "")
    // Move main changes on 2 spaces
    .split("\n")
    .map((info) => `  ${info}`)
    .join("\n")

module.exports = { formatChangelogInfo }
