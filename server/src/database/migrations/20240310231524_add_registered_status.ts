import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("users", function (table) {
        table.boolean("is_registered").defaultTo(true).nullable;
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("users", function (table) {
        table.dropColumn("is_registered");
    });
}

