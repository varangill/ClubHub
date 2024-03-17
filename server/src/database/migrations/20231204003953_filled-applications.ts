import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("filled_applications", function (table) {
        table.increments("id");
        table.integer("clubId").unsigned().notNullable();
        table.integer("userId").unsigned().notNullable();
        table.integer("applicationId").unsigned().notNullable();
        table.foreign("clubId").references("id").inTable("clubs");
        table.foreign("userId").references("id").inTable("users");
        table.foreign("applicationId").references("id").inTable("applications");
        table.string("name");
        table.string("type");
        table.string("appText");
        table.datetime("applicationTime");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("filled_applications");
}