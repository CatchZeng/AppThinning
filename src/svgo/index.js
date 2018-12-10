#!/usr/bin/env node

var nodeCmd = require("node-cmd");

function optimSvgs(files, callback) {
  if (files.length < 1) {
    return;
  }

  let cmd = "node_modules/.bin/svgo ";
  files.forEach(file => {
    cmd += "'" + file + "' ";
  });
  cmd = cmd.substring(0, cmd.lastIndexOf(" "));

  nodeCmd.get(cmd, function(err, data, stderr) {
    if (callback) {
      callback(err, data);
    }
  });
}

module.exports = optimSvgs;
