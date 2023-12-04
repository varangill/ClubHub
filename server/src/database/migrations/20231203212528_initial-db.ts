import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("clubs", function (table) {
      table.increments("id");
      table.string("clubName").notNullable();
      table.string("clubDesc").notNullable();
    })
    .createTable("users", function (table) {
      table.increments("id");
      table.string("email");
      table.string("password");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users").dropTable("clubs");
}
