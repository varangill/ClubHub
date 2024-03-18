import db from "../database/database";

async function fetchAnnouncementInfo(announcementId) {
    const query = "SELECT * FROM announcements WHERE id = $1";
    const res = await db.query(query, [announcementId]);

    const announcement = res.rows[0];
    return announcement;
}

async function fetchEventInfo(event_id) {
    const query = "SELECT * FROM evebts WHERE id = $1";
    const res = await db.query(query, [event_id]);

    const event = res.rows[0];
    return event;
}

async function createNewAnnouncement(clubId, userId, announcementTitle, announcementText) {
    const query = `INSERT INTO announcements ("clubId", "userId", "announcementTitle", "announcementText") VALUES ($1, $2, $3, $4) RETURNING id`;
    const res = await db.query(query, [clubId, userId, announcementTitle, announcementText]);

    return res.rows[0]
}


async function createNewEvent(club_id, title, event_date, location) {
    const query = `INSERT INTO events ("club_id", "title", "event_date", "location") VALUES ($1, $2, $3, $4) RETURNING event_id`;
    const res = await db.query(query, [club_id, title, event_date, location]);

    return res.rows[0]
}

async function fetchClubAnnouncements(clubId) {
    const query = `SELECT * FROM announcements WHERE "clubId" = $1 ORDER BY "announcementTime" DESC`;
    const res = await db.query(query, [clubId])

    const announcements = res.rows;
    return announcements;
  }

  async function fetchClubEvents(event_id) {
    const query = `SELECT * FROM events WHERE "event_id" = $1 ORDER BY "event_date" DESC`;
    const res = await db.query(query, [event_id])

    const events = res.rows;
    return events;
  }

async function deleteAnnouncement(id) {
    const query = `DELETE FROM announcements WHERE "id" = $1`;
    const res = await db.query(query, [id])

    return res;
}

async function deleteEvents(event_id) {
    const query = `DELETE FROM events WHERE "event_id" = $1`;
    const res = await db.query(query, [event_id])

    return res;
}

export {
    fetchAnnouncementInfo,
    createNewAnnouncement,
    fetchClubAnnouncements,
    deleteAnnouncement,
    deleteEvents,
    fetchClubEvents,
    createNewEvent,
    fetchEventInfo
};