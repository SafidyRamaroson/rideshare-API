const db = require("../../models/index");

const searchTrips = async (req, res) => {
    const { departureProvince, destinationProvince, dateOfDeparture, returnDatetime } = req.body;

    // Validation des données d'entrée
    if (!departureProvince || !destinationProvince || !dateOfDeparture) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Calcul de la durée par rapport à l'heure actuelle (s'il est nécessaire)
        // TODO: Implementer le calcul de la durée par rapport à l'heure actuelle
        
        // Construire l'objet de requête en fonction des paramètres reçus
        const optionsObjectQuery = returnDatetime ? req.body : { departureProvince, destinationProvince, dateOfDeparture };

        // Requête pour rechercher les voyages en fonction des critères donnés
        const tripsListData = await db.trip.findAll({
            where: optionsObjectQuery,
            attributes: {
                exclude: ["driverId", "updatedAt"]
            }
        });

        // Chercher le nombre de places disponibles pour chaque voyage (si nécessaire)

        res.status(200).json({ data: tripsListData });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error?.message || "Internal Server Error" });
    }
};

module.exports = searchTrips;
