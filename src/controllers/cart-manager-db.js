import CartModel from "../models/cart.model.js"

class CartManager {

    async getCarts() {
        try {
            const carts = await CartModel.find()
            return carts

        } catch (error) {
            console.log("Error getting carts", error)
            throw error
        }
    }

    async createCart() {
        try {
            const newCart = new CartModel({ products: [] })
            await newCart.save()
            return newCart

        } catch (error) {
            console.log(`Error creating cart`, error)
            throw error
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId)

            if (!cart) {
                console.log(`Cart doesn't exist`)
                return null
            }
            return cart

        } catch (error) {
            console.log(`Error getting cart by Id`, error)
            throw error
        }
    }

    async addProductToCart (cartId, productId, quantity = 1){
        try {
            const cart = await this.getCartById(cartId)
            const existingProduct = cart.products.find(item => item.product.toString() === productId)
            
            if (existingProduct){
                existingProduct.quantity += quantity
            }
            else{
                cart.products.push({product: productId, quantity})
            }
            
            cart.markModified("products")

            await cart.save()
            return cart

        } catch (error) {
            console.log(`Error adding product to cart`, error)
            throw error
        }
    }

    async deleteCart(cartId) {
        try {
            const cart = await CartModel.findByIdAndDelete(cartId)

            if (!cart) {
                console.log(`Cart doesn't exist`)
                return
            }
            return cart

        } catch (error) {
            console.log(`Error deleting cart`, error)
            throw error
        }
    }
}

// Export of class CartManager
export default CartManager