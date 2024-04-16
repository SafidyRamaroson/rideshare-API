const { FLOAT } = require("sequelize");
const db = require("./../../models/index");
const checkValidityProvince = require("./../../utils/trips/checkValidityProvince");
const isEmpty = require("./../../utils/common/isEmpty");
const typeOf = require("./../../utils/common/typeOf");
const validateEmail = require("./../../utils/common/validateEmail");
// we limit the covoit inside of Madagascar but feature 
// we consider the entiry world 

// controller that handle the incomming request and response to the client
const createNewTrip = async(req,res) => {
    const { 
        departureProvince,
        departurePrecise,
        destinationProvince,
        destinationPrecise,
        stops,
        setsOffered,
        pricePerSeat,
        additionalNotes,
        returnDatetime,
        refundable,
        oneWay,
        email
    } = req.body;

    // check if departureProvince and destination province are all valid
    const departureProvinceValidated = checkValidityProvince(departureProvince);
    const destinationProvinceValidated = checkValidityProvince(destinationProvince);

    if(!departureProvinceValidated || !destinationProvinceValidated){
        console.log("Province invalid");
        return res.status(422).json({
            message:"Province invalid"
        });
    }

    // check if oneWay is a boolean 
    if(typeOf(Boolean(oneWay)) !== "boolean" || typeOf(Boolean(refundable)) !== "boolean"){
        console.log("OneWay or refundable must be a boolean");
        return res.status(422).json({
            message:"One way or refundable must be a boolean"
        });
    }

    // departure precise or destination precise don't be an empty string
    if(isEmpty(departurePrecise ?? "") || isEmpty(destinationPrecise ?? "")){
        console.log("Departure or destination cannot be an empty string");
        return res.status(422).json({
            message:"Departure or destination precise cannot be an empty string"
        });
    }
    
    // check if stop is an object null is  or setOffered is null object
    if (stops || Array.isArray(stops)) {
        console.log(Array.isArray(stops));
        return res.status(422).json({ message: "Invalid syntax of stop" });
    }
    
    if(isEmpty(additionalNotes ?? "")){
        console.log("AdditionalNotes cannot be an empty string");
        return res
        .status(422)
        .json({
            message:"AdditionalNotes cannot be an empty string"
        });
    }
    
    if(oneWay){
        if(isEmpty(returnDatetime)){
            console.log("Return Datetime is required if oneWay is true")
            return res.status(422).json({
                message:"Return Datetime is required if oneWay is true"
            });
        }
    }

// validate email input
    if(!validateEmail(email)){
        console.log("Email invalid");
        return res.status(422).json({message:"Email invalid"});
    }

    // retrieve the DriverID by email 
    try {
        const foundUser = await db.user.findOne({where:{email}});
        if(foundUser === null){
            console.log("User not found");
            return res.status(404).json({message:"User not found"});
        }

        const DriverID = foundUser.UserID;
        
        const newTrip = await db.trip.create({
            departureProvince,
            departurePrecise,
            destinationProvince,
            destinationPrecise,
            stops:JSON.stringify(stops),
            setsOffered:JSON.stringify(setsOffered),
            pricePerSeat,
            additionalNotes,
            returnDatetime,
            DriverID,
            refundable,
            oneWay,
            createdAt:new Date(),
        });

        res.status(201).json({
            message:"New trip created successfully"
        });
        
    } catch (error) {
        console.error("Error:"+error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


module.exports = createNewTrip;