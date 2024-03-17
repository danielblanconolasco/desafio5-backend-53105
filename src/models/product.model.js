// Importar Mongoose
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    thumbnails: {
        type: String
    }, 
    code: {
        type:String, 
        unique: true, 
        required: true
    },
    stock: {
        type: Number, 
        required: true
    },
    status: {
        type: Boolean, 
        required: true
    },
    thumbnails: {
        type: [String]
    }
});


// Modelo de producto
const ProductModel = mongoose.model("products", productSchema);

export default ProductModel