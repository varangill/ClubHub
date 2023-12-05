import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("clubs", function (table) {
      table.increments("id");
      table.string("clubName").notNullable();
      table.string("clubDesc").notNullable();
      table.datetime("creationDate");
      table.string("joinStatus");
    })
    .createTable("users", function (table) {
      table.increments("id");
      table.string("email");
      table.string("password");
      table.string("name");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users").dropTable("clubs");
}
