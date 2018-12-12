const colors = require("colors");
const { getIgnoredFiles } = require("./helper");

async function ignore(ctx, next) {
  console.log("before ignore");
  const program = ctx.program;

  console.log(colors.yellow("finding ignored files..."));
  if (program.ignore) {
    const ignoredFiles = program.ignore.toString().split("|");
    ctx.ignore = ignoredFiles;
  } else {
    let result = await getIgnoredFiles().catch(function(e) {
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
  console.log("after ignore");
}

module.exports = ignore;
