const {BadRequestError,NotFoundError} = require('../errors')
const Jobs = require('../models/jobs')
const {StatusCodes} = require('http-status-codes')


const getAllJobs = async(req,res)=>{
    const jobs = await Jobs.find({createdBy:req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs,count:jobs.length })
}

const getJob = async(req,res)=>{
    const {
        user: { userID },
        params: { id: JobID },
      } = req
    
      const job = await Jobs.findOne({
        _id: JobID,
        createdBy: userID,
      })
      if (!job) {
        throw new NotFoundError(`No job with id ${JobID}`)
      }
      res.status(StatusCodes.OK).json({ job })
}

const createJob = async(req,res)=>{
    req.body.createdBy = req.user.userID
    const Job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({Job})
}

const updateJob = async(req,res)=>{
    const {
        body: { company, position },
        user: { userID },
        params: { id: jobID },
      } = req

      if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
      }

    const job = await Jobs.findByIdAndUpdate(
        { _id: jobID, createdBy: userID },
        req.body,
        { new: true, runValidators: true }
      )

      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
      }  
    res.status(StatusCodes.OK).json({ job })  
}

const deleteJob = async(req,res)=>{
    const {
        user: { userID },
        params: { id: jobID },
      } = req
    
      const job = await Jobs.findByIdAndRemove({
        _id: jobID,
        createdBy: userID,
      })
      if (!job) {
        throw new NotFoundError(`No job with id ${jobID}`)
      }
      res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}