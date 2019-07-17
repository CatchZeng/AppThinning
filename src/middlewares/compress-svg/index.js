const colors = require("colors");
const { isSVG, calculateFilesSizeInKB } = require("../../util/fileUtil");
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
    const sizeBeforeCompressed = calculateFilesSizeInKB(files);

    const result = await svgo(files).catch(function(err) {
      console.log(colors.red(err));
    });
    await appendIgnoreFiles(ctx.program.dir, result).catch(function(err) {
      console.log(colors.red(err));
    });

    const sizeAfterCompressed = calculateFilesSizeInKB(files);
    const percent =
      (sizeBeforeCompressed - sizeAfterCompressed) / sizeBeforeCompressed;
    const saving = (sizeBeforeCompressed - sizeAfterCompressed).toFixed(1);
    ctx.totalSaving += Number(saving);

    console.log(
      colors.green(
        "TOTAL was: " +
          sizeBeforeCompressed +
          "kB " +
          "now: " +
          sizeAfterCompressed +
          "kB " +
          "saving: " +
          saving +
          "kB " +
          "(" +
          percent.toFixed(1) * 100 +
          "%)"
      )
    );
  }

  await next();
}

module.exports = compressSVG;
