const storage = require('node-persist');
const express = require('express')
const app = express()
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer,{
    
});

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path')
//var router = express.Router();
//you must first call storage.init
storage.init( /* options ... */);

const PORT = 9001

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use('/', express.static(path.join(__dirname, 'front/build')));

app.get('/api/:id', function (req, res) {
    storage.getItem(req.params.id).then(data => {
        return res.send(data);
    }, err => {
        return res.send(err);
    })
})

app.post('/api/:id', function (req, res) {
    console.log(`storing ${req.body} into ${req.params.id}`)
    storage.setItem(req.params.id, req.body).then(data => {
        return res.send(data);
    }, err => {
        return res.send(err);
    })
})

//websocket

io.on('connection', socket => {
    console.log('Client connected');

    socket.on('connect', () => {
        console.log(`${socket.conn.remoteAddress} connected`);
    });
    socket.emit("hello", socket.id);
    socket.on("event", (data)=>{
        console.log(data)
    });

    socket.on('disconnect', () => {
        console.log(`${socket.conn.remoteAddress} disconnected`);
    });
});


httpServer.listen(PORT, () => {
    console.log('Listening on ' + PORT)
});