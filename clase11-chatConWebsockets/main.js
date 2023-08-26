import  Express  from "express";
import multer from "multer";
import {engine} from "express-handlebars"
import { Server } from "socket.io";
import routerProd from './routes/products.routes.js';
import { __dirname } from "./path.js";
import path from "path";

const PORT = 4000;
const app = Express();
const server = app.listen(PORT, ()=>{
    console.log("Servidor arriba");

})

const io = new Server(server);

//CONFIG
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} ${file.originalname}`)
    }
})

//MIDDLEWARES
app.use(Express.json());
app.use(Express.urlencoded({ extended:true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

const upload = multer({storage:storage})
const mensajes = [];

//CONECTAR CON SOCKET.IO
io.on("connection", (socket) => {
    console.log("conexión establecida");

        socket.on('mensaje', info => {
            console.log(info);
            mensajes.push(info);
            io.emit('mensajes', mensajes)
        })

       /* socket.on('mensaje', info => {
            console.log(info);
            socket.emit('respuesta', true);
        })

        socket.on('juego', (infoJuego) => {
            if(infoJuego == "poker"){
                console.log("Conexión a poker");
            }else{
                console.log("Conexión a truco")
            }
        })

        socket.on('nuevoProducto', (prod) => {
            console.log(prod);
            socket.emit("mensajeProductoCreado", "El producto se creó correctamente");
        })*/
})

//ROUTES
app.use('/static', Express.static(path.join(__dirname, '/public')));
app.use('/api/product', routerProd);

//HANDLEBARS
app.get('/static', (req, res) => {

    const user = {
        nombre: "Lucia",
        cargo: "Tutor"
    }

    const cursos = [
        {numCurso: "123", dia: "LyM", horario: "Noche"},
        {numCurso: "456", dia: "MyJ", horario: "Tarde"},
        {numCurso: "789", dia: "S", horario: "Mañana"}
    ]
/*
        res.render('user', {
            titulo: "Users",
            usuario: user,
            rutaCSS: "user.css",
            isTutor: user.cargo = "Tutor",
            cursos: cursos
        }) 

        res.render('realTimeProducts', {
            rutaCSS: "realTimeProducts.css",
            rutaJS: "realTimePRoducts.js"
        })*/
        
        res.render('chat', {
            rutaJS: "chat.js",
            rutaCSS: "chat.css"
        })
})

app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.status(200).send("Imagen cargada");
})
    console.log(path.join(__dirname, '/public'));

