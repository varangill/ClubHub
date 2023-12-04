import db from "../database/database";

async function fetchUserInfo(userId) {
  const query = "SELECT id, email, name FROM users WHERE id = $1";
  const res = await db.query(query, [userId]);

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

export { fetchUserInfo, fetchUserClubs, createNewUser };
