import express from 'express'
import faker from 'faker';
faker.locale = 'es'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import ContenedorSQL from './contenedores/ContenedorSQL.js'
import ContenedorArchivo from './contenedores/ContenedorArchivo.js'

import config from './config.js'

//--------------------------------------------
// instancio servidor, socket, api y faker

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}/mensajes.json`)
console.log (mensajesApi);

function crearProductosAlAlzar() {
    return {
        title: faker.vehicle.vehicle(),
        price: faker.datatype.number(),
        thumbnail: faker.image.avatar()
    }
}
const objs = [];
        for (let i = 0; i < 5; i++) {
            objs.push(crearProductosAlAlzar());
        }
//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES



// Definimos un esquema de autor


// Definimos un esquema de mensaje


// Definimos un esquema de posts




//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos 
    io.sockets.emit('productos', objs);

    // actualizacion de productos
    /*
    socket.on('new-product', producto => {
    productosApi.guardar(producto);
    const productos = productosApi.listarAll();
    io.sockets.emit('productos', productos);
    console.log(productos);
    });*/

    // carga inicial de mensajes
    const mensajes = await mensajesApi.listarAll();
    io.sockets.emit('mensajes', mensajes);

    // actualizacion de mensajes
    /*
    socket.on('new-message', async mensaje => {
        await mensajesApi.guardar(mensaje);
        const mensajes = await mensajesApi.listarAll();
        console.log(mensajes);
        //Este evento envía un nuevo mensaje a todos los clientes que estén conectado en ese momento
        io.sockets.emit('mensajes', mensajes);
    });*/
});

async function listarMensajesNormalizados() {
    
}

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------

app.get('/api/productos-test', (req, res) => {
    
})

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
