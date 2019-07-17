const fs = require("fs");
const path = require("path");
const colors = require("colors");

const ignoreFileName = "appthinning_ignore";

function createIgnoreFile(ignoreFilePath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(ignoreFilePath)) {
      fs.writeFileSync(ignoreFilePath, "");
    }
  });
}

function getIgnoredFiles(dir) {
  return new Promise((resolve, reject) => {
    const ignoreFilePath = path.join(dir, ignoreFileName);
    createIgnoreFile(ignoreFilePath);
    
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

function appendIgnoreFiles(dir, files) {
  return new Promise((resolve, reject) => {
    const ignoreFilePath = path.join(dir, ignoreFileName);
    createIgnoreFile(ignoreFilePath);

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
        console.log(colors.red("save to ignore file failed."));
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

module.exports = { getIgnoredFiles, appendIgnoreFiles };