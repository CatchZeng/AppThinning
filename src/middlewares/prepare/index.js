const colors = require("colors");
const path = require("path");

async function prepare(ctx, next) {
  const program = ctx.program;

  if (!program.dir) {
    console.log(colors.red("project directory is undefined."));
    return;
  }
  var dir = program.dir.toString();

  console.log(colors.yellow("preparing..."));
  
  if (dir.indexOf("~/") == 0) {
    dir = dir.replace("~", "/Users/"+process.env.USER);
  }
  if (!path.isAbsolute(dir)) {
    dir = path.resolve(process.cwd(), dir);
  }

  program.dir = dir;

  console.log(colors.green("Project absolute path :"+ dir));
  
  await next();
}

module.exports = prepare;
