const loginSchema = require("./../lib/zod/schema/loginSchema");

const parseLoginData = (data) => {
    const validationResult = loginSchema.required().safeParse(data);

    const { success, error } = validationResult;
    

    if(!success){
        const formattedErrors = error.issues.map((e)=> ({
            path:e.path[0],
            error:e.message
        }));

        return {
            success:false,
            error:formattedErrors,
            data:null
        }
    }

    return {
        success:true,
        error:null,
        data:validationResult.data

    }

};


module.exports = parseLoginData;

module.exports = parseLoginData;
