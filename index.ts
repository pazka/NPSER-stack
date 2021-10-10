
import * as express from 'express'
const app = express()
import * as http from 'http'
const httpServer = http.createServer(app);

import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as path from 'path'

import routes from './Services/api'
import * as sockets from './Services/sockets'
import env from "./Services/env"

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(env.allowedOrigin.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.options('*', cors())
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

// @ts-ignore
app.use('/', express.static(path.join(__dirname, 'front/build/')));

app.use('/api',routes)
//websocket

Promise.all([
    sockets.init(httpServer)
]).then(()=>{
    httpServer.listen(env.PORT, () => {
        console.log('Listening on ' + env.PORT)
    });
})

