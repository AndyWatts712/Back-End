// Update with your config settings.
//pgConnection for connecting to Heroku postgres
const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/lists";

module.exports = {

  development: {
    client: 'sqlite3',
    connection: { filename: './database/lists.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    }
  },
  production: {
    client: 'postgresql',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    }
  }
};
