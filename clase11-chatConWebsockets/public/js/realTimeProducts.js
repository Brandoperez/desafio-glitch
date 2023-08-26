const socket = io()

const form = document.getElementById('formProduct');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const datForm = new FormData(e.target)
    const prod = Object.fromEntries(datForm)
        socket.emit('nuevoProducto', prod);
        socket.on('mensajeProductoCreado', (mensaje) => {
            swal.fire(mensaje)
        })
        e.target.reset();
})