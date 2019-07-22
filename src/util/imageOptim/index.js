#!/usr/bin/env node

const colors = require("colors")
const nodeCmd = require("node-cmd")
const path = require("path")
const fs = require("fs-extra");
const {ImageOptimError} = require("../../error")

const IMAGEOPTIM_BIN_PATH = '/Applications/ImageOptim.app/Contents/MacOS/ImageOptim';

function imageOptim(images) {
  return new Promise((resolve, reject) => {
    if (images.length < 1) {
      reject("images is empty.")
    }
    
    if (!(fs.pathExists(IMAGEOPTIM_BIN_PATH))) {
      reject(new ImageOptimError(new Error(`ImageOptim.app is not installed.`)))
    }

    let cmd = IMAGEOPTIM_BIN_PATH + " "
    images.forEach(image => {
      cmd += "'" + image + "' "
    })
    cmd = cmd.substring(0, cmd.lastIndexOf(" "))

    nodeCmd.get(cmd, function(err, data, _) {
      if (err) {
        reject(new ImageOptimError(err))
      } else {
        console.log(colors.green(data))
        resolve(images)
      }
    })
  })
}

module.exports = imageOptim