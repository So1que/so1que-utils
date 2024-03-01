const util = require("util")
const { exec } = require("child_process")

const promisifyExec = util.promisify(exec)

module.exports = {
  promisifyExec
}
