class httpException extends Error {
    errorCode;
    
    constructor(errorCode,message){
        super(message); //Error.message is initialized by the son
        this.errorCode = errorCode;
    }

}

module.exports = httpException;