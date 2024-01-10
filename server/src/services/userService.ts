import db from "../database/database";

async function fetchUserInfo(userId) {
  const query = "SELECT id, email, name FROM users WHERE id = $1";
  const res = await db.query(query, [userId]);

  const user = res.rows[0];
  return user;
}

async function fetchUserInfoWithName(name) {
  const query = "SELECT id, email, name, password FROM users WHERE name = $1";
  const res = await db.query(query, [name]);

  const user = res.rows[0];
  return user;
}

async function fetchUserClubs(userId) {
  const query = `SELECT * FROM memberships WHERE "userId" = $1`;
  const res = await db.query(query, [userId]);

  const clubs = res.rows;
  return clubs;
}

async function createNewUser(name, email, password) {
  const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
  const res = await db.query(query, [name, email, password]);

  return res;
}

async function joinClub(userId, clubId, membershipType) {
  const query = `INSERT INTO memberships ("userId", "clubId", "membershipType") VALUES ($1, $2, $3)`;
  const res = await db.query(query, [userId, clubId, membershipType]);

  return res;
}

async function getMembership(userId, clubId) {
  const query = `SELECT * FROM memberships WHERE "userId" = $1 AND "clubId" = $2`;
  const res = await db.query(query, [userId, clubId]);

  const membership = res.rows[0];
  return membership;
}

export {
  fetchUserInfo,
  fetchUserClubs,
  createNewUser,
  joinClub,
  getMembership,
  fetchUserInfoWithName,
};
