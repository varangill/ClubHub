import {
  fetchClubInfo,
  fetchClubs,
  createNewClub,
} from "../services/clubService";

async function getClubInfo(req, res, next) {
  try {
    const fetchedData = await fetchClubInfo(req.params.id);
    res.json(fetchedData);
  } catch (err) {
    console.error(`Error fetching club info`, err.message);
    next(err);
  }
}

async function createClub(req, res, next) {
  try {
    await createNewClub(req.body.clubName, req.body.desc, req.body.joinStatus);
    res.send("Club successfully created");
  } catch (err) {
    console.error(`Error creating club`, err.message);
    next(err);
  }
}

async function getClubs(req, res, next) {
  try {
    const fetchedData = await fetchClubs();
    res.json(fetchedData);
  } catch (err) {
    console.error(`Error fetching clubs`, err.message);
    next(err);
  }
}

const clubController = {
  getClubInfo,
  getClubs,
  createClub,
};

export default clubController;
