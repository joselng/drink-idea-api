require('dotenv').config();

module.exports = {
  "type": process.env.DB_DRIVER,
  "database": "./src/app/database/" + process.env.DB_DATABASE,
  "synchronize": false,
  "logging": false,
  "entities": [
    "./src/modules/**/entities/*.ts"
  ],
  "migrations": [
    "./src/app/database/migrations/*.ts"
  ],
  "cli": {
    "entitiesDir": "./src/modules/**/entities",
    "migrationsDir": "./src/app/database/migrations",
  }
};
