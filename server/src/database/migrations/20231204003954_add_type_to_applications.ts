import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("applications", table => {
        table.string("type");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("applications", table => {
        table.dropColumn("type");
    })
}
