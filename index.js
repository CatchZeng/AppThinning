#! /usr/bin/env node

const program = require("commander");
const MiddlewareCenter = require("./src/middleware-center/index");
const ignore = require("./src/middlewares/ignore/index");
const largeFile = require("./src/middlewares/largeFile/index");
const compressImage = require("./src/middlewares/compress-image/index");
const compressGif = require("./src/middlewares/compress-gif/index");
const compressSVG = require("./src/middlewares/compress-svg/index");

commander();

const submitter = new MiddlewareCenter();

submitter.use(ignore);
submitter.use(largeFile);
submitter.use(compressImage);
submitter.use(compressGif);
submitter.use(compressSVG);

let ctx = {};
ctx.program = program;
submitter.handleRequest(ctx);

function commander() {
  program
    .version("0.1.0")
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
      "ignored files, default is read from ignore.txt. split by '|', such as a.png|/user/ss/b.png|c.png ."
    )
    .parse(process.argv);
}
