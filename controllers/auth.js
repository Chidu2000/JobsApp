const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors')
const bcrypt = require('bcrypt')  // it is a library used to encrypt the password(ex:hashed)
const jwt = require('jsonwebtoken')
const { findOne } = require('../models/User')

const register = async(req,res)=>{
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}

const login = async(req,res)=>{
    const {password,email} = req.body

    if(!password || !email){
        throw new BadRequestError('Please provide the required specifics.')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).send({user:{name:user.name},token})
}

module.exports = {
    register,login
}