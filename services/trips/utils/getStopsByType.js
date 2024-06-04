
const getStopsByType = (stops,type) => {

    const stopsByType = []

    if (!Array.isArray(stops)) {
        return stopsByType
    }

    for(const stop of stops){
        if(stop.dataValues.typeDepartureOrReturn === type){
            stopsByType.push({
                location:stop.location,
                price:stop.price,
                stopId:stop.stopId,
            })
        }
    }
    return stopsByType
}

module.exports = getStopsByType