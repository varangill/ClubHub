import {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessages,
} from "../services/messageService";

async function sendMessage(req, res, next) {
  try {
    const newMessageId = await createMessage(
      req.body.clubId,
      req.body.userId,
      req.body.text
    );
    res.json(newMessageId);
  } catch (err) {
    console.error("Error creating message", err.message);
    next(err);
  }
}

async function editMessage(req, res, next) {
  try {
    await updateMessage(req.body.messageId, req.body.newText);
    res.send({ response: "updated" });
  } catch (err) {
    console.error("Error creating message", err.message);
    next(err);
  }
}

async function removeMessage(req, res, next) {
  try {
    await deleteMessage(req.body.messageId);
    res.send({ response: "deleted" });
  } catch (err) {
    console.error("Error creating message", err.message);
    next(err);
  }
}

async function getClubMessages(req, res, next) {
  try {
    const messages = await getMessages(req.params.id);
    res.json(messages);
  } catch (err) {
    console.error("Error creating message", err.message);
    next(err);
  }
}

const messageController = {
  sendMessage,
  editMessage,
  removeMessage,
  getClubMessages,
};

export default messageController;
