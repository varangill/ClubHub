import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("tags", function (table) {
      table.increments("id");
      table.string("tagName").notNullable();
    })
    .createTable("club_tags", function (table) {
      table.integer("clubId").unsigned().notNullable();
      table.integer("tagId").unsigned().notNullable();
      table.foreign("clubId").references("id").inTable("clubs");
      table.foreign("tagId").references("id").inTable("tags");
      table.primary(["clubId", "tagId"]);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tags").dropTable("club_tags");
}
