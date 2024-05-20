const getTripDetails = require("../services/trips/getTripDetails");
const handleCreateTrip = require("../services/trips/handleCreateTrip");
const { getTripsAvailableSearch, getAllTrips, getAllTripsCreatedByDriver, handleDeleteTrip } = require("../services/trips/trips.service");
const { TRIP_CREATED } = require("../utils/error.message");
const handleError = require("../utils/handleError");


// TODO:verify input incomning
// Create new Trip OK
const createTrip = async(req,res,next) => {


    const { stops } = req.body;
    console.log("Stops");
    console.log(stops);
    console.log("Body");
    console.log(req.body);

    try {
        await handleCreateTrip(req);
        res.status(201).json({
            message:TRIP_CREATED
        }); 
    } catch (error) {
        handleError(res,error);
    }
}


// search all trips OK
const searchTrips = async (req, res,next) => {
    const { page } = req.query;
    const size = 6; // number of rows to send to client 
    
    try {
        // Chercher le nombre de places disponibles pour chaque voyage (si nécessaire)
        const tripsAvailable = getTripsAvailableSearch(page,size,req?.body);
        res.status(200).send(tripsAvailable);
    } catch (error) {
        next(error);
    }
};


// pagination de trip
// fetch all trip those are availble
const fetchAllTrips = async(req ,res,next)=> {

    const { page } = req.query;
    const size  = 6;
    try{
        const allTrips =await getAllTrips(page,size);
        res.status(200).send(allTrips);
    } catch (e) {
        console.log("Error",e);
        next(error);
    }
}

// Trips created by user 
const fetchAllTripDriver = async(req,res)=>{
    const { userId } = req.body;

    try {
        const tripsCreatedByDriver  = await getAllTripsCreatedByDriver(userId); 
        res.status(200).send(tripsCreatedByDriver);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// get trips Details
const fetchTripDetails = async(req,res,next)=>{
    const { tripId } = req.params;
    
    try {
        const tripDetails  = await getTripDetails(tripId);
        res.status(200).send(tripDetails);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// delete one trip
const deleteTrip  = async(req,res,next) =>{
    try {
        await handleDeleteTrip(req?.params?.tripId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { 
    createTrip,
    searchTrips,
    fetchAllTrips,
    fetchAllTripDriver,
    fetchTripDetails,
    deleteTrip,
}