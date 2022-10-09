const fs = require('fs').promises;
const os = require('os');
const path = require("path");

async function getAllFilesFromSchemasDirectory(directory, settings, files) {
    files = files || [];
    const filesInDirectory = await fs.readdir(directory);
    for (const file of filesInDirectory) {
        const absolute = path.join(directory, file);
        if ((await fs.stat(absolute)).isDirectory()) {
            await getAllFilesFromSchemasDirectory(absolute, settings, files);
        } else if (path.parse(file).ext === settings.fileExtension){
            files.push(absolute);
        }
    }

    files = files.filter(file => {
        return (path.extname(file).toLowerCase() === settings.fileExtension) && (!settings.excludedFiles.includes(path.basename(file)));
    });

    return files;
}

async function generateConfigFile(settings) {
    const prismaFiles = await getAllFilesFromSchemasDirectory(settings.dataPath, settings);

    const auroraConfigData = {
        "files": prismaFiles,
        "output": settings.dataPath + settings.auroraFileName + settings.fileExtension
    };

    await fs.writeFile(settings.auroraConfigFile, JSON.stringify(auroraConfigData, null, 2), 'utf8');
}

module.exports = generateConfigFile;
