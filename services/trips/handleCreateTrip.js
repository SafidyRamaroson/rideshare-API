const { returnType, departureType } = require("../../const/typeStop");
const db = require("../../models/index");

const handleCreateTrip = async (req) => {
  const { oneWay, departureStops, returnStops } = req.body;
  const { userId } = req.params;
  const {
    departureProvince,
    departurePrecise,
    destinationProvince,
    destinationPrecise,
    departureDate,
    departureTime,
    isComfort,
    seats,
    departurePrice,
    fixedDeparturePrice,
    returnDate,
    returnTime,
    returnPrice,
    fixedReturnPrice,
    phoneNumber,
  } = req.body;

  const tripInfo = {
    departureProvince,
    departurePrecise,
    destinationProvince,
    destinationPrecise,
    departureDate,
    departureTime,
    isComfort,
    seats,
    departurePrice,
    fixedPriceDeparture: fixedDeparturePrice,
    returnDate,
    returnTime,
    returnPrice: returnPrice ?? 0,
    fixedPriceReturn: fixedReturnPrice,
    phoneNumber,
    oneWay,
  };

  const userExists = await db.user.findByPk(userId);
  if (!userExists) {
    throw new Error("Invalid driverId, user does not exist");
  }

  const tripDataWithDriverId = { driverId: userId, ...tripInfo };
  const tripCreated = await db.trip.create(tripDataWithDriverId);

  const tripId = tripCreated.dataValues.tripId;

  const departureStopsInfoWithTripId = departureStops
    .filter((departureStop) => departureStop.checked)
    .map((departureStop) => ({
      location: departureStop.location,
      price: departureStop.price,
      typeDepartureOrReturn: departureType,
      tripId: tripId,
    }));

  const returnStopsInfoWithTripId = returnStops
    ?.filter((returnStop) => returnStop.checked)
    .map((returnStop) => ({
      location: returnStop.location,
      price: returnStop.price,
      typeDepartureOrReturn: returnType,
      tripId: tripId,
    })) || [];

  await db.stop.bulkCreate(departureStopsInfoWithTripId)
  if (oneWay) {
    await db.stop.bulkCreate(returnStopsInfoWithTripId);
  }
};

module.exports = handleCreateTrip;
