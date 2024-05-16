const { TRIP_UPDATE, TRIP_NOT_FOUND } = require('../../utils/error.message');
const httpException = require('../../utils/handleError');
const db = require('./../../models/index');


const updateTrip = async (req, res,next) => {
    const { tripId } = req.params;
    const { ...newValues } = req.body;

    try {
        const [updatedRowsCount] = await db.trip.update(newValues, {
            where: { tripId }
        });


        if (updatedRowsCount > 0) {
            console.log(`Trip with id ${tripId} updated successfully.`);
            return res.status(200).json({
                message: TRIP_UPDATE
            });
        } else {
            console.log(`Trip with id ${tripId} not found.`);
            return httpException(404,TRIP_NOT_FOUND);
        }
    } catch (error) {
        console.log("Error: ", error);
        next(error);
    }
};

module.exports = updateTrip;
