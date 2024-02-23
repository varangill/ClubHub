import {
  fetchClubInfo,
  fetchClubs,
  createNewClub,
  fetchClubMemberships,
  kickClubMember,
  banClubMember,
  promoteClubMember,
  demoteClubMember,
  transferClubOwnership,
  updateClubDetails,
  unbanClubMember,
  deleteClub,
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

async function updateClub(req, res, next) {
  try {
    await updateClubDetails(
      req.body.clubId,
      req.body.name,
      req.body.desc,
      req.body.status
    );

    res.send({ message: "Updated club" });
  } catch (err) {
    console.error(`Error updating club`, err.message);
    next(err);
  }
}

async function deleteExistingClub(req, res, next) {
  try {
    await deleteClub(req.body.clubId);
    res.send("Club deleted");
  } catch (err) {
    console.error(`Error deleting club`, err.message);
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

async function kickMember(req, res, next) {
  try {
    await kickClubMember(req.body.userId, req.body.clubId);
    res.send({ status: "kicked" });
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
}

async function banMember(req, res, next) {
  try {
    const ban = await banClubMember(
      req.body.userId,
      req.body.clubId,
      req.body.bannerId
    );
    res.json(ban);
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
}

async function unbanMember(req, res, next) {
  try {
    await unbanClubMember(req.body.userId, req.body.clubId);

    res.send("Unbanned");
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
}

async function promoteMember(req, res, next) {
  try {
    const newMembership = await promoteClubMember(
      req.body.userId,
      req.body.clubId
    );
    res.send(newMembership);
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
}

async function demoteMember(req, res, next) {
  try {
    const newMembership = await demoteClubMember(
      req.body.userId,
      req.body.clubId
    );
    res.send(newMembership);
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
}

async function transferOwner(req, res, next) {
  try {
    //returned membership is the membership of the previous owner
    const newMembership = await transferClubOwnership(
      req.body.newOwnerId,
      req.body.oldOwnerId,
      req.body.clubId
    );

    res.send(newMembership);
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
}

const clubController = {
  getClubInfo,
  getClubs,
  createClub,
  getClubMemberships,
  kickMember,
  banMember,
  unbanMember,
  promoteMember,
  demoteMember,
  transferOwner,
  updateClub,
  deleteExistingClub,
};

export default clubController;
