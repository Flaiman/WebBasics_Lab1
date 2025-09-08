const socket = io()
const messages = document.querySelector('.messages')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const nameBlock = document.querySelector('.name')

const username = prompt('Enter your name:')
nameBlock.innerHTML = `${username}`

socket.emit('new user', username)

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    if (input.value) {
        socket.emit('chat message', {
            message: input.value, 
            name: username
        })
        input.value=''
    }
})

socket.on('chat message', (data) =>{
    const item = document.createElement('li')
    item.innerHTML=`<span>${data.name}<span>: ${data.message}`
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})
