const colors = require("colors");
const {
  isCommonImage,
  calculateFilesSizeInKB
} = require("../../util/fileUtil");
const imageOptim = require("../../util/imageOptim/index");
const tinyPng = require("../../util/tinyPng/index");
const { appendIgnoreFiles } = require("../ignore/helper");

async function compressImage(ctx, next) {
  console.log(colors.yellow("compressing common images."));

  let files = [];
  for (let file of ctx.files) {
    if (isCommonImage(file)) {
      files.push(file);
    }
  }

  if (files.length < 1) {
    console.log(colors.green("no common image need to be compressed."));
  } else {
    const sizeBeforeCompressed = calculateFilesSizeInKB(files);

    const program = ctx.program;

    if (program.compress && program.compress.toString() === "tinyPng") {
      const result = await tinyPng(files, program.key).catch(function(err) {
        console.log(colors.red(err));
      });
      await appendIgnoreFiles(ctx.program.dir, result).catch(function(err) {
        console.log(colors.red(err));
      });
    } else {
      const result = await imageOptim(files).catch(function(err) {
        console.log(colors.red(err));
      });
      await appendIgnoreFiles(ctx.program.dir, result).catch(function(err) {
        console.log(colors.red(err));
      });
    }

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

module.exports = compressImage;
