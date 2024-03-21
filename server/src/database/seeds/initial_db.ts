import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("club_tags").del();
  await knex("chat_messages").del();
  await knex("announcements").del();
  await knex("applications").del();
  await knex("filled_applications").del();
  await knex("memberships").del();
  await knex("bans").del();
  await knex("tags").del();
  await knex("clubs").del();
  await knex("users").del();

  await knex("tags").insert([
    { id: "1", tagName: "Science" },
    { id: "2", tagName: "Sports" },
    { id: "3", tagName: "Mathematics" },
    { id: "4", tagName: "Engineering" },
    { id: "5", tagName: "Arts" },
    { id: "6", tagName: "Music" },
    { id: "7", tagName: "Games" },
    { id: "8", tagName: "Physical" },
    { id: "9", tagName: "Nature" },
    { id: "10", tagName: "Travel" },
  ]);
}
