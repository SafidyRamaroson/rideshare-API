const db = require('./../../models/index');

const updateTrip = async (req, res) => {
    const { tripId } = req.params;
    const { ...newValues } = req.body;

    try {
        const [updatedRowsCount] = await db.trip.update(newValues, {
            where: { tripId }
        });

        if (updatedRowsCount > 0) {
            console.log(`Trip with id ${tripId} updated successfully.`);
            return res.status(200).json({
                success: true,
                message: `Trip with id ${tripId} updated successfully.`
            });
        } else {
            console.log(`Trip with id ${tripId} not found.`);
            return res.status(404).json({
                success: false,
                message: `Trip with id ${tripId} not found.`
            });
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = updateTrip;
