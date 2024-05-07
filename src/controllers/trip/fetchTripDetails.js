const { trip } = require("./../../models/index");

const ERROR_MESSAGES = {
    TRIP_NOT_FOUND: "Trip not found",
    INTERNAL_SERVER_ERROR: "Internal server error"
};

const fetchTripDetails = async (req, res) => {
    const { tripId } = req.params;

    if (!tripId || isNaN(Number(tripId))) {
        return res.status(400).json({ message: "Invalid tripId" });
    }

    try {
        const tripDetailsData = await trip.findOne({
            where: { tripId },
            attributes: { exclude: ["driverId", "updatedAt"] }
        });
     
        if (!tripDetailsData) {
            console.log(`Trip with ${tripId} does not exist in the database`);
            return res.status(404).json({ message: ERROR_MESSAGES.TRIP_NOT_FOUND });
        }

        res.status(200).json({ data: tripDetailsData });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

module.exports = fetchTripDetails;
