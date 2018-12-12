#!/usr/bin/env node

const nodeCmd = require("node-cmd");
const colors = require("colors");

function svgo(files) {
  return new Promise((resolve, reject) => {
    if (files.length < 1) {
      reject("svg files is empty.");
    }

    let cmd = "node_modules/.bin/svgo ";
    files.forEach(file => {
      cmd += "'" + file + "' ";
    });
    cmd = cmd.substring(0, cmd.lastIndexOf(" "));

    nodeCmd.get(cmd, function(err, data, stderr) {
      if (err) {
        reject(err);
      } else {
        console.log(colors.green(data));
        resolve(files);
      }
    });
  });
}

module.exports = svgo;
