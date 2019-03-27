#!/usr/bin/env node

const colors = require("colors");
const nodeCmd = require("node-cmd");
const path = require("path");

function imageOptim(images) {
  return new Promise((resolve, reject) => {
    if (images.length < 1) {
      reject("images is empty.");
    }

    let cmd =
      path.join(__dirname, "../../../node_modules/.bin/imageoptim") + " ";
    images.forEach(image => {
      cmd += "'" + image + "' ";
    });
    cmd = cmd.substring(0, cmd.lastIndexOf(" ")) + " -S"; //do not display file size savings and quality loss information

    nodeCmd.get(cmd, function(err, data, stderr) {
      if (err) {
        reject(err);
      } else {
        console.log(colors.green(data));
        resolve(images);
      }
    });
  });
}

module.exports = imageOptim;
