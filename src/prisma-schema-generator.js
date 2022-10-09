const process = require('process');
const path = require('path');
const exec = require('child_process').exec;
const config = require(path.join(process.cwd(), 'package'));
const settings = require('./settings');
const configGenerator = require('./generate-config-file');
const schemaGenerator = require('./merge-prisma-files');

function OsFunc() {
    this.execCommand = function (cmd) {
        return new Promise((resolve, reject)=> {
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(stdout)
            });
        })
    }
}

const os = new OsFunc();

function getSettings() {
    const prismaConfig = config.prisma;
    const generatorConfig = config.prismaGenerator;

    // check if user added a custom schema file path or name
    const userSchemaFilePath = config.prisma ? (config.prisma.schema ? config.prisma.schema : undefined) : undefined;

    if (userSchemaFilePath) {
        settings.dataPath = userSchemaFilePath.replace(path.parse(userSchemaFilePath).base, '');
        settings.prismaSchemaFileName = path.parse(userSchemaFilePath).name;
        settings.excludedFiles.push(path.parse(userSchemaFilePath).base);
    }

    // TODO check if we have custom setting for our generator
    if (generatorConfig) {

    }

    return {...settings};
}

async function executeGenerator() {
    const settings = getSettings();
    await generateAuroraConfigFile(settings);
    await executeAurora();
    await generatePrismaSchemaFile(settings);

}

async function generateAuroraConfigFile(settings) {
    await configGenerator(settings);
    console.log('Aurora config file created!');
}

async function executeAurora() {
    console.log('Executing Aurora');
    await os.execCommand('aurora');
    console.log('Aurora execution completed!')
}

async function generatePrismaSchemaFile(settings) {
    await schemaGenerator(settings);
}

module.exports = executeGenerator;
