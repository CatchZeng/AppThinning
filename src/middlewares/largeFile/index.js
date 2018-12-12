const Config = require("../../config/index");
const colors = require("colors");
const LargeFileFinder = require("./largeFileFinder");

async function largeFile(ctx, next) {
  console.log("before largeFile");
  const program = ctx.program;
  const ignoredFiles = ctx.ignore;

  if (!program.dir) {
    console.log(colors.red("project directory is undefined."));
    return;
  }

  const dir = program.dir.toString();

  let size = Config.defaultSize;
  if (program.size) {
    size = Number(program.size);
  }

  let type = Config.defaultType;
  if (program.type) {
    type = program.type.toString();
  }

  console.log(colors.yellow("finding large files..."));

  let result = await find(dir, ignoredFiles, size, program.maxSize, type).catch(
    function(e) {
      console.log(colors.red(e));
    }
  );
  ctx.files = result;

  if (ctx.files.length > 0) {
    console.log(colors.green("largeFiles " + ctx.files));
  }
  await next();
  console.log("after largeFile");
}

function find(dir, ignoredFiles, size, maxSize, type) {
  const finder = new LargeFileFinder();
  let files = [];
  let totalSize = 0;

  return new Promise((resolve, reject) => {
    finder.find(dir, ignoredFiles, size, maxSize, type, {
      onFind(entry, type, size) {
        files.push(entry);
        totalSize += Number(size);
        console.log(colors.blue.underline(size + "k " + entry));
      },
      didFinishFind() {
        console.log(
          colors.yellow(
            "found " +
              files.length +
              " files, " +
              "total size " +
              totalSize +
              "k"
          )
        );
        resolve(files);
      }
    });
  });
}

module.exports = largeFile;
