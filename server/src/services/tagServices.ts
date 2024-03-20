import db from "../database/database";

async function fetchTags() {
  const query = "SELECT * FROM tags";
  const res = await db.query(query, []);

  const tags = res.rows;
  return tags;
}

async function addTagToClub(clubId, tagId) {
  const query = `INSERT INTO club_tags ("clubId", "tagId") VALUES ($1, $2)`;
  const res = await db.query(query, [clubId, tagId]);

  return res;
}

async function removeTagFromClub(clubId, tagId) {
  const query = `DELETE FROM club_tags WHERE "clubId" = $1 AND "tagId" = $2`;
  const res = await db.query(query, [clubId, tagId]);

  return res;
}

async function getClubsByTag(tagId) {
  const query = `
    SELECT c.*
    FROM clubs c
    JOIN club_tags ct ON c.id = ct."clubId"
    WHERE ct."tagId" = $1;
  `;
  const res = await db.query(query, [tagId]);

  return res.rows;
}

async function getTagsOfClub(clubId) {
  const query = `
    SELECT t.*
    FROM tags t
    JOIN club_tags ct ON t.id = ct."tagId"
    WHERE ct."clubId" = $1;
  `;
  const res = await db.query(query, [clubId]);

  return res.rows;
}

export {
  fetchTags,
  addTagToClub,
  removeTagFromClub,
  getClubsByTag,
  getTagsOfClub,
};
