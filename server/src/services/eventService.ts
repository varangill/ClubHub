import db from "../database/database";

async function fetchEventInfo(event_id) {
    const query = "SELECT * FROM events WHERE id = $1";
    const res = await db.query(query, [event_id]);

    const event = res.rows[0];
    return event;
}

async function createNewEvent(club_id, title, event_date, location,userId,eventText ) {
    const query = `INSERT INTO events ("club_id", "title", "event_date", "location", "userId", "eventText") VALUES ($1, $2, $3, $4, $5, $6) RETURNING event_id`;
    const res = await db.query(query, [club_id, title, event_date, location, userId,eventText ]);

    return res.rows[0]
}

  async function fetchClubEvents(clubId) {
    const query = `SELECT * FROM events WHERE "club_id" = $1 ORDER BY "event_date" DESC`;
    const res = await db.query(query, [clubId])

    const events = res.rows;
    return events;
  }

async function deleteEvents(event_id) {
    const query = `DELETE FROM events WHERE "event_id" = $1`;
    const res = await db.query(query, [event_id])

    return res;
}

export {
    deleteEvents,
    fetchClubEvents,
    createNewEvent,
    fetchEventInfo
};