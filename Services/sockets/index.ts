import {On, send, sub} from "../events";
import env from "../env";
import allEvents from "./allEvents"
import * as userInteractions from "./user-interactions";

const iolib = require('socket.io')
let io: any

export async function init(httpServer: any) {
    io = iolib(httpServer, {
        cors: {
            origin: env.allowedOrigin,
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket: any) => {
        console.log('Client connected');
        newSocketConnection(socket)
    });
}


function newSocketConnection(socket: any) {
    let currentRoom: string = null

    socket.onAny((eventName: string, ...args: any) => {
        if (eventName == "mouse")
            return;

        console.log(eventName, args)
    });

    socket.on('connect', () => {
        console.log(`${socket.conn.remoteAddress} connected`);
    });

    socket.on('disconnect', () => {
        io.to(currentRoom).emit(allEvents.leave, {id: socket.id})
        console.log(`${socket.conn.remoteAddress} disconnected`);
    });
    
    sub(On.ERROR, (error : any)=>{
        io.broadcast.emit(allEvents.error, error)
    });

    userInteractions.applyEvents(socket,currentRoom)
}

