import db from "../database/database";
import { hashPassword, validatePassword } from "../utils/authUtils";

async function fetchUserInfo(userId) {
  const query = "SELECT id, email, name FROM users WHERE id = $1";
  const res = await db.query(query, [userId]);

  const user = res.rows[0];
  return user;
}

async function fetchUserClubs(userId) {
  //Query for every club a user is in, including the membership type
  const query = `
    SELECT c.*, m."membershipType"
    FROM memberships m
    JOIN clubs c ON m."clubId" = c.id
    WHERE m."userId" = $1
  `;

  const res = await db.query(query, [userId]);
  return res.rows;
}

async function fetchAllUsers() {
  const query = "SELECT * FROM users";
  const res = await db.query(query, []);

  return res.rows;
}

async function deleteUser(userId) {
  const query = `DELETE FROM users WHERE "id" = $1`;
  const res = await db.query(query, [userId]);

  return res;
}

async function createNewUser(name, email, password) {
  const hashedPassword = await hashPassword(password);
  const query =
    "INSERT INTO users (name, email, password, is_registered) VALUES ($1, $2, $3, FALSE)";
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
    const is_registered = userInfo["is_registered"];
    return { isValid, id, name, is_registered };
  } else {
    //If password doesn't match, do not sent user data
    return { isValid };
  }
}

async function joinClub(userId, clubId) {
  const checkBanExistsQuery = `SELECT 1 FROM bans WHERE "userId" = $1 AND "clubId" = $2 LIMIT 1`;
  const banRes = await db.query(checkBanExistsQuery, [userId, clubId]);

  //If a ban exists, prevent membership from being created
  if (banRes.rows.length > 0) {
    return null;
  }

  const membershipType = "member";
  const query = `INSERT INTO memberships ("userId", "clubId", "membershipType") VALUES ($1, $2, $3)`;
  const res = await db.query(query, [userId, clubId, membershipType]);

  return res;
}

async function leaveClub(userId, clubId) {
  const query = `DELETE FROM memberships WHERE "clubId" = $1 AND "userId" = $2`;
  const res = await db.query(query, [clubId, userId]);

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

async function registerUserData(email) {
  const query = `UPDATE users SET "is_registered" = TRUE WHERE "email" = $1`;
  const res = await db.query(query, [email]);

  return res.rows[0];
}

export {
  fetchUserInfo,
  fetchUserClubs,
  createNewUser,
  authenticateLogin,
  joinClub,
  leaveClub,
  getMembership,
  registerUserData,
  fetchAllUsers,
  deleteUser,
};
