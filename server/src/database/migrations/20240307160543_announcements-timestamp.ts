import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("announcements", function (table) {
    table.timestamp("announcementTime").defaultTo(knex.fn.now()).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("announcements", function (table) {
    table.datetime("announcementTime").alter();
  });
}