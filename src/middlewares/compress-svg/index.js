const colors = require("colors");
const { isSVG } = require("../../util/fileUtil");
const svgo = require("../../util/svgo");
const { appendIgnoreFiles } = require("../ignore/helper");

async function compressSVG(ctx, next) {
  console.log(colors.yellow("compressing svg images."));

  let files = [];
  for (let file of ctx.files) {
    if (isSVG(file)) {
      files.push(file);
    }
  }

  if (files.length < 1) {
    console.log(colors.green("no SVG image need to be compressed."));
  } else {
    const result = await svgo(files).catch(function(err) {
      console.log(colors.red(err));
    });
    console.log(colors.bgCyan("svgo result: " + result));
    await appendIgnoreFiles(result).catch(function(err) {
      console.log(colors.red(err));
    });
  }

  await next();
}

module.exports = compressSVG;
