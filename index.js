#! /usr/bin/env node

var program = require("commander");
var colors = require("colors");
const LargeFileFinder = require("./src/finder/index");
const optimImages = require("./src/imageOptim/index");
const tinifyImages = require("./src/tinypng/index");
const optimSvgs = require("./src/svgo/index");
const { getIgnoredFiles, appendIgnoreFiles } = require("./src/ingore/index");
const finder = new LargeFileFinder();

commander();
findIgnoredFiles();

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
    .option("-k, --key <String>", "tinyPng key.")
    .option(
      "-i, --ignore <String>",
      "ignored files, default is read from ignore.txt. split by '|', such as a.png|/user/ss/b.png|c.png ."
    )
    .parse(process.argv);
}

function findIgnoredFiles() {
  if (program.ignore) {
    const ignoredFiles = program.ignore.toString().split("|");
    if (ignoredFiles.length > 0) {
      console.log(colors.green("ignoredFiles " + ignoredFiles));
    }

    findLargeFiles(ignoredFiles);
  } else {
    console.log(colors.yellow("ignore is undefined, use default instead."));

    getIgnoredFiles(function(err, ignoredFiles) {
      if (err) {
        console.log(colors.red(err));
        return;
      }

      if (ignoredFiles.length > 0) {
        console.log(colors.green("ignoredFiles " + ignoredFiles));
      }

      findLargeFiles(ignoredFiles);
    });
  }
}

function findLargeFiles(ignoredFiles) {
  if (!program.dir) {
    console.log(colors.red("project directory is undefined."));
    return;
  }

  const dir = program.dir.toString();

  let size = 100;
  if (program.size) {
    size = Number(program.size);
  }

  let type = "jpg|png|jpeg|gif|svg";
  if (program.type) {
    type = program.type.toString;
  }

  let commonImages = [];
  let vectorImages = [];
  let files = [];
  let totalSize = 0;

  console.log(colors.yellow("finding large files..."));

  finder.find(dir, ignoredFiles, size, program.maxSize, type, {
    onFind(entry, type, size) {
      if (isCommonImage(type)) {
        commonImages.push(entry);
      } else if (isVectorImage(type)) {
        vectorImages.push(entry);
      }

      files.push(entry);
      totalSize += Number(size);
      console.log(colors.blue.underline(size + "k " + entry));
    },
    didFinishFind() {
      if (files.length < 1) {
        console.log(colors.green("no file need to be compressed."));
        return;
      }
      console.log(
        colors.green(
          "found " + files.length + " files, " + "total size " + totalSize + "k"
        )
      );

      compressVectorImages(vectorImages);
      compressCommonImages(commonImages);
    }
  });
}

function compressCommonImages(files) {
  if (files.length < 1) {
    return;
  }

  console.log(colors.yellow("start compressing images..."));

  if (program.compress && program.compress.toString() === "tinyPng") {
    tinifyImages(files, program.key, function(err, image) {
      if (err) {
        console.log(colors.red("compress " + image + " error."));
      } else {
        appendIgnoreFiles(files);
      }
    });
  } else {
    optimImages(files, function(err, data) {
      if (err) {
        console.log(colors.red(err));
      } else {
        console.log(colors.green(data));
        appendIgnoreFiles(files);
      }
    });
  }
}

function compressVectorImages(files) {
  if (files.length < 1) {
    return;
  }

  console.log(colors.yellow("start compressing vector images..."));
  optimSvgs(files, function(err, data) {
    if (err) {
      console.log(colors.red(data));
    } else {
      console.log(colors.green(data));
      appendIgnoreFiles(files);
    }
  });
}

function isCommonImage(type) {
  var type = type.toUpperCase();
  return type === "JPG" || type === "JPEG" || type === "PNG" || type === "GIF";
}

function isVectorImage(type) {
  var type = type.toUpperCase();
  return type === "SVG";
}
