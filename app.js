// const connectDB = require('./db/connect')
const Express = require('express')
const app = Express()
require('dotenv').config()
require('express-async-errors')

//middlewares
const notfoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const AuthenticateUser = require('./middleware/authentication')

// security packages 
const xss = require('xss-clean')   //cross side scripting
const helmet = require('helmet')
const cors = require('cors')  // used to give access to API to be accessible using diff domain
const rateLimiter = require('express-rate-limit')


// main routes 
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')


const port = process.env.PORT || 3000

//connect DB
const connectDB = require('./db/connect')

//middleware to collect json data from the user(used for json to get parsed)
app.use(Express.json())

// default route for tasks 
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs/',AuthenticateUser,jobsRouter)

app.use(notfoundMiddleware)
app.use(errorHandlerMiddleware)

// security packages (.use())
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }))
app.use(helmet())
app.use(cors())
app.use(xss())

const start = async()=>{
    try {
        // console.log(process.env.MONGO_URI)
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()