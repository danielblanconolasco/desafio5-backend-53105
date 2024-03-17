// Nos conectamos con MongoAtlas
import mongoose from 'mongoose'
mongoose.connect(`mongodb+srv://danielblanco:coderhouse@cluster0.1fhc2uu.mongodb.net/ecommerce?retryWrites=true&w=majority`)
.then(()=> console.log("Conexión exitosa a MongoDB Atlas"))
.catch(() => console.log("Error de conexión a MongoDB Atlas"))