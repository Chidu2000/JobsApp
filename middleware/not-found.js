const notfoundMiddleware = (req,res)=>{ res.status(404).send(`Path doesn't exist`)}

module.exports = notfoundMiddleware