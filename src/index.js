#! /usr/bin/env node

const program = require("commander")
const MiddlewareCenter = require("./middleware-center/index")
const prepare = require("./middlewares/prepare/index")
const ignore = require("./middlewares/ignore/index")
const largeFile = require("./middlewares/largeFile/index")
const compressImage = require("./middlewares/compress-image/index")
const compressGif = require("./middlewares/compress-gif/index")
const compressSVG = require("./middlewares/compress-svg/index")
const colors = require("colors")

commander()

const middlewareCenter = new MiddlewareCenter()

middlewareCenter.use(prepare).use(ignore).use(largeFile).use(compressImage).use(compressGif).use(compressSVG)

let ctx = {}
ctx.program = program
ctx.totalSaving = 0
middlewareCenter.handleRequest(ctx).then(function(data){
  console.log(colors.green(data))
}).catch(function(err){
  console.log(colors.red(err.message))
})

function commander() {
  program
    .version("0.2.0")
    .option("-d, --dir <String>", "project directory.")
    .option(
      "-t, --types <String>",
      "file types, default is jpg|png|jpeg|gif|svg."
    )
    .option("-s, --size <Number>", "file size, the default is 100, 100 k")
    .option("-m, --maxSize<Number>", "file max size, default is unlimited.")
    .option(
      "-c, --compress <String>",
      "compression types including imageOptim, tinyPng, default is imageOptim."
    )
    .option(
      "-k, --key <String>",
      "tinyPng key get from https://tinypng.com/developers. default is the DefaultTinyPngKey read from src/config/index.js. You can set it up to use tinyPng easily."
    )
    .option(
      "-i, --ignore <String>",
      "ignored files, default is read from appthinning_ignore file. split by '|', such as a.png|/user/ss/b.png|c.png ."
    )
    .parse(process.argv)
}
