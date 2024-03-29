import {
    fetchAnnouncementInfo,
    createNewAnnouncement,
    fetchClubAnnouncements,
    deleteAnnouncement,

} from "../services/announcementService";

async function getAnnouncementInfo(req, res, next) {
    try  {
        const fetchedData = await fetchAnnouncementInfo(req.params.id);
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching announcement info`, err.message);
        next(err);
    }
}



async function createAnnouncement(req, res, next) {
    try {
        const newAnnouncementId = await createNewAnnouncement(
            req.body.clubId,
            req.body.userId,
            req.body.announcementTitle,
            req.body.announcementText
        );
        res.send(newAnnouncementId);
    } catch (err) {
        console.error(`Error creating announcement`, err.message);
        next(err);
    }
}



async function getClubAnnouncements(req, res, next) {
    try {
        const fetchedData = await fetchClubAnnouncements(req.params.id);
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching announcements`, err.message);
        next(err);
    }
}


async function deleteExistingAnnouncement(req, res, next) {
    try {
        await deleteAnnouncement(req.params.id);
        res.send({ message: "Announcement Deleted"});
    } catch (err) {
        console.error(`Error deleting announcement`, err.message);
        next(err);
    }
}


const announcementController = {
    getAnnouncementInfo,
    createAnnouncement,
    getClubAnnouncements,
    deleteExistingAnnouncement,

};

export default announcementController;