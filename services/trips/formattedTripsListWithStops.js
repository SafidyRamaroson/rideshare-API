const getAssociatedStopOfTripId = require("../stopsTrips/getAssociateStopOfTripId")
const getFormattedTripWithStopData = require("./utils/getFormattedTripWithStopData")


const getFormattedTripsListWithStops = async(tripsListData) => {
    const formattedTripsListWithStops = []
    if(!Array.isArray(tripsListData)){
        throw new Error("Not Trip availbale")
    }

    for(const tripData of tripsListData){
      const  currentTripId = tripData?.tripId
      const stopsAssociatedWithTripId = getAssociatedStopOfTripId(currentTripId)

      const tripWithStop = {
        tripData,
        Stops:stopsAssociatedWithTripId ?? []
      }

    formattedTripsListWithStops.push(await getFormattedTripWithStopData(tripWithStop))

    }

    return formattedTripsListWithStops
}


module.exports = getFormattedTripsListWithStops