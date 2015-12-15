var typing = false
var timeout = undefined
const socket = io()

function typingAlert() {
  console.log("aaa is typing");
}

function timeoutFunction () {
  typing = false
  socket.emit('typing', false)
}

function timeoutTyping () {
  setTimeout(function() {
    if (document.querySelector('#updates').length > 0) {
      $('#updates').remove()}}, 5000)
}

function typingAlert () {
  $('<span>...XYZ is typing...</span>')
    .appendTo('#updates')
    timeoutTyping()
    // .doTimeout( 5000, 'remove' );

  // var messages = document.getElementById('updates')
  // var li = document.createElement('li')
  // li.textContent = "...someone is typing..."
  // messages.appendChild(li)
}

var timeout

document.querySelector('#m')
  .addEventListener('keydown', keyDownHandler)
function keyDownHandler (e) {
  console.log("detected typing")
  if (e.keyCode !== 13) {
    typing = true
    socket.emit('typing', true)
    typingAlert()
    timeout = setTimeout(timeoutFunction, 5000)
  } else {
    clearTimeout(timeout)
    timeout = setTimeout(timeoutFunction, 5000)
  }}



















// onKeyDownNotEnter()

//
// function timeoutFunction () {
//   typing = false
//   socket.emit('typing', false)
// }
//
// $("#m").keypress(e => {
//   if (e.which !== 13) {
//     if (typing === false && $('#m').is(':focus')) {
//       typing = true
//       socket.emit('typing', true)
//     } else {
//       clearTimeout(timeout)
//       timeout = setTimeout(timeoutFunction, 5000)
//     }
//   }
// })
//
// socket.on('isTyping', data => {
//   if (data.isTyping) {
//     if ($("#" + data.userName.split('').join('-') +'').length === 0) {
//       $('#updates').append('<li>someone is typing</li>')
//       timeout = setTimeout(timeoutFunction, 5000);
//     }
//   } else {
//     $("#"+data.userName+"").remove();
//   }
// });
//
// socket.on("chat message", function(person, msg) {
//   $("#m").append("<li><strong><span class='text-success'>" + person.userName + "</span></strong>: " + msg + "</li>")
//   //clear typing field
//    $("#"+person.userName+"").remove();
//    clearTimeout(timeout);
//    timeout = setTimeout(timeoutFunction, 0);
// });
