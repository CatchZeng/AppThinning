#!/usr/bin/env node
const colors = require("colors");
const SVGO = require("svgo");
var FS = require('fs');

function svgo(files) {
  return new Promise((resolve, reject) => {
    if (files.length < 1) {
      reject("svg files is empty.");
    }
    
    var count = 0
    files.forEach(file => {
      FS.readFile(file, 'utf8', function(err, data) {
        if (err) {
          reject(err);
        }
        const svgTool = new SVGO();
        svgTool.optimize(data, {path: file}).then(function(result) {
          console.log(colors.blue("optimized "+ file));
          count ++;
          if (count == files.length) {
            resolve(files);
          }
        }).catch(function(err){
          reject(err);
        })
      })
    });
  })
}

module.exports = svgo;