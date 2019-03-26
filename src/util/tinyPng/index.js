#!/usr/bin/env node

const Config = require("../../config/index");
const colors = require("colors");
const tinify = require("tinify");
tinify.key = Config.defaultTinyPngKey;

let compressedCount = 0;

function tinyPng(images, key) {
  return new Promise((resolve, reject) => {
    if (images.length < 1) {
      reject("images is empty.");
    }

    if (key != undefined) {
      tinify.key = key;
    }

    compressedCount = 0;

    validate(images)
      .then(function(msg) {
        console.log(colors.green(msg));

        for (let index in images) {
          const image = images[index];
          console.log(colors.blue("compressing: " + image));
          tinify.fromFile(image).toFile(image, function(err, data) {
            if (err) {
              reject(err);
            } else {
              console.log(colors.green("compressed: " + image));

              compressedCount++;
              if (compressedCount == images.length) {
                console.log(colors.green("finish tinyPng compression."));
                resolve(images);
              }
            }
          });
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

function validate(images) {
  console.log(colors.yellow("validating tinyPng..."));
  return new Promise((resolve, reject) => {
    tinify.validate(function(err) {
      if (err) {
        reject(
          "tinyPng validate error. Please check tinyPng's key, you can get it from https://tinypng.com/developers"
        );
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

module.exports = tinyPng;
