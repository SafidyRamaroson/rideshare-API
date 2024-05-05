const { trip } = require("./../../models/index");

const ERROR_MESSAGES = {
    TRIP_NOT_FOUND: "Trip not found",
    INTERNAL_SERVER_ERROR: "Internal server error"
};

const fetchTripDetails = async (req, res) => {
    const { TripID } = req.params;

    if (!TripID || isNaN(Number(TripID))) {
        return res.status(400).json({ message: "Invalid TripID" });
    }

    try {
        const tripDetailsData = await trip.findOne({
            where: { TripID },
            attributes: { exclude: ["DriverID", "updatedAt"] }
        });
     
        if (!tripDetailsData) {
            console.log(`Trip with ${TripID} does not exist in the database`);
            return res.status(404).json({ message: ERROR_MESSAGES.TRIP_NOT_FOUND });
        }

        res.status(200).json({ data: tripDetailsData });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

module.exports = fetchTripDetails;
