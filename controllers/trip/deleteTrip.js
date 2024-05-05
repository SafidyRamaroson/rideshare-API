const db = require("./../../models/index");

const deleteTrip = async (req, res) => {
    const { TripID } = req.params;
    
    try {
        const deletedTrip = await db.trip.destroy({
            where: {
                TripID
            }
        });

        if (!deletedTrip) {
            return res.status(404).json({
                error: `Trip with ID ${TripID} not found in the database`
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
