import db from "../database/database";
import { hashPassword, validatePassword } from "../utils/authUtils";

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
  const clubIds = clubs.map((club) => club["clubId"]);

  const clubQuery = `SELECT * FROM clubs WHERE id IN (${clubIds
    .map((_, index) => `$${index + 1}`)
    .join(", ")})`;
  const clubRes = await db.query(clubQuery, clubIds);

  return clubRes.rows;
}

async function createNewUser(name, email, password) {
  const hashedPassword = await hashPassword(password);
  const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
  const res = await db.query(query, [name, email, hashedPassword]);

  return res;
}

async function authenticateLogin(email, passwordInput) {
  const query = "SELECT * FROM users WHERE email = $1";
  const res = await db.query(query, [email]);
  const userInfo = res.rows[0];
  const hashedPassword = userInfo["password"];

  const isValid = await validatePassword(passwordInput, hashedPassword);

  if (isValid) {
    //If password matches, send user data
    const id = userInfo["id"];
    const name = userInfo["name"];
    return { isValid, id, name };
  } else {
    //If password doesn't match, do not sent user data
    return { isValid };
  }
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
  if (!membership) {
    return {
      membershipType: "none",
    };
  }
  return membership;
}

export {
  fetchUserInfo,
  fetchUserClubs,
  createNewUser,
  authenticateLogin,
  joinClub,
  getMembership,
};
