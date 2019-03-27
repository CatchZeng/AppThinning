#!/usr/bin/env node

const fs = require("fs");
const walker = require("walker");
const { getFileType, calculateStatSizeToKB } = require("../../util/fileUtil");

class LargeFileFinder {
  constructor() {
    this.find = this.find.bind(this);
  }

  find(dir, ignoredFiles, size, maxSize, type, listener) {
    if (!dir) {
      console.log("please check dir.");
      return;
    }

    dir = dir.toString();
    const that = this;
    fs.access(dir, function(err) {
      if (err) {
        console.log("dir is no exist.");
        return;
      }

      that._findFiles(dir, ignoredFiles, size, maxSize, type, listener);
    });
  }

  _findFiles(dir, ignoredFiles, size, maxSize, type, listener) {
    walker(dir)
      .on("file", (entry, stat) => {
        if (this._isValidFile(ignoredFiles, entry, stat, type, size, maxSize)) {
          const kb = calculateStatSizeToKB(stat);
          const type = getFileType(entry);
          if (listener && listener.onFind) {
            listener.onFind(entry, type, kb);
          }
        }
      })
      .on("end", function() {
        if (listener && listener.didFinishFind) {
          listener.didFinishFind();
        }
      });
  }

  _isValidFile(ignoredFiles, entry, stat, type, size, maxSize) {
    return (
      ignoredFiles.indexOf(entry) == -1 &&
      this._checkFileType(entry, type) &&
      this._checkFileSize(stat, size, maxSize)
    );
  }

  _checkFileSize(stat, size, maxSize) {
    if (!size) {
      size = 1000;
    }
    const sizeNumber = Number(size);
    const kb = calculateStatSizeToKB(stat);

    if (maxSize === undefined) {
      return kb >= sizeNumber;
    } else {
      return kb >= sizeNumber && kb <= maxSize;
    }
  }

  _checkFileType(entry, type) {
    if (!type) {
      return true;
    }

    const typeString = type.toString();
    const typeArray = typeString.split("|");
    var ext = getFileType(entry).toUpperCase();
    for (let type of typeArray) {
      if (type.toUpperCase() === ext) {
        return true;
      }
    }
    return false;
  }
}

module.exports = LargeFileFinder;
