import db from "../database/database";

async function createMessage(clubId, userId, text) {
  const query = `INSERT INTO chat_messages ("clubId", "userId", "text") VALUES ($1, $2, $3) RETURNING id`;
  const res = await db.query(query, [clubId, userId, text]);

  return res.rows[0]; //return ID of new message
}

async function updateMessage(messageId, newText) {
  const query = `UPDATE chat_messages SET "text" = $1 WHERE "id" = $2`;
  const res = await db.query(query, [newText, messageId]);

  return res.rows[0];
}

async function deleteMessage(messageId) {
  const deleteQuery = `DELETE FROM chat_messages WHERE "id" = $1`;
  const res = await db.query(deleteQuery, [messageId]);

  return res;
}

async function getMessages(clubId) {
  const query = `SELECT * FROM chat_messages WHERE "clubId" = $1`;
  const res = await db.query(query, [clubId]);

  return res.rows;
}

export { createMessage, updateMessage, deleteMessage, getMessages };
