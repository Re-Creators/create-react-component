#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const { Command } = require("commander");
const program = new Command();

const { logError, logSuccess, checkFileExist } = require("./helpers");
const { writeFile, getComponentFiles } = require("./utils");
const files = getComponentFiles();
const defaultPath = "components";

function getComponentFilNames() {
    const objFiles = {};
    files.forEach((file) => {
        const fileName = file.split(".js")[0];

        objFiles[fileName.toLowerCase()] = file;
    });

    return objFiles;
}

function createFile({ exist, component }) {
    if (!exist) {
        logError(`${chalk.cyan(component)} component is not found`);
    }
    let outputDir = path.resolve("src/components");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const newComponentDir = path.join(outputDir, component);
    writeFile(`${defaultPath}/${component}`, newComponentDir);

    logSuccess(`${component} Successfully created`);
}

function saveFile(componentPath, name) {
    const location = path.resolve(componentPath);

    if (!fs.existsSync(location)) {
        logError(
            "Sorry component not found, make sure you have input the correct path."
        );
    }

    const ext = path.extname(componentPath);
    let componentName = path.basename(componentPath, ext);

    if (name) {
        componentName = name;
    }

    if (checkFileExist(files, `${componentName}.js`)) {
        logError(
            `Component with name ${chalk.cyan(
                componentName
            )} already exist. Please enter another component name `
        );
    }

    writeFile(location, `${defaultPath}/${componentName}.js`);
    logSuccess(`${componentName} component saved successfully`);
}

function removeFile(name) {
    if (!checkFileExist(files, `${name}.js`)) {
        logError(
            `Component not found, make sure component already in list.\nyou can run ${chalk.green(
                "create-react-component list"
            )} to see full list of component`
        );
    }

    fs.unlinkSync(`${defaultPath}/${name}.js`);
    logSuccess(`${name} component successfully deleted.`);
}

function showList() {
    if (files.length === 0) {
        console.log();
        console.log(chalk.cyan(`There is no available component`));
        process.exit(1);
    }

    console.log();
    console.log(chalk.green("List available components"));

    files.forEach((file, index) => {
        const fileName = file.split(".js")[0];

        console.log(chalk.cyan(`${index + 1}. ${fileName}`));
    });
    console.log();
}

function checkComponent(value) {
    const components = getComponentFilNames();
    const component = components[value.toLowerCase()];

    return {
        exist: component ? true : false,
        component: component || value,
    };
}

const { version } = require("../package.json");
program
    .name("create-react-component")
    .description("CLI to create and save existing react component")
    .version(version);

program
    .command("create")
    .description("create a new component into your directory")
    .argument("<component-name>", "name of the component", checkComponent)
    .action(createFile);

program
    .command("save")
    .description("save your component")
    .arguments("<directory-component> [component-name]")
    .action(saveFile);

program
    .command("list")
    .description("show all available component")
    .action(showList);

program
    .command("remove")
    .description("remove component from list")
    .argument("<component-name>", "component that already in list")
    .action(removeFile);

program.parse();
