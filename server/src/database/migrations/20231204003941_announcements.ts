import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("announcements", function (table) {
    table.increments("id");
    table.integer("clubId").unsigned().notNullable();
    table.integer("userId").unsigned().notNullable();
    table.foreign("clubId").references("id").inTable("clubs");
    table.foreign("userId").references("id").inTable("users");
    table.string("announcementTitle");
    table.string("announcementText");
    table.datetime("announcementTime");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("announcements");
}
