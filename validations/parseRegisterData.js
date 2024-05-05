const newUserSchema = require("./../lib/zod/schema/newUserSchema");

const parseRegisterData = (data)=>{

    const validationResult = newUserSchema.required().safeParse(data);
    const { error,success } = validationResult;

    if(!success){
        const formattedErrors = error.issue.map((e)=> ({
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
}

module.exports = parseRegisterData;