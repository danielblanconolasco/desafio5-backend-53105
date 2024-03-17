import express from 'express'
const router = express.Router()
import CartManager from "../controllers/cart-manager-db.js"
import CartModel from '../models/cart.model.js'

// Creating an instance of CartManager
const cartManager = new CartManager()
const cartModel = new CartModel() 

//Route to get carts
router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.status(200).json(carts)
    } catch (error) {
        console.log('Error getting carts', error)
        res.status(500).send('Error getting carts')
    }
})

// Route to create a new cart
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json(newCart)
    } catch (error) {
        console.log('Error creating the cart', error)
        res.status(500).send('Error creating the cart')
    }
})

// Route to get a specific cart by its ID (cid)
router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    try {
        const cart = await cartManager.getCartById(cid)
        if (cart) {
            res.status(200).json(cart.products)
        } else {
            res.status(404).send(`Cart ID ${cid} not found`)
        }
    } catch (error) {
        console.log(`Error getting the cart by ID ${cid}`, error)
        res.status(500).send(`Error getting the cart by ID ${cid}`)
    }
})

// Route to add a product to a specific cart
router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity || 1

    try {
        const updatedCart = await cartManager.addProductToCart(cid, pid, quantity)
        res.json(updatedCart.products)
    } catch (error) {
        console.log(`Error adding product to cart`, error)
        res.status(500).send(`Error adding the cart`)
    }
})

// Route to delete a cart by its ID (cid)
router.delete('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    try {
        await cartManager.deleteCart(cid)
        res.status(200).send(`Cart ID ${cid} deleted`)
    } catch (error) {
        console.log(`Error deleting the cart ID ${cid}`, error)
        res.status(500).send(`Error deleting the cart ID ${cid}`)
    }
})

export default router
