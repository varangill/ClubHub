import {
  fetchUserInfo,
  fetchUserClubs,
  createNewUser,
  joinClub,
  getMembership,
} from "../services/userService";

async function getUserInfo(req, res, next) {
  try {
    const fetchedData = await fetchUserInfo(req.params.id);
    res.json(fetchedData);
  } catch (err) {
    console.error(`Error fetching user info`, err.message);
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    await createNewUser(req.body.name, req.body.email, req.body.password);
    res.send("User successfully created");
  } catch (err) {
    console.error(`Error creating user`, err.message);
    next(err);
  }
}

async function getUserClubs(req, res, next) {
  try {
    const fetchedData = await fetchUserClubs(req.params.id);
    res.json(fetchedData);
  } catch (err) {
    console.error(`Error fetching user clubs`, err.message);
    next(err);
  }
}

async function getClubMembership(req, res, next) {
  try {
    const membership = await getMembership(req.body.userId, req.body.clubId);
    res.json(membership);
  } catch (err) {
    console.error(`Error creating user`, err.message);
    next(err);
  }
}

async function userJoinClub(req, res, next) {
  try {
    await joinClub(req.body.userId, req.body.clubId, req.body.membershipType);
    res.send("Successfully joined club");
  } catch (err) {
    console.error(`Error joining club`, err.message);
    next(err);
  }
}

const userController = {
  getUserInfo,
  getUserClubs,
  createUser,
  getClubMembership,
  userJoinClub,
};

export default userController;
