const fs = require('fs').promises;
const os = require('os');

async function mergeFiles(settings) {
    const baseText = await fs.readFile(settings.dataPath + settings.mainFileName + settings.fileExtension, 'utf8');
    const modelsText = await fs.readFile(settings.dataPath + settings.auroraFileName + settings.fileExtension, 'utf8');
    const prismaFile = await fs.open(settings.dataPath + settings.prismaSchemaFileName + settings.fileExtension, 'w');
    await prismaFile.write(baseText);
    await prismaFile.write(os.EOL+os.EOL);
    await prismaFile.write(modelsText);
    await prismaFile.close();
}

module.exports = mergeFiles;
