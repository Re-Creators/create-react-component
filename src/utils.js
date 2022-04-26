const fs = require("fs");

module.exports.writeFile = (fileLocation, outputLocation) => {
    const readFile = fs.readFileSync(fileLocation);
    fs.writeFileSync(outputLocation, readFile, "utf-8");
};

module.exports.getComponentFiles = () => {
    const files = fs.readdirSync("components");

    return files.filter((file) => file.split(".js").length > 1);
};
