const settings = {
    // root folder of all your schemas
    dataPath : './prisma-schemas/',

    // name of the file that aurora generate data ie: aurora-file.prisma. This will be the output file name on the aurora.config.json
    auroraFileName : '_aurora',

    // prisma file extension definition
    fileExtension : '.prisma',

    // if we have files that we do not want to add to our json file, add them here.
    excludedFiles : ['schema.prisma', '_main.prisma', '_aurora.prisma'],

    // path to aurora's config json file
    auroraConfigFile : 'aurora.config.json',

    // Default prisma schema file name
    prismaSchemaFileName : 'schema',

    mainFileName : '_main',
}

module.exports = settings;
