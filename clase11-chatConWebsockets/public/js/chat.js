const socket = io();

const botonChat = document.getElementById('botonChat');
const parrafosMensajes = document.getElementById('parrafosMensajes');
const valInput = document.getElementById('chatBox');
let user;

swal.fire({
    title: "Identificacion del usuario",
    text: "Por favor ingresa un nombre de usuario",
    input: "text",
    inputValidator: (valor) => {
        return !valor && 'ingrese un usuario valido'
    }, allowOutside: false}).then(resultado =>{
        user = resultado.value;
        console.log(user)
    });

botonChat.addEventListener('click', () => {
    let fechaActual = new Date().tolocalString();
        if(valInput.value.trim().length > 0){
            socket.emit('mensaje', {fecha: fechaActual, user: user, mensaje: valInput.value});
            valInput.value = "";
        }
})
socket.on('mensaje', arrayMensajes => {
    parrafosMensajes.innerHTML = "";
    arrayMensajes.foreach(mensaje => {
        parrafosMensajes.innerHTML += `<p> ${mensaje.fecha}: ${mensaje.user} escribió ${mensaje.mensaje} </p>`;
    })
})