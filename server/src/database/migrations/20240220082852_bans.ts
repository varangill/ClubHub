import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("bans", function (table) {
    table.integer("clubId").unsigned().notNullable();
    table.integer("userId").unsigned().notNullable();
    table.integer("bannerId").unsigned().notNullable();
    table.foreign("clubId").references("id").inTable("clubs");
    table.foreign("userId").references("id").inTable("users");
    table.foreign("bannerId").references("id").inTable("users");

    table.primary(["clubId", "userId"]);
    table.timestamp("banDate").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("bans");
}
