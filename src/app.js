import express from 'express'
import multer from 'multer'
import __dirname from './utils.js'
import exphbs from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import ProductManager from './controllers/products-manager-db.js'
const productManager = new ProductManager
import "./database.js"
import ChatModel from './models/message.model.js'

const PORT = 8080
const app = express()

const router = express.Router()

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import chatRouter from './routes/chat.router.js'

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(`./src/public`))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
app.use(multer({ storage }).single("image"))


// Configuracion de handlebars
app.engine('handlebars', exphbs.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set(`view engine`, `handlebars`)
app.set(`views`, `./src/views`)


// Rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use(`/`, viewsRouter)
app.use('/chat', chatRouter)

// Listen:
const httpServer = app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + ' at http://localhost:' + PORT)
})

// Config Socket.io
const io = new Server(httpServer)

// Define mensajes array
const mensajes = []

// Connection successful
io.on("connection", async (socket) => {
    console.log("Client connected")

    // Array for connected client
    socket.emit("products", await productManager.getProducts())

    // Event for when a client erases a product
    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id)

        // Send the updated products to all clients
        io.sockets.emit("products", await productManager.getProducts())
    })

    // Add a product 
    socket.on("addProduct", async ({ title, description, price, img, code, stock, category }) => {
        await productManager.addProduct({ title, description, price, img, code, stock, category })
        io.sockets.emit("products", await productManager.getProducts())
    })


    // Escuchar el evento mensaje
    socket.on("message", async (data) => {
        
        //Guardo el mensaje en MongoDB: 
        await ChatModel.create(data)


        //Obtengo los mensajes de MongoDB y se los paso al cliente:
        const messages = await ChatModel.find();
        io.sockets.emit("message", messages)
        console.log(messages)
    })
})