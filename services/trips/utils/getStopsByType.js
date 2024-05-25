
const getStopsByType = (stops,type) => {

    const stopsByType = []
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