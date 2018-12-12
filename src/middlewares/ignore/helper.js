const fs = require("fs");

function getIgnoredFiles() {
  return new Promise((resolve, reject) => {
    fs.readFile("./ignore.txt", "utf8", function(err, data) {
      if (err) {
        reject(err);
      } else {
        const content = data.toString();
        const files = content.split("\n");
        const result = files.filter(function(file) {
          return file.length > 0;
        });
        resolve(result);
      }
    });
  });
}

function appendIgnoreFiles(files) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync("./ignore.txt", "utf8");
    let content = data.toString();
    if (content.length != 0 && !content.endsWith("\n")) {
      content += "\n";
    }
    for (let file of files) {
      content += file + "\n";
    }
    fs.writeFile("./ignore.txt", content, function(err) {
      if (err) {
        console.log("save to ignore.txt failed.");
        reject(err);
      } else {
        console.log("save to ignore.txt success.");
        resolve(files);
      }
    });
  });
}

module.exports = { getIgnoredFiles, appendIgnoreFiles };
