import {
    fetchApplications,
    fetchApplicationInfo,
    fetchClubApplication,
    fetchLatestClubApplication,
    createApplication,
    deleteApplication,
} from "../services/applicationService"

async function getApplications(req, res, next) {
    try {
        const fetchedData = await fetchApplications()
        res.json(fetchedData)
    } catch (err) {
        console.error(`Error fetching applications`, err.message);
        next(err);
    }
}

async function getApplicationInfo(req, res, next) {
    try {
        const fetchedData = await fetchApplicationInfo(req.params.id);
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching application info`, err.message);
        next(err);
    }
}

async function getClubApplications(req, res, next) {
    try {
        const fetchedData = await fetchClubApplication(req.params.id)
        res.json(fetchedData)
    } catch (err) {
        console.error(`Error fetching club applications`, err.message);
        next(err);
    }
}

async function getLatestClubApplication(req, res, next) {
    try {
        const fetchedData = await fetchLatestClubApplication(req.params.id)
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching club applications`, err.message);
        next(err);
    }
}

async function createNewApplication(req, res, next) {
    try {
        const newApplicationId = await createApplication(
            req.body.clubId,
            req.body.userId,
            req.body.appText,
            req.body.applicationTime
        );
        res.send(newApplicationId)
    } catch (err) {
        console.error(`Error creating application`, err.message);
        next(err);
    }
}

async function deleteExistingApplication(req, res, next) {
    try {
        await deleteApplication(req.params.id);
        res.send({ message: "Application Deleted"});
    } catch (err) {
        console.error(`Error fetching applications`, err.message);
        next(err);
    }
}

const applicationController = {
    getApplications,
    getApplicationInfo,
    getClubApplications,
    getLatestClubApplication,
    createNewApplication,
    deleteExistingApplication,
};

export default applicationController;
