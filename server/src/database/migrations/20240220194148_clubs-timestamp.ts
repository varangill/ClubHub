import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("clubs", function (table) {
    table.timestamp("creationDate").defaultTo(knex.fn.now()).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("clubs", function (table) {
    table.datetime("creationDate").alter();
  });
}
