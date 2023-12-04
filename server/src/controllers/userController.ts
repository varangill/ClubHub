import {
  fetchUserInfo,
  fetchUserClubs,
  createNewUser,
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

const userController = {
  getUserInfo,
  getUserClubs,
  createUser,
};

export default userController;
