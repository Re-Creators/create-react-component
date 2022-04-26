const chalk = require("chalk");

module.exports.logSuccess = (msg) => {
    console.log();
    console.log(chalk.cyan(msg));
    console.log();
};

module.exports.logError = (msg) => {
    console.log(chalk.red("Command failed to execute."));
    console.log();
    console.log(chalk.red(msg));
    console.log("\n");
    process.exit(1);
};

module.exports.checkFileExist = (lists, file) => {
    return lists.find((list) => list.toLowerCase() === file.toLowerCase());
};
