// const { CustomAPIError } = require("../errors")
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err,req,res,next)=>{
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong,please try later'
    }
    
    if (err.name === 'ValidationError'){
        // console.log(Object.values(err.errors));
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
        customError.statusCode = 400 
    }

    if (err.name === 'CastError'){
        customError.msg = `No object found with id: ${err.value}`
        customError.statusCode = 404
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400
      }
    // if(err instanceof CustomAPIError){
    //     return res.status(err.statusCode).json({msg:err.message})
    // }
    return res.status(customError.statusCode).json({msg:err.message})
}

module.exports = errorHandlerMiddleware