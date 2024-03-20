import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: "postgres",
      host: "127.0.0.1",
      port: 5432,
      user: "postgres",
      password: "postgres",
    },
  },

  production: {
    client: "pg",
    connection: {
      database: "postgres",
      host: "34.28.131.1",
      port: 5432,
      user: "postgres",
      password: "postgres",
    },
  },
};

module.exports = config;
