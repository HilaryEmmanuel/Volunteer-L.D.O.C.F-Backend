import http from 'http'
import app from './app'
import sequelize from './config/db.config'
import syncModels from './models'

const server = http.createServer(app)
const port = process.env.PORT || 1000
app.set('port', port)

//Check if port is already in use an if it is exit the process.
function onError(error: NodeJS.ErrnoException) {
    if(error.code ==='EADDRINUSE'){
        console.clear()
        console.error(` port ${port} is already in use please switch to another port🙏😌`)
        process.exit(1)
    }else{
        console.error('An error occurrred: ', error)
        process.exit(1)
    }
}


//Event Emmitter that listens to error Event
server.on('error', onError)

//Database connection
async function databaseConnection() {
    try {
        await sequelize.authenticate()
        await Promise.all(syncModels.map((model)=>{ model.sync()}))
        console.log('Database connection was established succesfully')
    } catch (err) {
        console.log('Connection was not established an error occured', err)
        process.exit(1)
    }
}


//Run the server
server.listen(port, (() => {
    console.clear()
    console.log(`Express API is running on port ${port} 💪😁....`)
    databaseConnection()
}))