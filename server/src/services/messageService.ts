import db from "../database/database";

async function createMessage(clubId, userId, text) {
  const query = `INSERT INTO chat_messages ("clubId", "userId", "text") VALUES ($1, $2, $3) RETURNING *`;
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
  //This query also fetches the sender's name from the users table
  const query = `SELECT chat_messages.*, users.name AS username
    FROM chat_messages
    JOIN users ON chat_messages."userId" = users.id
    WHERE chat_messages."clubId" = $1;
  `;

  const res = await db.query(query, [clubId]);

  return res.rows;
}

export { createMessage, updateMessage, deleteMessage, getMessages };
