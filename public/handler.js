const socket = io('http://localhost:3000')
const msg_form = document.getElementById('send_cont')
const msg_input = document.getElementById('msg_input')
const room_array = document.getElementById('room-container')
const msg_container = document.getElementById('msg_container')


if (msg_form != null) {
  const name = prompt('You are entering a public room. Enter the name you want to be identified by.',"Anonymous")
  appendMessage('<center><by>You</by> joined</center>')
  socket.emit('new-user', room, name)

  msg_form.addEventListener('submit', e => {
    e.preventDefault()
    const message = msg_input.value
    appendMessage(`<by>You</by><br>${msg}`)
    socket.emit('send-chat-message', room, message)
    msg_input.value = ''
  })
}

socket.on('room-created', room => {
  const new_room = document.createElement('div')
  new_room.innerText = room
  const link_to_room = document.createElement('a')
  link_to_room.href = `/${room}`
  link_to_room.innerText = 'join'
  room_array.append(new_room)
  room_array.append(link_to_room)
})

socket.on('chat-message', data => {
  appendMessage(`<by>${data.name}</by><br>${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`<center><by>${name}</by> connected</center>`)
})

socket.on('user-disconnected', name => {
  appendMessage(`<center><by>${name}</by> disconnected</center>`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerHTML = message
  msg_container.append(messageElement)
}