import db from "../database/database";

async function fetchAnnouncementInfo(announcementId) {
    const query = "SELECT * FROM announcements WHERE id = $1";
    const res = await db.query(query, [announcementId]);

    const announcement = res.rows[0];
    return announcement;
}


async function createNewAnnouncement(clubId, userId, announcementTitle, announcementText) {
    const query = `INSERT INTO announcements ("clubId", "userId", "announcementTitle", "announcementText") VALUES ($1, $2, $3, $4) RETURNING id`;
    const res = await db.query(query, [clubId, userId, announcementTitle, announcementText]);

    return res.rows[0];
}



async function fetchClubAnnouncements(clubId) {
    const query = `SELECT * FROM announcements WHERE "clubId" = $1 ORDER BY "announcementTime" DESC`;
    const res = await db.query(query, [clubId]);

    const announcements = res.rows;
    return announcements;
  }


async function deleteAnnouncement(id) {
    const query = `DELETE FROM announcements WHERE "id" = $1`;
    const res = await db.query(query, [id]);

    return res;
}


export {
    fetchAnnouncementInfo,
    createNewAnnouncement,
    fetchClubAnnouncements,
    deleteAnnouncement,

};