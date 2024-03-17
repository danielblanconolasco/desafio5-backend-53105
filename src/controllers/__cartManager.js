import fs from 'fs/promises'

class CartManager {
    static cid = 1
    static path = './src/models/cart.json'
    constructor(pid, quantity){
        this.productId = pid,
        this.quantity = quantity
    }

    async getCarts() {
        try {
            await fs.access(CartManager.path)
            const carts = await fs.readFile(CartManager.path)
            return JSON.parse(carts)
        } catch (error) {
            await fs.writeFile(CartManager.path,'[]', 'utf-8')
            return []
        }
    }

    async getCartByCid(cid) {
        try {
            const data = await fs.readFile(CartManager.path)
            const carts = JSON.parse(data)
            const cart = carts.find(cart => cart.cid == cid)
            if (cart) {
                return cart
            } else {
                res.send(`Cart ID ${cid} not found`)
            }
        } catch (error) {
            res.send(`There was an error getting the cart by ID ${cid}`, error)
        }
    }

    async addCart(cid, pid, quantity) {
        try {
            const data = await fs.readFile(CartManager.path)
            let carts = JSON.parse(data)

            const cartIndex = carts.findIndex(cart => cart.cid == cid)

            if (cartIndex !== -1) {
                // Cart already exists, check if the product is already in the cart
                const existingProductIndex = carts[cartIndex].products.findIndex(product => product.pid === pid)

                if (existingProductIndex !== -1) {
                    // If the product already exists, increase the quantity
                    carts[cartIndex].products[existingProductIndex].quantity += quantity
                } else {
                    // If the product doesn't exist, add a new product
                    carts[cartIndex].products.push({ pid, quantity })
                }
            } else {
                // Cart doesn't exist, create a new cart
                const newCart = {
                    cid,
                    products: [{ pid, quantity }],
                }

                carts.push(newCart)
            }

            await fs.writeFile(CartManager.path, JSON.stringify(carts,null,2))
            return carts
        } catch (error) {
            res.status(500).send(`There was an error adding the cart`, error)
        }
    }

    async deleteCart(cid) {
        try {
            const data = await fs.readFile(CartManager.path)
            let carts = JSON.parse(data)
    
            const cartIndex = carts.findIndex(cart => cart.cid === cid)
            
            // Adding if else statement for the route to properly handle the response
            if (cartIndex !== -1) {
                const newCarts = carts.filter(cart => cart.cid !== cid)
                await fs.writeFile(CartManager.path, JSON.stringify(newCarts, null, 2))
                return newCarts
            } else {
                res.status(404).send(`Cart ID ${cid} not found`)
            }
        } catch (error) {
            res.status(500).send(`There was an error deleting the cart ID ${cid}`, error)
        }
    }
    
}

export default CartManager
