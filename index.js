const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(express.static(__dirname + '/assets'))

io.on('connection', (socket)=>{
    socket.on('new user', (username)=>{
        socket.username = username;
        io.emit('chat message',{
            name: 'Admin',
            message: `${username} joined`
        })
    })

    socket.on('chat message', (data)=>{
        io.emit('chat message', {
            message: data.message,
            name: data.name
        })
    })

    socket.on('disconnect', ()=>{
        if (socket.username){
            io.emit('chat message',{
                name: 'Admin',
                message: `${socket.username} has left`
            })
        }
        
    })
    
})

http.listen(3000, () =>{
    console.log('Server started')
})