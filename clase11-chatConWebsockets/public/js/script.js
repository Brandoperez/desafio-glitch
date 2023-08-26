const socket = io();
    socket.emit('mensaje', "Hola servidor, Buenas noches");
    socket.on('respuesta', (info) => {
        if(info){
            socket.emit('juego', 'poker')
        }else{
            console.log("Error de conexion");
        }
    })