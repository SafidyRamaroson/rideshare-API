const getSixRecentTrips = require("../services/trips/getSixRecentTrips");
const getTripDetails = require("../services/trips/getTripDetails");
const handleCreateTrip = require("../services/trips/handleCreateTrip");
const { getTripsAvailableSearch, getAllTrips, getAllTripsCreatedByDriver, handleDeleteTrip } = require("../services/trips/trips.service");
const { TRIP_CREATED } = require("../utils/error.message");
const getFormatDate = require("../utils/getFormatDate");
const handleError = require("../utils/handleError");


// TODO:verify input incomning
// Create new Trip OK
const createTrip = async(req,res) => {

    console.log(req.body);
    try {
        await handleCreateTrip(req);
        res.status(201).json({
            message:TRIP_CREATED
        });
        console.log(TRIP_CREATED);
    } catch (error) {
        handleError(res,error);
    }
}

// search all trips OK
const searchTrips = async(req, res,next) => {
    const { page } = req.params;
    console.log("page query");
    console.log(page);
    const size = 4; // number of rows to send to client 

    try {
        // Chercher le nombre de places disponibles pour chaque voyage (si nécessaire)
        const tripsAvailable = await getTripsAvailableSearch(page,size,req);
        // console.log("trips");
        // console.log(tripsAvailable);
        
        res.status(200).send(tripsAvailable);
    } catch (error) {
        handleError(res,error);
    }
};


// get six recents trips
const sixRecentTrips = async(req,res) => {
    try {
        const recentsTrips = await getSixRecentTrips();
        res.status(200).send(recentsTrips)
    } catch (error) {
        handleError(res,error)
    }
}


// pagination de trip
// fetch all trip those are availble
const fetchAllTrips = async(req ,res,next)=> {

    const { page } = req.query;
    const size  = 4;
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
const fetchTripDetails = async(req,res)=>{
    const { tripId } = req.params
    
    try {
        const tripDetails  = await getTripDetails(tripId)
        res.status(200).send(tripDetails)
    } catch (error) {
        handleError(res,error)
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
    sixRecentTrips,
}