const db = require("./../../models/index");

const deleteTrip = async (req, res) => {
    const { tripId } = req.params;
    
    try {
        const deletedTrip = await db.trip.destroy({
            where: {
                tripId
            }
        });

        if (!deletedTrip) {
            return res.status(404).json({
                error: `Trip with ID ${tripId} not found in the database`
            });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting trip:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

module.exports = deleteTrip;
