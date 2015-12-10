const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(http)

// set up connection to Mongolab
const mongoose = require('mongoose')
const dbuser = 'user'
const dbpassword = 'password'
const dburl = 'mongodb://' + dbuser + ':' + dbpassword + '@ds031581.mongolab.com:31581/chats'
mongoose.connect(dburl)
const db = mongoose.connection

const Message = mongoose.model('Message', {
  "userName": String,
  "message": String
})

app.use(express.static('public'))

io.on('connection', socket => {
  Message.model('Message').find((err, messages) => {
    if (err) return console.error(err)
    socket.emit('chat log', messages)
  })
  socket.on('chat message', payload => {
    const chatLog = new Message(payload)
    console.log(chatLog);
    chatLog.save(err => {
      if (err) return console.error(err)
    })
    console.log(payload);
  })
  socket.on('chat message', msg => {
    io.emit('chat message', (msg.userName + ": " + msg.message));
  })
  socket.on("typing", msg => {
    io.emit('isTyping', console.log("someone is typing"))
  })
})

http.listen(port, () => {
  console.log(`listening on ${port}`)
})
