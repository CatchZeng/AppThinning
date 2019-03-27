const colors = require("colors");
const { isGif, calculateFilesSizeInKB } = require("../../util/fileUtil");
const imageOptim = require("../../util/imageOptim/index");
const { appendIgnoreFiles } = require("../ignore/helper");

async function compressGif(ctx, next) {
  console.log(colors.yellow("compressing gif."));

  let files = [];
  for (let file of ctx.files) {
    if (isGif(file)) {
      files.push(file);
    }
  }

  if (files.length < 1) {
    console.log(colors.green("no gif need to be compressed."));
  } else {
    const sizeBeforeCompressed = calculateFilesSizeInKB(files);

    const result = await imageOptim(files).catch(function(err) {
      console.log(colors.red(err));
    });
    await appendIgnoreFiles(result).catch(function(err) {
      console.log(colors.red(err));
    });

    const sizeAfterCompressed = calculateFilesSizeInKB(files);
    const percent =
      (sizeBeforeCompressed - sizeAfterCompressed) / sizeBeforeCompressed;

    console.log(
      colors.green(
        "TOTAL was: " +
          sizeBeforeCompressed.toFixed(1) +
          "K " +
          "now: " +
          sizeAfterCompressed.toFixed(1) +
          "K " +
          "saving: " +
          (sizeBeforeCompressed - sizeAfterCompressed).toFixed(1) +
          "K " +
          "(" +
          percent.toFixed(1) +
          ")"
      )
    );
  }

  await next();
}

module.exports = compressGif;
