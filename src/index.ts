import http from 'http'
import app from './app'

const server = http.createServer(app)
const port = process.env.PORT || 5000

//Check if port is already in use an if it is exit the process.
function onError(error: any){
    switch(error.code){
        case 'EADDRINUSE':
          console.clear()
          console.error('port ' + port + ' is already in use please switch to another port🙏😌')
          process.exit(1)
    }
    }
    
    //Event Emmitter that listens to error Event
    server.on('error', onError)
    
    //Database connection
    async function databaseConnection(){
        try{
            //connection
            console.log('Database connection was established succesfully')
        }catch(err){
            console.log('Connection was not established an error occured', err)
       }
    }
    
    databaseConnection()
    
    
    //Run the server
    server.listen(port, (()=>{
        console.clear()
        console.log(`Express API is running on port ${port} 💪😁....`)
    })
     
    
    )