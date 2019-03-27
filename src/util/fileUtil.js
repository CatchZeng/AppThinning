const fs = require("fs");

function getFileType(entry) {
  var extStart = entry.lastIndexOf(".");
  var type = entry.substring(extStart, entry.length).replace(".", "");
  return type;
}

function isCommonImage(entry) {
  const type = getFileType(entry).toUpperCase();
  return type === "JPG" || type === "JPEG" || type === "PNG";
}

function isGif(entry) {
  const type = getFileType(entry).toUpperCase();
  return type === "GIF";
}

function isSVG(entry) {
  const type = getFileType(entry).toUpperCase();
  return type === "SVG";
}

function calculateFilesSizeInKB(files) {
  var totalSize = 0;
  files.forEach(element => {
    const stat = fs.statSync(element);
    totalSize += Number(calculateStatSizeToKB(stat));
  });
  return totalSize.toFixed(1);
}

function calculateStatSizeToKB(stat) {
  return (stat.size / 1024).toFixed(1);
}

module.exports = {
  getFileType,
  isCommonImage,
  isSVG,
  isGif,
  calculateFilesSizeInKB,
  calculateStatSizeToKB
};
