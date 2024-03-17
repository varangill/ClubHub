import db from "../database/database";

async function fetchFilledApplicationInfo(filledApplicationId) {
    const query = "SELECT * FROM filled_applications WHERE id = $1";
    const res = await db.query(query, [filledApplicationId]);

    const application = res.rows[0];
    return application;
}

async function fetchFilledApplications() {
    const query = "SELECT * FROM filled_applications";
    const res = await db.query(query, []);

    const applications = res.rows;
    return applications;
}

async function fetchFilledClubApplications(clubId) {
    const query = `SELECT * FROM filled_applications WHERE "clubId" = $1 ORDER BY "applicationTime" DESC`;
    const res = await db.query(query, [clubId]);

    const applications = res.rows;
    return applications;
}

async function fetchFilledExecutiveApplications(clubId) {
    const query = `SELECT * FROM filled_applications WHERE "clubId" = $1 AND "type" = "executive"`;
    const res = await db.query(query, [clubId]);

    const applications = res.rows;
    return applications;
}

async function fetchFilledMemberApplications(clubId) {
    const query = `SELECT * FROM filled_applications WHERE "clubId" = $1 AND "type" = "member"`;
    const res = await db.query(query, [clubId]);

    const applications = res.rows;
    return applications;
}

async function createNewFilledApplication(clubId, userId, applicationId, type, appText) {
    const query = `INSERT INTO filled_applications ("clubId", "userId", "applicationId", "type", "appText") VALUES ($1, $2, $3, $4, $5) returning id`;
    const res = await db.query(query, [clubId, userId, applicationId, type, appText]);

    return res.rows[0];
}

async function deleteFilledApplication(id) {
    const query = `DELETE FROM filled_applications WHERE "id" = $1`
    const res = await db.query(query, [id])

    return res;
}

export { 
    fetchFilledApplicationInfo,
    fetchFilledApplications,
    fetchFilledClubApplications,
    fetchFilledExecutiveApplications,
    fetchFilledMemberApplications,
    createNewFilledApplication,
    deleteFilledApplication,
}