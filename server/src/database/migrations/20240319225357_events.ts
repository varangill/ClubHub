import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("events", function (table) {
        table.increments("event_id");
        table.integer("club_id").unsigned().notNullable();
        table.integer("userId").unsigned().notNullable();
        table.foreign("club_id").references("id").inTable("clubs");
        table.foreign("userId").references("id").inTable("users");
        table.string("title");
        table.string("location");
        table.string("eventText");
        table.date("event_date");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("events");
}
