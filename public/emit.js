
const socket = io()

$(document).ready(() => {
  $('form').submit(() => {
    socket.emit('chat message', {"userName": $('#n').val(), "message": $('#m').val()})
    return false
  })
  socket.on('chat message', msg => {
    $('#messages').append($('<li>').text(msg))
  })
  socket.on('typing', data => {
    if (data) { addTypingAlert() }
  })
})

function addMessage (message) {
  var messages = document.getElementById('messages')
  var li = document.createElement('li')
  li.textContent = `${message.userName}: ${message.message}`
  messages.appendChild(li)
}

socket.on('chat log', (messages) => {
  messages.forEach(addMessage)
})

function addTypingAlert (message) {
  var update = document.querySelection('#updates')
  update.textContent = "someone is typing..."
}
