const Express = require('express')
const { getAlltasks, createtasks,updatetasks,gettask,deletetasks } = require('../controllers/tasks')
const tasks = Express.Router()

tasks.route('/').get(getAlltasks).post(createtasks)
tasks.route('/:id').get(gettask).patch(updatetasks).delete(deletetasks)
module.exports = tasks