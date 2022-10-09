# Prisma Schema Generator
## Strucutred prisma schema management

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Prisma Schema Generator is a tool for joining multiple prisma files into one, allowing a more structured and maintainable prisma schemas.

## Installation

Prisma Schema Generator use prisma and prisma-aurora under the hood.

### Important: 
Since you will have separate files for each schema, take a look at prisma-aurora to check how you will relate
schemas between each other before attempting to execute the command. 

https://github.com/sabinadams/aurora

Dependencies 

```sh
npm install @prisma/client
npm install prisma
npm install prisma-aurora
```

Install...

```sh
npm install prisma-schema-generator
```

## Setup

In your package.json, make sure you have the following key:

```
{
    ....
    "prisma": {
        "schema": "path/to/your/schemas/schema.prisma"
    }
}
```

In this folder path/to/your/schemas (the one where you will have all you schemas), create the following file including the underscore:

```
_main.prisma
```

In this file you can add your prisma db configuration and any other related data that should only be once in the final generated file.

##### Example:

_main.prisma
```
datasource db {
  url      = env("DATABASE_URL")
  provider = "mysql"
}

generator client {
  provider = "prisma-client-js"
}
```

## Usage

In you current working directory, run the following command:

```
psgen
```

This command will do the following:

1) Generate a aurora.config.json file based on all the files inside your schema's folder defined in the package.json
2) Execute aurora command to make relationship between all files.
3) Merge the _main.prisma and _aurora.prisma files into the final schema.prisma file the will be used with any prisma commands

#### Note: 
_aurora.prisma file will be generated everytime you execute the command.

Now execute prisma commands as usual:

Example:
```
npx prisma generate
```

### Structure Example:


## License

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)


