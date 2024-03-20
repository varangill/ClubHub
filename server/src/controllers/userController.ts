import {
  fetchUserInfo,
  fetchUserClubs,
  createNewUser,
  authenticateLogin,
  joinClub,
  leaveClub,
  getMembership,
  registerUserData,
} from "../services/userService";
import nodemailer from "nodemailer";

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
  const env_domain = process.env.CLIENT_URL;

  //email: official.clubhub@gmail.com
  //pswd: guiFUfsdfhsJKI8934nmfskd!

  try {
    const fetchedData = await createNewUser(
      req.body.name,
      req.body.email,
      req.body.password
    );
    res.send(fetchedData);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "official.clubhub@gmail.com",
        pass: "wjevfsawqpyrdxka",
      },
    });

    const mailOptions = {
      from: "official.clubhub@gmail.com",
      to: `${req.body.email}`,
      subject: "ClubHub: Email Verification",
      html: `
          <p>Please click the following link to verify your email:</p>
          <a href="${env_domain}/register-user/${req.body.email}">Verify Email</a>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification email:", error);
      } else {
        console.log("Verification email sent:", info.response);
      }
    });
  } catch (err) {
    console.error(`Error creating user`, err.message);
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const loginAuth = await authenticateLogin(
      req.body.email,
      req.body.password
    );
    if (loginAuth.isValid) {
      res.send({
        authenticated: true,
        id: loginAuth.id,
        name: loginAuth.name,
        is_registered: loginAuth.is_registered,
      });
    } else {
      res.send({ authenticated: false });
    }
  } catch (err) {
    console.error(`Error logging user in`, err.message);
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
    const membership = await getMembership(req.query.userId, req.query.clubId);
    res.json(membership);
  } catch (err) {
    console.error(`Error creating user`, err.message);
    next(err);
  }
}

async function userJoinClub(req, res, next) {
  try {
    const didUserJoin = await joinClub(req.body.userId, req.body.clubId);
    if (didUserJoin) {
      res.send({ membershipType: "member" });
    } else {
      res.send({ membershipType: "banned" });
    }
  } catch (err) {
    console.error(`Error joining club`, err.message);
    next(err);
  }
}

async function userLeaveClub(req, res, next) {
  try {
    await leaveClub(req.body.userId, req.body.clubId);
    res.send({ membershipType: "none" });
  } catch (err) {
    console.error(`Error leaving club`, err.message);
    next(err);
  }
}

async function registerUser(req, res, next) {
  try {
    await registerUserData(req.body.email);
    res.send({ message: "Updated User" });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const userController = {
  getUserInfo,
  getUserClubs,
  createUser,
  loginUser,
  getClubMembership,
  userJoinClub,
  userLeaveClub,
  registerUser,
};

export default userController;
