const fs = require("fs");
const path = require("path");
const files = fs.readdirSync("components");

const ERROR_TYPE = {
    INVALID_ARGUMENT: 0,
    NOT_FOUND_COMPONENT: 1,
};

function getComponentFilNames() {
    const objFiles = {};
    files.forEach((file) => {
        const fileName = file.split(".js")[0];

        objFiles[fileName.toLowerCase()] = file;
    });

    return objFiles;
}

function createFile(arg) {
    const components = getComponentFilNames();
    const name = components[arg];
    let outputDir = path.resolve("src/components");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const readFile = fs.readFileSync(`components/${name}`);
    const newComponentDir = `${outputDir}/${name}`;
    fs.writeFileSync(newComponentDir, readFile);
    console.log(name, "Successfully created");
}

function showList() {
    console.log("List available components");
    files.forEach((file, index) => {
        const fileName = file.split(".js")[0];

        console.log(`${index + 1}. ${fileName}`);
    });
}

function printMessage(type) {
    switch (type) {
        case ERROR_TYPE.INVALID_ARGUMENT:
            console.log("Please specify component name:");
            console.log("   create-react-component <component-name>");
            console.log();
            console.log("For example:");
            console.log("   create-react-component Spinner");
            console.log();
            console.log("Option:");
            console.log("   --list  print available component list");
            break;
        case ERROR_TYPE.NOT_FOUND_COMPONENT:
            console.log("");
            console.log("   create-react-component <component-name>");
            console.log();
            console.log("For example:");
            console.log("   create-react-component Spinner");
            console.log();
            console.log("Option:");
            console.log("   --list  print available component list");
    }
}

const components = getComponentFilNames();
const arg = process.argv[2].toLowerCase();

const optionCommand = {
    "--list": showList,
};

if (
    arg === undefined ||
    (components[arg] === undefined && optionCommand[arg] === undefined)
) {
    printMessage(ERROR_TYPE.INVALID_ARGUMENT);
    process.exit(1);
}

const run = components[arg] ? createFile : optionCommand[arg];

run(arg);
