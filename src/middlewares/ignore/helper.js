const fs = require("fs");
const path = require("path");

const ignoreFileName = "appthinning_ignore";

function getIgnoredFiles() {
  return new Promise((resolve, reject) => {
    const ignoreFilePath = path.join(process.cwd(), ignoreFileName);
    console.log("ignoreFilePath: " + ignoreFilePath);

    if (!fs.existsSync(ignoreFilePath)) {
      fs.writeFile(ignoreFilePath, "", function() {});
    }

    fs.readFile(ignoreFilePath, "utf8", function(err, data) {
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
    const ignoreFilePath = path.join(process.cwd(), ignoreFileName);
    console.log("ignoreFilePath: " + ignoreFilePath);

    if (!fs.existsSync(ignoreFilePath)) {
      fs.writeFile(ignoreFilePath, "", function() {});
    }

    const data = fs.readFileSync(ignoreFilePath, "utf8");
    let content = data.toString();
    if (content.length != 0 && !content.endsWith("\n")) {
      content += "\n";
    }
    for (let file of files) {
      content += file + "\n";
    }
    fs.writeFile(ignoreFilePath, content, function(err) {
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
