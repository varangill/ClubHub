import {
    fetchFilledApplicationInfo,
    fetchFilledApplications,
    fetchFilledClubApplications,
    fetchFilledExecutiveApplications,
    fetchFilledMemberApplications,
    createNewFilledApplication,
    deleteFilledApplication,
} from "../services/filledApplicationService";

async function getFilledApplicationInfo(req, res, next) {
    try {
        const fetchedData = await fetchFilledApplicationInfo(req.params.id);
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching application info`, err.message);
        next(err)
    }
}

async function getFilledApplications(req, res, next) {
    try {
        const fetchedData = await fetchFilledApplications();
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching applications`, err.message);
        next(err)
    }
}

async function getFilledClubApplications(req, res, next) {
    try {
        const fetchedData = await fetchFilledClubApplications(req.params.id);
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching club applications`, err.message);
        next(err);
    }
}

async function getFilledExecutiveApplications(req, res, next) {
    try {
        const fetchedData = await fetchFilledExecutiveApplications(req.params.id);
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching club applications`, err.message);
        next(err);
    }
}

async function getFilledMemberApplications(req, res, next) {
    try {
        const fetchedData = await fetchFilledMemberApplications(req.params.id);
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching club applications`, err.message);
        next(err);
    }
}

async function createFilledApplication(req, res, next) {
    try {
        const newFilledApplicationId = await createNewFilledApplication(
            req.body.clubId,
            req.body.userId,
            req.body.applicationId,
            req.body.type,
            req.body.appText,
            req.body.name,
        );
        res.send(newFilledApplicationId);
    } catch (err) {
        console.error(`Error creating filled application`, err.message);
        next(err);
    }
}

async function deleteExistingFilledApplication(req, res, next) {
    try {
        await deleteFilledApplication(req.params.id);
        res.send({ message: "Application Deleted"});
    } catch (err) {
        console.error(`Error deleting application`, err.message);
        next(err);
    }
}

const filledApplicationController = {
    getFilledApplicationInfo,
    getFilledApplications,
    getFilledClubApplications,
    getFilledExecutiveApplications,
    getFilledMemberApplications,
    createFilledApplication,
    deleteExistingFilledApplication,
};

export default filledApplicationController;