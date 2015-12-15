// Emit.js Before tweaking

const socket = io()
var userName = prompt("What is your name?")

$(document).ready(() => {
  $('form').submit(() => {
    socket.emit('chat message', {"userName": userName, "message": $('#m').val()})
    return false
  })
  socket.on('chat message', msg => {
    $('#messages').append($('<li>').text(msg))
    clearTimeout(timeout)
    timeout = setTimeout(timeoutFunction, 0)
  })
})

socket.on('chat log', (messages) => {
  messages.forEach(addMessage)
})

socket.on('isTyping', (isTyping) => {
  if (isTyping) {
    typingAlert()
  }
})

// Function for adding messages

function addMessage (message) {
  var messages = document.getElementById('messages')
  var li = document.createElement('li')
  li.textContent = `${message.userName}: ${message.message}`
  messages.appendChild(li)
}

// Adding typing notification
var timeout = undefined
var typing = false

function timeoutFunction () {
  typing = false
  socket.emit('typing', false)
}

document.querySelector('#m').addEventListener('keydown', keyDownHandler)
function keyDownHandler (e) {
  console.log('detected typing')
  if (e.keyCode !== 13 && e.keyCode !== 46 && $('input').val() === "") {
    typing = true
    socket.emit('typing', true)
  } else {
    clearTimeout(timeout)
    timeout = setTimeout(timeoutFunction, 5000)
  }
}

function removeTypingAlert () {
  setTimeout(function () {
    if ($('input').val() === '') {
      $('#yoyoyo').remove()
    } }, 500)
}

function typingAlert () {
  if ($("#updates ul").length === 0) {
    $('<ul id="yoyoyo"><i>someone is typing...</i></ul>')
    .appendTo('#updates')
    // io.emit("typing", true)
  }
  removeTypingAlert()
  clearTimeout(timeout)
  timeout = setTimeout(timeoutFunction, 0)
}



//  AFTER TWEAKING:

// const socket = io()
// var userName = prompt("What is your name?")
//
// $(document).ready(() => {
//   $('form').submit(() => {
//     socket.emit('chat message', {"userName": userName, "message": $('#m').val()})
//     return false
//   })
//   socket.on('chat message', msg => {
//     $('#messages').append($('<li>').text(msg))
//     clearTimeout(timeout)
//     timeout = setTimeout(timeoutFunction, 0)
//   })
// })
//
// socket.on('chat log', (messages) => {
//   messages.forEach(addMessage)
// })
//
// socket.on('isTyping', function (data) {
//   if (data.isTyping) {
//     console.log(data.is)
//   }
//   if (isTyping) {
//     typingAlert()
//   }
// })
//
// // Function for adding messages
//
// function addMessage (message) {
//   var messages = document.getElementById('messages')
//   var li = document.createElement('li')
//   li.textContent = `${message.userName}: ${message.message}`
//   messages.appendChild(li)
// }
//
// // Adding typing notification
// var timeout
// var typing
//
// function timeoutFunction () {
//   typing = false
//   socket.emit('typing', false)
// }
//
// document.querySelector('#m').addEventListener('keydown', keyDownHandler)
// function keyDownHandler (e) {
//   console.log('detected typing')
//   if (e.keyCode !== 13 && e.keyCode !== 46 && $('input').val() === "") {
//     typing = true
//     socket.emit('typing', {"data": true, "userName": userName})
//   } else {
//     clearTimeout(timeout)
//     timeout = setTimeout(timeoutFunction, 5000)
//   }
// }
//
// function removeTypingAlert () {
//   setTimeout(function () {
//     if ($('input').val() === '') {
//       $('#yoyoyo').remove()
//     } }, 500)
// }
//
// function typingAlert () {
//   if ($("#updates ul").length === 0) {
//     $('<ul id="yoyoyo"><i>someone is typing...</i></ul>')
//     .appendTo('#updates')
//     // io.emit("typing", true)
//   }
//   removeTypingAlert()
//   clearTimeout(timeout)
//   timeout = setTimeout(timeoutFunction, 0)
// }
