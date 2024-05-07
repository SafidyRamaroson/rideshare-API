const loginSchema = require("./loginSchema");
const newTripSchema = require("./newTripSchema");
const stopSchema = require("./stopSchema");
const newUserSchema = require("./newUserSchema");
const reservationSchema = require("./reservationSchema");


const zodSchema = Object.freeze({
    loginSchema,
    newUserSchema,
    newTripSchema,
    stopSchema,
    reservationSchema
});


module.exports = zodSchema;