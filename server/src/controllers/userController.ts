async function getUserInfo(req, res, next) {
  try {
    res.send("User fetched");
  } catch (err) {
    console.error(`Error fetching user info`, err.message);
    next(err);
  }
}

const userController = {
  getUserInfo,
};

export default userController;
