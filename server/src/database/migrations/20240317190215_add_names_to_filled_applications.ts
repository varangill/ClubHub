import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("filled_applications", table => {
        table.string("name");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("filled_applications", table => {
        table.dropColumn("name");
    })
}

