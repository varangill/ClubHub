import {
  fetchClubInfo,
  fetchClubs,
  createNewClub,
  fetchClubMemberships,
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

async function getClubMemberships(req, res, next) {
  try {
    const fetchedData = await fetchClubMemberships(req.params.id);
    res.json(fetchedData);
  } catch (err) {
    console.error(`Error fetching club memberships, err.message`);
    next(err);
  }
}

async function createClub(req, res, next) {
  try {
    const newClubId = await createNewClub(
      req.body.clubName,
      req.body.desc,
      req.body.joinStatus,
      req.body.userId
    );
    res.send(newClubId);
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
  getClubMemberships,
};

export default clubController;
