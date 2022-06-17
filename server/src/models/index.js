// const fs = require("fs");
// const path = require("path");

// for (const dir of getDirectories(__dirname)) {
//   let moduleName = dir.split("\\").pop();
//   moduleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
//   console.log("Importing model: " + moduleName + " at " + dir);
//   module.exports[moduleName] = require(dir);
// }

// function getDirectories(dirPath, dirArray) {
//   dirArray = dirArray || [];

//   const dirs = fs.readdirSync(dirPath, { withFileTypes: true })
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => dirent.name);

//   for (const dir of dirs) {
//     dirArray.push(path.join(dirPath, dir));
//     dirArray = getDirectories(dirPath + "/" + dir, dirArray);
//   }

//   return dirArray;
// }

const Event = require("./event");
const Shift = require("./event/shift");

module.exports = { Event, Shift };