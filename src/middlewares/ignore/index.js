const colors = require("colors")
const { getIgnoredFiles } = require("./helper")
const {ProjectParamError} = require("../../error")

async function ignore(ctx, next) {
  const program = ctx.program
  if (!program.dir) {
    return Promise.reject(new ProjectParamError())
  }
  
  const dir = program.dir.toString()

  console.log(colors.yellow("finding ignored files..."))
  if (program.ignore) {
    const ignoredFiles = program.ignore.toString().split("|")
    ctx.ignore = ignoredFiles
  } else {
    let result = await getIgnoredFiles(dir).catch(function(err) {
      return Promise.reject(err)
    })
    ctx.ignore = result
  }

  if (ctx.ignore && ctx.ignore.length > 0) {
    console.log(colors.green("ignored files " + ctx.ignore))
  } else {
    console.log(colors.green("ignored files is empty."))
  }
  await next()
}

module.exports = ignore
