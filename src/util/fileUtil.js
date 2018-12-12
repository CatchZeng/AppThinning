function getFileType(entry) {
  var extStart = entry.lastIndexOf(".");
  var type = entry.substring(extStart, entry.length).replace(".", "");
  return type;
}

function isCommonImage(entry) {
  const type = getFileType(entry).toUpperCase();
  return type === "JPG" || type === "JPEG" || type === "PNG" || type === "GIF";
}

function isSVG(entry) {
  const type = getFileType(entry).toUpperCase();
  return type === "SVG";
}

module.exports = { getFileType, isCommonImage, isSVG };
