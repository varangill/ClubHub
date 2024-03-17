import db from "../database/database";

async function fetchApplications() {
    const query = "SELECT * FROM applications";
    const res = await db.query(query, []);

    const applications = res.rows;
    return applications;
}

async function fetchApplicationInfo(id) {
    const query = `SELECT * FROM applications WHERE "id" = $1`
    const res = await db.query(query, [id]);

    const application = res.rows[0];
    return application;
}

async function fetchClubApplication(clubId) {
    const query = `SELECT * FROM applications WHERE "clubId" = $1`;
    const res = await db.query(query, [clubId]);

    const applications = res.rows;
    return applications;
}

async function fetchExecutiveClubApplication(clubId) {
    const query = `
        SELECT * 
        FROM applications 
        WHERE "clubId" = $1 
        AND "type" = 'executive'
        ORDER BY "applicationTime" DESC
        LIMIT 1;
    `;
    const res = await db.query(query, [clubId]);

    const application = res.rows;
    return application;
}

async function fetchMemberClubApplication(clubId) {
    const query = `
        SELECT * 
        FROM applications 
        WHERE "clubId" = $1 
        AND "type" = 'member'
        ORDER BY "applicationTime" DESC
        LIMIT 1;
    `;
    const res = await db.query(query, [clubId]);

    const application = res.rows;
    return application;
}

async function fetchLatestClubApplication(clubId) {
    const query = `
        SELECT *
        FROM applications
        WHERE "clubId" = $1
        ORDER BY "applicationTime" DESC
        LIMIT 1;
    `;

    const res = await db.query(query, [clubId])

    const application = res.rows;
    return application
}

async function createApplication(clubId, userId, type, appText) {
    const query = `INSERT INTO applications ("clubId", "userId", "type", "appText") VALUES ($1, $2, $3, $4) RETURNING id`;
    const res = await db.query(query, [clubId, userId, type, appText]);

    return res.rows[0]
}

async function deleteApplication(id) {
    const query = `DELETE FROM applications WHERE "id" = $1`;
    const res = await db.query(query, [id]);

    return res;
}

export {
    fetchApplications,
    fetchApplicationInfo,
    fetchClubApplication,
    fetchExecutiveClubApplication,
    fetchMemberClubApplication,
    fetchLatestClubApplication,
    createApplication,
    deleteApplication,
}
