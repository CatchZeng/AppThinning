#!/usr/bin/env node

var colors = require("colors");
const tinify = require("tinify");

let compressedCount = 0;

function tinifyImages(images, key, callback) {
  if (images.length < 1) {
    return;
  }

  if (key == undefined) {
    console.log(
      colors.red(
        "tiny png key is undefined. you can get key from https://tinypng.com/developers ."
      )
    );
    return;
  }

  tinify.key = key;

  compressedCount = 0;

  validate(images)
    .then(function(msg) {
      console.log(colors.green(msg));

      for (let index in images) {
        const image = images[index];
        console.log(colors.blue("compressing: " + image));
        tinify.fromFile(image).toFile(image, function(err, data) {
          if (err) {
            if (callback) {
              callback(err, image);
            }
          } else {
            console.log(colors.green("compressed: " + image));

            compressedCount++;
            if (callback && compressedCount == images.length) {
              console.log(colors.green("finish tinyPng compression."));
              callback(undefined, image);
            }
          }
        });
      }
    })
    .catch(function(err) {
      console.log(colors.red(err));
    });
}

function validate(images) {
  console.log(colors.yellow("valdating tinyPng..."));
  return new Promise((resolve, reject) => {
    tinify.validate(function(err) {
      if (err) {
        reject("tinyPng validate error.");
        return;
      }

      const compressionsThisMonth = tinify.compressionCount;
      if (compressionsThisMonth + images.length > 500) {
        console.log(
          colors.red("compressions this month is over follow (> 500).")
        );
      } else {
        const left = 500 - compressionsThisMonth;
        console.log(colors.yellow("compressions this month left " + left));
      }

      resolve("tinyPng is valid.");
    });
  });
}

module.exports = tinifyImages;
