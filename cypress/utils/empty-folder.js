const fs = require('fs-extra');

const emptyFolder = (folderPath) => {
  try {
    fs.emptyDirSync(folderPath);
    return `Directory ${folderPath} emptied successfully.`;
  } catch (err) {
    return `Error while emptying ${folderPath} directory: ${err}`;
  }
};

module.exports.emptyFolder = emptyFolder;