const Config = require("../../config/index")
const colors = require("colors")
const LargeFileFinder = require("./largeFileFinder")
const {ProjectParamError} = require("../../error")

async function largeFile(ctx, next) {
  const program = ctx.program
  const ignoredFiles = ctx.ignore

  if (!program.dir) {
    return Promise.reject(new ProjectParamError())
  }

  const dir = program.dir.toString()

  let size = Config.defaultSize
  if (program.size) {
    size = Number(program.size)
  }

  let type = Config.defaultType
  if (program.type) {
    type = program.type.toString()
  }

  console.log(colors.yellow("finding large files..."))

  let result = await find(dir, ignoredFiles, size, program.maxSize, type).catch(
    function(err) {
      return Promise.reject(err)
    }
  )
  ctx.files = result

  await next()
}

function find(dir, ignoredFiles, size, maxSize, type) {
  const finder = new LargeFileFinder()
  let files = []
  let totalSize = 0

  return new Promise((resolve, reject) => {
    var fileMap = new Map()
    finder.find(dir, ignoredFiles, size, maxSize, type, {
      onFind(entry, _ , size) {
        files.push(entry)
        totalSize += Number(size)
        fileMap.set(entry + "", Number(size))
      },
      onError(err) {
        reject(err)
      },
      didFinishFind() {
        fileMap[Symbol.iterator] = function*() {
          yield* [...this.entries()].sort((a, b) => b[1] - a[1])
        }
        for (let [key, value] of fileMap) {
          console.log(colors.blue.underline(value.toFixed(1) + "kB " + key))
        }
        console.log(
          colors.green(
            "found " +
              files.length +
              " files, " +
              "total size " +
              totalSize.toFixed(1) +
              "kB"
          )
        )
        resolve(files)
      }
    })
  })
}

module.exports = largeFile
