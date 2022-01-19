const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const server = require('http').createServer(app)
const cors = require('cors')
app.use(cors())

require("dotenv").config({path: "./config.env"})
const port = process.env.PORT || 5000

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

// Body Parser Middleware
app.use(bodyParser.json())

// Database Connection
const driver = require("./db/connect")

app.get('/room', (req, res) => {
    res.send("Server is UP")
})

io.on('connection', (socket) => {
    socket.emit('me', socket.id)

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded')
    })

    socket.on('callUser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('callUser', {
            signal: signalData,
            from,
            name
        })
    })

    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal)
    })
})

server.listen(port, () => {
    driver.connectToServer(function(err){
        if (err) console.error(err);
    })

    console.log(`Server running @${port}`);
})