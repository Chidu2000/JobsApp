
const Task = require('../models/Task')
const tasks = require('../routes/tasks')
const asyncWrapper = require('../middleware/asyncWrapper')
const {createCustomError} = require('../errors/custom-errors')

const getAlltasks = asyncWrapper(async (req,res) =>{
    // asyncWrapper middleware will handle the async functions
        const task = await Task.find({})
        res.status(200).json({task})
})

const createtasks = asyncWrapper(async (req,res) =>{
        const task = await Task.create(req.body)
        res.status(200).json({task})
})

const updatetasks = asyncWrapper(async (req,res) =>{

        const {id} = req.params
        // or const id = req.params.id
        const task = await Task.findOneAndUpdate({_id :id},req.body,{new:true,runValidators:true})
        if(!task){
            return next(createCustomError(`No task with id: ${_id}`,404))
        }
        res.status(200).json({task})
        // res.status(200).send()
    
})

const gettask = asyncWrapper(async (req,res) =>{
   
        const {id} = req.params
        // or const id = req.params.id
        const task = await Task.findOne({_id : id})
        if(!task){
            return next(createCustomError(`No task with id: ${_id}`,404))
        }
        res.status(200).json({task})

})

const deletetasks = asyncWrapper(async (req,res) =>{

        const {id} = req.params
        // or const id = req.params.id
        const task = await Task.findOneAndDelete({_id : id})
        if(!task){
            return next(createCustomError(`No task with id: ${_id}`,404))
        }
        res.status(200).json({task})
        // res.status(200).send()
    
})


module.exports={
    getAlltasks,
    createtasks,
    updatetasks,
    gettask,
    deletetasks
}