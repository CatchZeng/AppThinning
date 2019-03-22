const colors = require("colors");
const { isGif } = require("../../util/fileUtil");
const imageOptim = require("../../util/imageOptim/index");
const { appendIgnoreFiles } = require("../ignore/helper");

async function compressGif(ctx, next) {
  console.log("before compressGif");
  let files = [];
  for (let file of ctx.files) {
    if (isGif(file)) {
      files.push(file);
    }
  }

  if (files.length < 1) {
    console.log(colors.green("no gif need to be compressed."));
  } else {
    const result = await imageOptim(files).catch(function(err) {
      console.log(colors.red(err));
    });
    await appendIgnoreFiles(result).catch(function(err) {
      console.log(colors.red(err));
    });
  }

  await next();
  console.log("after compressGif");
}

module.exports = compressGif;
