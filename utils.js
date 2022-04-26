const fs = require("fs");

module.exports.writeFile = (fileLocation, outputLocation) => {
    const readFile = fs.readFileSync(fileLocation);
    fs.writeFileSync(outputLocation, readFile, "utf-8");
};
