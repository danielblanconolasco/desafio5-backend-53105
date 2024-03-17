import "../models/product.model.js"
import ProductModel from "../models/product.model.js"

class ProductManager {

    async addProduct({ title, description, price, code, stock, category }) {
        try {
            if (!title || !description || !price || !code || !stock || !category) {
                console.log("All fields are required")
                return
            }

            const existingProduct = await ProductModel.findOne({ code: code })
            if (existingProduct) {
                console.log("Product code already exists")
                return
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                code,
                stock,
                category,
                status: true,
            })
            await newProduct.save()
        } catch (error) {
            console.log(`Error adding product`, error)
            throw error
        }
    }
    async getProducts() {
        try {
            const products = await ProductModel.find()
            return products
        } catch (error) {
            console.log("Error al recuperar los productos", error)
            throw error
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductModel.findById(id)
            if (!product) {
                console.log("Product not found")
                return
            }
            console.log(`Product found: ${product}`)
            return product
        } catch (error) {
            console.log(`Error getting product by id`, error)
            throw error
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(id, updatedProduct)

            if (!updateProduct) {
                console.log("Product not found")
                return null
            }

            console.log(`Product updated: ${updateProduct}`)
            return updateProduct


        } catch (error) {
            console.log(`Error updating product`, error)
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const product = await ProductModel.findByIdAndDelete(id)
            if (!product) {
                console.log("Product not found")
                return
            }
            console.log(`Product deleted: ${product}`)
            return product
        } catch (error) {
            console.log(`Error deleting product`, error)
            throw error
        }
    }
}

// Export of class ProductManager
export default ProductManager
