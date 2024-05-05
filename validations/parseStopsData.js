const { z } = require("zod");
const stopSchema = require("../lib/zod/schema/stopSchema");

const parseStopData = (data) => {
    const validationResult = stopSchema.safeParse(data);
    const { success, error } = validationResult;

    if (!success) {
        const formattedErrors = error.issues.map((e) => ({
            path: e.path[0],
            message: e.message
        }));
        
        return {
            success: false,
            error: formattedErrors,
            data: null
        };
    }

    return {
        success: true,
        error: null,
        data: validationResult.data
    };
};

module.exports = parseStopData;
