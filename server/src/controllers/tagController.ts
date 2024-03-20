import {
  fetchTags,
  addTagToClub,
  removeTagFromClub,
  getClubsByTag,
  getTagsOfClub,
} from "../services/tagServices";

async function getTags(req, res, next) {
  try {
    const tags = await fetchTags();
    res.json(tags);
  } catch (err) {
    console.error(`Error getting tags`, err.message);
    next(err);
  }
}

async function createClubTag(req, res, next) {
  try {
    const clubTag = await addTagToClub(req.body.clubId, req.body.tagId);
    res.json(clubTag);
  } catch (err) {
    console.error(`Error creating club tag`, err.message);
    next(err);
  }
}

async function removeClubTag(req, res, next) {
  try {
    await removeTagFromClub(req.body.clubId, req.body.tagId);
    res.json({ message: "Removed" });
  } catch (err) {
    console.error(`Error removing club tag`, err.message);
    next(err);
  }
}

async function getClubsWithTag(req, res, next) {
  try {
    const clubs = await getClubsByTag(req.params.id);
    res.json(clubs);
  } catch (err) {
    console.error(`Error getting clubs by tag`, err.message);
    next(err);
  }
}

async function getClubsTags(req, res, next) {
  try {
    const tags = await getTagsOfClub(req.params.id);
    res.json(tags);
  } catch (err) {
    console.error(`Error getting tags`, err.message);
    next(err);
  }
}

const tagController = {
  getTags,
  createClubTag,
  removeClubTag,
  getClubsWithTag,
  getClubsTags,
};

export default tagController;
