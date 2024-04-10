const wrapAsyncHandler= require( "../utils/wrapAsyncHandler.js");
const ApiResponse =require( "../utils/ApiResponse");




const healthCheck = wrapAsyncHandler(async (req, res) => {
    //TODO: build a healthcheck response that simply returns the OK status as json with a message
    return res.status(200).json(new ApiResponse(200,OK,"Good day"))
})

module.exports= {
    healthCheck
    }
    