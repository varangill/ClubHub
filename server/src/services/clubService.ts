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

async function createNewClub(clubName, desc, joinStatus) {
  const query = `INSERT INTO clubs ("clubName", "clubDesc", "joinStatus") VALUES ($1, $2, $3)`;
  const res = await db.query(query, [clubName, desc, joinStatus]);

  return res;
}

async function fetchClubMemberships(clubId) {
  const query = `SELECT * FROM memberships WHERE "clubId" = $1`;
  const res = await db.query(query, [clubId]);

  const clubs = res.rows;
  return clubs;
}

export { fetchClubInfo, fetchClubs, createNewClub, fetchClubMemberships };
