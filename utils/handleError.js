const handleError = async (res,error) => {
    return res.status(500).json({message:error.message});
}

module.exports  = handleError;



// module.exports = httpException;