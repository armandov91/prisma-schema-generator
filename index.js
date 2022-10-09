#! /usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const generator = require('./src/prisma-schema-generator');

program
    .name('prisma-schema-generator')
    .version('1.0.0')
    .description('A tool for managing structured schema files and generate a main schema file used by prisma.')
    .parse(process.argv)
    .action( () => {
        generator();
    })

program.parse();


module.exports = generator;
