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

async function joinClub(userId, clubId) {
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

export {
  fetchUserInfo,
  fetchUserClubs,
  createNewUser,
  authenticateLogin,
  joinClub,
  leaveClub,
  getMembership,
};
