const handleError = async (res,error) => {
    console.log(error.message);
    return res.status(500).json({message:error.message});
}

module.exports  = handleError;
