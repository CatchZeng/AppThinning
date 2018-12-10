var fs = require("fs");

function getIgnoredFiles(callback) {
  fs.readFile("./ignore.txt", "utf8", function(err, data) {
    if (err) {
      if (callback) {
        callback(err, undefined);
      }
    } else {
      const content = data.toString();
      const files = content.split("\n");
      const result = files.filter(function(file) {
        return file.length > 0;
      });
      callback(undefined, result);
    }
  });
}

function appendIgnoreFiles(files) {
  const data = fs.readFileSync("./ignore.txt", "utf8");
  let content = data.toString();
  if (content.length != 0 && !content.endsWith("\n")) {
    content += "\n";
  }
  for (let file of files) {
    content += file + "\n";
  }
  fs.writeFile("./ignore.txt", content, function(err) {
    if (err) console.log("save to ignore.txt failed.");
    else console.log("save to ignore.txt success.");
  });
}

module.exports = { getIgnoredFiles, appendIgnoreFiles };
