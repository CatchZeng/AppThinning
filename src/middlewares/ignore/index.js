const colors = require("colors");
const { getIgnoredFiles } = require("./helper");

async function ignore(ctx, next) {
  const program = ctx.program;

  if (!program.dir) {
    console.log(colors.red("project directory is undefined."));
    return;
  }
  const dir = program.dir.toString();

  console.log(colors.yellow("finding ignored files..."));
  if (program.ignore) {
    const ignoredFiles = program.ignore.toString().split("|");
    ctx.ignore = ignoredFiles;
  } else {
    let result = await getIgnoredFiles(dir).catch(function(e) {
      console.log(colors.red(e));
    });
    ctx.ignore = result;
  }

  if (ctx.ignore.length > 0) {
    console.log(colors.green("ignored files " + ctx.ignore));
  } else {
    console.log(colors.green("ignored files is empty."));
  }
  await next();

  console.log(colors.green("A total savings of " + ctx.totalSaving + " kB"));
}

module.exports = ignore;
