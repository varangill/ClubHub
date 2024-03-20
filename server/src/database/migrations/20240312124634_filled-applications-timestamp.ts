import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("filled_applications", function (table) {
        table.timestamp("applicationTime").defaultTo(knex.fn.now()).alter();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("filled_applications", function (table) {
      table.datetime("applicationTime").alter();
    });
}