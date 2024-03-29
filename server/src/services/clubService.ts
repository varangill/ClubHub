import db from "../database/database";

async function fetchClubInfo(clubId) {
  const query = " SELECT * FROM clubs WHERE id = $1";
  const res = await db.query(query, [clubId]);

  const club = res.rows[0];
  return club;
}

async function fetchClubs() {
  //Also fetch the tags for each club
  const query = `
    SELECT
      c.id,
      c."clubName",
      c."clubDesc",
      STRING_AGG(t."tagName", ', ') AS tagNames
    FROM
      clubs c
    LEFT JOIN club_tags ct ON c.id = ct."clubId"
    LEFT JOIN tags t ON ct."tagId" = t.id
    GROUP BY
      c.id;
  `;
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

async function updateClubDetails(clubId, clubName, clubDesc, clubStatus) {
  const query = `UPDATE clubs SET "joinStatus" = $1, "clubName" = $2, "clubDesc" = $3 WHERE "id" = $4`;
  const res = await db.query(query, [clubStatus, clubName, clubDesc, clubId]);

  return res.rows[0];
}

async function deleteClub(clubId) {
  const deleteQuery = `DELETE FROM memberships WHERE "clubId" = $1`;
  await db.query(deleteQuery, [clubId]);

  const query = `DELETE FROM clubs WHERE "id" = $1`;
  const res = await db.query(query, [clubId]);

  return res;
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

async function fetchBannedMembers(clubId) {
  //query to get a list of all the banned members
  const query = `
  SELECT bannedUsers.name AS "BannedUserName",banners.name AS "BannerName", bans."banDate" AS "BanDate", bans."userId", bannedUsers.*
  FROM bans
  JOIN users AS bannedUsers ON bans."userId" = bannedUsers."id"
  JOIN users AS banners ON bans."bannerId" = banners."id"
  WHERE bans."clubId" = $1
  `;
  const res = await db.query(query, [clubId]);
  return res.rows;
}

async function fetchClubOwner(clubId) {
  // return the owner of the given club
  const membershipsQuery = `
    SELECT u.name
    FROM memberships m
    JOIN users u ON m."userId" = u.id
    WHERE m."clubId" = $1 AND m."membershipType" = 'owner'
    LIMIT 1
  `;

  const membershipsRes = await db.query(membershipsQuery, [clubId]);
  return membershipsRes.rows;
}

async function kickClubMember(userId, clubId) {
  const query = `DELETE FROM memberships WHERE "clubId" = $1 AND "userId" = $2`;
  const res = await db.query(query, [clubId, userId]);

  return res;
}

async function banClubMember(userId, clubId, bannerId) {
  const banQuery = `INSERT INTO bans ("userId", "clubId", "bannerId") VALUES ($1, $2, $3)`;
  const deleteMembershipQuery = `DELETE FROM memberships WHERE "clubId" = $1 AND "userId" = $2`; //delete existing membership

  const res = await db.query(banQuery, [userId, clubId, bannerId]);
  await db.query(deleteMembershipQuery, [clubId, userId]);

  return res;
}

async function unbanClubMember(userId, clubId) {
  const deleteBanQuery = `DELETE FROM bans WHERE "clubId" = $1 AND "userId" = $2`;
  const res = await db.query(deleteBanQuery, [clubId, userId]);

  return res;
}

async function promoteClubMember(userId, clubId) {
  const query = `UPDATE memberships SET "membershipType" = 'executive' WHERE "userId" = $1 AND "clubId" = $2`;
  const res = await db.query(query, [userId, clubId]);

  return res;
}

async function demoteClubMember(userId, clubId) {
  const query = `UPDATE memberships SET "membershipType" = 'member' WHERE "userId" = $1 AND "clubId" = $2`;
  const res = await db.query(query, [userId, clubId]);

  return res;
}

async function transferClubOwnership(newOwnerId, oldOwnerId, clubId) {
  const query1 = `UPDATE memberships SET "membershipType" = 'owner' WHERE "userId" = $1 AND "clubId" = $2`;
  const query2 = `UPDATE memberships SET "membershipType" = 'executive' WHERE "userId" = $1 AND "clubId" = $2`;

  await db.query(query1, [newOwnerId, clubId]);
  const res = await db.query(query2, [oldOwnerId, clubId]);

  return res;
}

export {
  fetchClubInfo,
  fetchBannedMembers,
  fetchClubs,
  createNewClub,
  fetchClubMemberships,
  fetchClubOwner,
  kickClubMember,
  banClubMember,
  unbanClubMember,
  promoteClubMember,
  demoteClubMember,
  transferClubOwnership,
  updateClubDetails,
  deleteClub,
};
