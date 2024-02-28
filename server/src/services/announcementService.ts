import db from "../database/database";

async function fetchAnnouncementInfo(announcementId) {
    const query = "SELECT * FROM announcements WHERE id = $1";
    const res = await db.query(query, [announcementId]);

    const announcement = res.rows[0];
    return announcement;
}

async function fetchAnnouncements() {
    const query = "SELECT * FROM announcements";
    const res = await db.query(query, []);

    const announcements = res.rows;
    return announcements;
}

async function createNewAnnouncement(clubId, userId, announcementTitle, announcementText, announcementTime) {
    const query = `INSERT INTO announcements ("clubId", "userId", "announcementTitle", "announcementText", "announcementTime") VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    const res = await db.query(query, [clubId, userId, announcementTitle, announcementText, announcementTime]);

    return res.rows[0]
}

async function fetchClubAnnouncements(clubId) {
    const query = `SELECT * FROM announcements WHERE "clubId" = $1`;
    const res = await db.query(query, [clubId])

    const announcements = res.rows;
    return announcements;
  }

async function deleteAnnouncement(id) {
    const query = `DELETE FROM announcements WHERE "id" = $1`;
    const res = await db.query(query, [id])

    return res;
}

export {
    fetchAnnouncementInfo,
    fetchAnnouncements,
    createNewAnnouncement,
    fetchClubAnnouncements,
    deleteAnnouncement,
};