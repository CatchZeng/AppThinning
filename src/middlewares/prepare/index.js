const colors = require("colors")
const path = require("path")
const {ProjectParamError} = require("../../error")

async function prepare(ctx, next) {
  const program = ctx.program

  if (!program.dir) {
    return Promise.reject(new ProjectParamError())
  }
  var dir = program.dir.toString()

  console.log(colors.yellow("preparing..."))
  
  if (dir.indexOf("~/") == 0) {
    dir = dir.replace("~", "/Users/"+process.env.USER)
  }
  if (!path.isAbsolute(dir)) {
    dir = path.resolve(process.cwd(), dir)
  }

  program.dir = dir

  console.log(colors.green("Project absolute path :"+ dir))
  
  await next()

  const msg = "A total savings of " + ctx.totalSaving + " kB"
  return Promise.resolve(msg)
}

module.exports = prepare
