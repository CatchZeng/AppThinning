#!/usr/bin/env node

const colors = require("colors");
const nodeCmd = require("node-cmd");

function imageOptim(images) {
  return new Promise((resolve, reject) => {
    if (images.length < 1) {
      reject("images is empty.");
    }

    let cmd = "node_modules/.bin/imageoptim ";
    images.forEach(image => {
      cmd += "'" + image + "' ";
    });
    cmd = cmd.substring(0, cmd.lastIndexOf(" "));

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
