import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("memberships", function (table) {
    table.integer("clubId").unsigned().notNullable();
    table.integer("userId").unsigned().notNullable();
    table.foreign("clubId").references("id").inTable("clubs");
    table.foreign("userId").references("id").inTable("users");
    table.primary(["clubId", "userId"]);
    table.string("membershipType");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("memberships");
}
