import {

    fetchEventInfo,
    createNewEvent,
    fetchClubEvents,
    deleteEvents
} from "../services/eventService";



async function getEventInfo(req, res, next) {
    try  {
        const fetchedData = await fetchEventInfo(req.params.id);
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching event info`, err.message);
        next(err);
    }
}



async function createEvent(req, res, next) {
    try {
        const newEventId = await createNewEvent(
            req.body.clubId,
            req.body.title,
            req.body.event_date,
            req.body.location,
            req.body.userId,
            req.body.eventText
        );
        res.send(newEventId);
    } catch (err) {
        console.error(`Error creating event`, err.message);
        next(err);
    }
}


async function getClubEvents(req, res, next) {
    try {
        const fetchedData = await fetchClubEvents(req.params.id)
        res.json(fetchedData);
    } catch (err) {
        console.error(`Error fetching announcements`, err.message);
        next(err);
    }
}



async function deleteExistingEvent(req, res, next) {
    try {
        await deleteEvents(req.params.id);
        res.send({ message: "Event Deleted"});
    } catch (err) {
        console.error(`Error deleting event`, err.message);
        next(err)
    }
}

const eventController = {
    deleteExistingEvent,
    getClubEvents,
    createEvent,
    getEventInfo
};

export default eventController;