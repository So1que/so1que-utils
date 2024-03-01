const defaultBranchInfo = {
  number: null,
  prefix: "VN",
  value: null
}

const createBranchInfo = (branchName) => {
  const taskName = branchName.split("/").slice(1).join("/")

  if (!taskName) {
    return defaultBranchInfo
  }

  const commonTaskFormat = taskName.replace("_", "-")
  const [taskPrefix, taskValue] = commonTaskFormat.split("-")

  if (!taskPrefix || !taskValue) {
    return defaultBranchInfo
  }

  const taskNumber = `${taskPrefix}-${taskValue}`

  return { number: taskNumber, prefix: taskPrefix, value: taskValue }
}

module.exports = { createBranchInfo }
