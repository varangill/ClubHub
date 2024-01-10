import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("clubs").del();
  await knex("users").del();
  await knex("memberships").del();

  // Inserts seed entries
  await knex("clubs").insert([
    { id: "1", clubName: "Chess Club", clubDesc: "A club for ppl" },
    { id: "2", clubName: "Tennis Club", clubDesc: "Another club desc" },
    { id: "3", clubName: "Reading Club", clubDesc: "more descs" },
    { id: "4", clubName: "Science Club", clubDesc: "This is the science club" },
    { id: "5", clubName: "Art Club", clubDesc: "Art Club"} 
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
}
