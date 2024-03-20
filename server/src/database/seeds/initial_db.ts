import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("club_tags").del();
  await knex("chat_messages").del();
  await knex("announcements").del();
  await knex("applications").del();
  await knex("filled-applications").del();
  await knex("memberships").del();
  await knex("bans").del();
  await knex("tags").del();
  await knex("clubs").del();
  await knex("users").del();

  // Inserts seed entries
  await knex("clubs").insert([
    { id: "1", clubName: "UWOc1", clubDesc: "A club for ppl" },
    { id: "2", clubName: "LoremIpsum2", clubDesc: "Another club desc" },
    { id: "3", clubName: "club3", clubDesc: "more descs" },
  ]);

  await knex("users").insert([
    { id: "1", name: "Lorem Ipsum", email: "u1@t.com", password: "p123" },
    { id: "2", name: "Guy Man", email: "u2@t.com", password: "p123" },
    { id: "3", name: "Abc Def", email: "u3@t.com", password: "p123" },
  ]);

  await knex("memberships").insert([
    { clubId: "1", userId: "1", membershipType: "member" },
    { clubId: "3", userId: "1", membershipType: "owner" },
    { clubId: "1", userId: "2", membershipType: "owner" },
    { clubId: "2", userId: "2", membershipType: "executive" },
    { clubId: "1", userId: "3", membershipType: "owner" },
    { clubId: "2", userId: "3", membershipType: "owner" },
    { clubId: "3", userId: "3", membershipType: "executive" },
  ]);

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

  // await knex("announcements").insert([
  //   { id: "1", clubId: "1", userId: "1", announcementTitle: "TITLE", announcementText: "TEXT", announcementTime: "2023-07-23T06:42:32.520Z"}
  // ])

  await knex("applications").insert([
    {
      id: "1",
      clubId: "1",
      userId: "1",
      appText: "What is your name",
      applicationTime: "2023-07-23T06:42:32.520Z",
    },
  ]);
}
