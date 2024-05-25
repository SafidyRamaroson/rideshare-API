const { faker } = require("@faker-js/faker");
const db = require("./../../models/index");
const { handleCreateTrip } = require("../../services/trips/trips.service");
const stopTypes = require("../../const/typeStop");


// Function to generate fake data for the Trip model
const  generateFakeTripData = () => {
    const trip = {
        departureProvince: faker.location.state(),
        departurePrecise: faker.location.streetAddress(),
        destinationProvince: faker.location.state(),
        destinationPrecise: faker.location.streetAddress(),
        departureTime: faker.date.anytime().toISOString().split('T')[1].split('.')[0], // HH:mm:ss format
        departureDate: faker.date.anytime().toISOString().split('T')[0], // YYYY-MM-DD format
        isComfort: faker.datatype.boolean(),
        seats: faker.number.int({ min: 1, max: 60 }),
        returnDate: faker.datatype.boolean() ? faker.date.anytime().toISOString().split('T')[0] : null, // 50% chance to have a return date
        returnTime: faker.datatype.boolean() ? faker.date.anytime().toISOString().split('T')[1].split('.')[0] : null, // 50% chance to have a return time
        refundable: faker.datatype.boolean(),
        oneWay: faker.datatype.boolean(),
        fixedPriceDeparture: faker.datatype.boolean(),
        fixedPriceReturn: faker.datatype.boolean(),
        departurePrice: faker.number.int({ min: 10, max: 500 }), // Random price between 10 and 500
        returnPrice: faker.number.int({ min: 10, max: 500 }), // Random price between 10 and 500
        phoneNumber: "+2319920117",
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
    };

    return trip;
}

const generateFakeStopData = (typeStop) => {

    const stop = {
        location: faker.location.streetAddress,
        price:faker.number.int({min:1000}),
        typeDepartureOrReturn:typeStop
    }

    return stop;
}

// Generate an array of fake trips
const generateTrips = (countTrip) => {
    const trips = [];
    for (let i = 0; i < countTrip; i++) {
        trips.push(generateFakeTripData());
    }
    return trips;
}

const generateStopDeparture = (countStopDep) => {
    const stopsDeparture = [];
    for (let i = 0; i < countStopDep; i++) {
        stopsDeparture.push((generateFakeStopData(stopTypes.departureType)));
    }

    return stopsDeparture;
}

const generateStopsReturn = (countStopReturn) => {
    const stopsReturn = [];
    for (let i = 0; i < countStopReturn; i++) {
        stopsReturn.push((generateFakeStopData(stopTypes.returnType)));
    }
    return stopsReturn;
}

const fakeTrips = generateTrips(10);
const stopsDeparture = generateStopDeparture();
const stopsReturn = generateStopsReturn();
console.log(JSON.stringify(fakeTrips, null, 2));
console.log(JSON.stringify(stopsDeparture, null, 2));
console.log(JSON.stringify(stopsReturn, null, 2));

module.exports  = generateRandomTrip;

