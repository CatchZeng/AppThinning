#!/usr/bin/env node

var nodeCmd = require("node-cmd");

function optimImages(images, callback) {
  if (images.length < 1) {
    return;
  }

  let cmd = "node_modules/.bin/imageoptim ";
  images.forEach(image => {
    cmd += "'" + image + "' ";
  });
  cmd = cmd.substring(0, cmd.lastIndexOf(" "));

  nodeCmd.get(cmd, function(err, data, stderr) {
    if (callback) {
      callback(err, data);
    }
  });
}

module.exports = optimImages;
