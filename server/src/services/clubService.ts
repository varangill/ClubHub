import db from "../database/database";

async function fetchClubInfo(clubId) {
  const query = "SELECT * FROM clubs WHERE id = $1";
  const res = await db.query(query, [clubId]);

  const club = res.rows[0];
  return club;
}

async function fetchClubs() {
  const query = "SELECT * FROM clubs";
  const res = await db.query(query, []);

  const clubs = res.rows;
  return clubs;
}

async function createNewClub(clubName, desc, joinStatus, userId) {
  const query = `INSERT INTO clubs ("clubName", "clubDesc", "joinStatus") VALUES ($1, $2, $3) RETURNING id`;
  const res = await db.query(query, [clubName, desc, joinStatus]);

  //Create new membership for the owner
  const clubId = res.rows[0]["id"];
  const membershipQuery = `INSERT INTO memberships ("clubId", "userId", "membershipType") VALUES ($1, $2, $3)`;
  await db.query(membershipQuery, [clubId, userId, "owner"]);

  return res.rows[0]; //return ID of new club
}

async function fetchClubMemberships(clubId) {
  //Query for every user in a club and return their data including their membership type
  const membershipsQuery = `
    SELECT m.*, u.id AS "userId", u.email, u.name, m."membershipType"
    FROM memberships m
    JOIN users u ON m."userId" = u.id
    WHERE m."clubId" = $1
  `;

  const membershipsRes = await db.query(membershipsQuery, [clubId]);
  return membershipsRes.rows;
}

async function kickClubMember(userId, clubId) {
  const query = `DELETE FROM memberships WHERE "clubId" = $1 AND "userId" = $2`;
  const res = await db.query(query, [clubId, userId]);

  return res;
}

async function banClubMember(userId, clubId) {}

async function unbanClubMember(userId, clubId) {}

async function promoteClubMember(userId, clubId) {}

async function demoteClubMember(userId, clubId) {}

async function transferClubOwnership(userId, clubId) {}

async function changeClubStatus(clubId, newStatus) {}

export {
  fetchClubInfo,
  fetchClubs,
  createNewClub,
  fetchClubMemberships,
  kickClubMember,
  banClubMember,
  unbanClubMember,
  promoteClubMember,
  demoteClubMember,
  transferClubOwnership,
  changeClubStatus,
};
