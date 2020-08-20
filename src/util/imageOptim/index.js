#!/usr/bin/env node

const colors = require("colors")
var exec = require('child_process').exec;
const path = require("path")
const fs = require("fs-extra");
const {ImageOptimError, ImageOptimNotInstalledError} = require("../../error")

const IMAGEOPTIM_BIN_PATH = '/Applications/ImageOptim.app/Contents/MacOS/ImageOptim';

function imageOptim(images) {
  return new Promise((resolve, reject) => {
    if (images.length < 1) {
      reject("images is empty.")
    }
    
    fs.pathExists(IMAGEOPTIM_BIN_PATH).then(function(exists){
      if (exists) {
        let cmd = IMAGEOPTIM_BIN_PATH + " "
        images.forEach(image => {
          cmd += "'" + image + "' "
        })
        cmd = cmd.substring(0, cmd.lastIndexOf(" "))
        exec(
          cmd,
          {maxBuffer: 1024 * 1024 * 1024},
          function(err, data, _) {
            if (err) {
              reject(new ImageOptimError(err))
            } else {
              console.log(colors.green(data))
              resolve(images)
            }
          }
        );
      } else {
        reject(new ImageOptimNotInstalledError())
      }
    })
  })
}

module.exports = imageOptim