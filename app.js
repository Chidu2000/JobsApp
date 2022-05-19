const connectDB = require('./db/connect')
const Express = require('express')
const app = Express()
const tasks = require('./routes/tasks')
const dotenv = require('dotenv')
dotenv.config();
const notfound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const port = process.env.PORT || 3000

//middleware to collect json data from the user
app.use(Express.json())
app.use(Express.static('./public'))

// default route for tasks 
app.use('/api/v1/tasks',tasks)

app.use(notfound)
app.use(errorHandlerMiddleware)

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()