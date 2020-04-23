const socket = io.connect('http://localhost:3000');

const chatWindow = document.querySelector('.window');

const form = document.querySelector('form');
const name = form.name;
const message = form.message;
const send = form.send;

form.addEventListener('input', e => {
    e.preventDefault()
})

form.addEventListener('submit', e => {
    e.preventDefault()

    send.classList.remove()
    send.classList.add()

    socket.emit('sendMessage', {
        name: name.value,
        message: message.value
    })

    message.value = ''
    message.focus()
})

socket.on('showMessage', message => {

    const reg = /^https?.+(jpg|jpeg|png)$/g;
    const newMessage = document.createElement('div');
    const user = document.createElement('h3');

    if (reg.test(message.message) == true) {
        const img = document.createElement('img');
        img.src = message.message;

        newMessage.classList.add('mes');
        user.classList.add('text');
        user.innerHTML = message.name;
        img.classList.add('img-size');

        newMessage.appendChild(user);
        newMessage.appendChild(img);
        chatWindow.appendChild(newMessage);

        send.classList.remove();
        send.classList.add();
    } else {
        const text = document.createElement('p');
        newMessage.classList.add('mes');
        user.classList.add('mes');
        user.innerHTML = message.name;
        text.classList.add('mes');
        text.innerHTML = message.message;

        newMessage.appendChild(user);
        newMessage.appendChild(text);
        chatWindow.appendChild(newMessage);

        send.classList.remove();
        send.classList.add();
    }
})