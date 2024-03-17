import fs from "fs/promises"

let products = []

class ProductManager {
    static id = 1
    static path = './src/models/products.json'
    static status = true

    constructor(title, description, price, thumbnails, code, stock, status) {
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnails = thumbnails,
        this.code = code,
        this.stock = stock
    }

    async addProduct(newProduct) {
        try {
            const existingProducts = await this.getProducts()

            // Determine the next id
            const lastProduct = existingProducts.reduce((prev, current) => (prev.id > current.id) ? prev : current, { id: 0 })
            const nextId = lastProduct.id + 1

            const existingProduct = existingProducts.find(product => product.code === newProduct.code)

            if (existingProduct) {
                console.log(`Product with the same code ${newProduct.code} already exists, please try again`)
                return 
            }
            
            else {
                const productToAdd = {
                    id: nextId,
                    title: newProduct.title,
                    description: newProduct.description,
                    price: newProduct.price,
                    thumbnails: newProduct.thumbnails,
                    code: newProduct.code,
                    stock: newProduct.stock,
                    status: ProductManager.status
                }

                existingProducts.push(productToAdd)
                await fs.writeFile(ProductManager.path, JSON.stringify(existingProducts, null, 2))
                console.log(`Product added successfully`)
                return productToAdd // Return the added product
            }
        } catch (error) {
            console.error(`Error adding product:`, error)
        }
    }

    async writeFile() {
        try {
            await fs.writeFile(ProductManager.path, JSON.stringify(products, null, 2))
            res.send(`File written successfully`)
            console.log(`File written successfully`)
        } catch (error) {
            res.send({ status: 500, message: `Error writing the file` })
            console.log(`File not written, please try again`, error)
        }
    }

    async getProducts() {
        try {
            await fs.access(ProductManager.path)
            const data = await fs.readFile(ProductManager.path)
            const products = JSON.parse(data)
            return products
        } catch (error) {
            await fs.writeFile(ProductManager.path, '[]', 'utf-8')
            return []
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(ProductManager.path)
            const products = JSON.parse(data)
            const product = products.find(product => product.id === id)
            if (product) {
                // Adding the return for app.js to work
                return product
            } else {
                console.log(`Product ID ${id} not found`)
            }
        } catch (error) {
            console.log(`There was an error getting the product by ID ${id}`, error)
        }

    }

    async updateProductById(id, newProduct) {
        try {
            const data = await fs.readFile(ProductManager.path)
            let products = JSON.parse(data)

            const productIndex = products.findIndex(product => Number(product.id) === Number(id))

            if (productIndex != -1) {
                // If the product is found, update it
                products[productIndex] = {
                    id,
                    title: newProduct.title,
                    description: newProduct.description,
                    price: newProduct.price,
                    thumbnails: newProduct.thumbnails,
                    code: newProduct.code,
                    stock: newProduct.stock,
                    status: true,
                }

                await fs.writeFile(ProductManager.path, JSON.stringify(products, null, 2))
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(`Error updating product with ID ${id}`, error)
        }
    }

    async deleteProductById(id) {
        try {
            const data = await fs.readFile(ProductManager.path)
            const products = JSON.parse(data)
            const product = products.find(product => product.id === id)
            const index = products.indexOf(product)
            if (index != -1) {
                products.splice(index, 1)
                await fs.writeFile(ProductManager.path, JSON.stringify(products, null, 2))
                console.log(`Product id ${id} erased successfully`)
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(`Product ID ${id} not found`, error)
            return false
        }
    }
}

////////////////////////////////////////
//TEST ZONE - KEEP IN MIND IT UPDATE THE JSON FILE TO ORGINAL VERSION EVERY TIME IT RUNS
////////////////////////////////////////


// Creation of 12 items
/*
await new ProductManager().addProduct({
    title: "Keyboard",
    description: "A nice mechanical keyboard",
    price: 120,
    thumbnails: "./assets/img/keyboard1.jpg",
    code: "keyboard-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Mouse",
    description: "A nice mouse",
    price: 90,
    thumbnails: "./assets/img/mouse1.jpg",
    code: "mouse-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Monitor",
    description: "A nice monitor",
    price: 350,
    thumbnails: "./assets/img/monitor1.jpg",
    code: "monitor-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Headphones",
    description: "A nice headphone",
    price: 200,
    thumbnails: "./assets/img/headphones1.jpg",
    code: "headphones-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Desktop",
    description: "A nice desktop",
    price: 1000,
    thumbnails: "./assets/img/desktop1.jpg",
    code: "desktop-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Laptop",
    description: "A nice laptop",
    price: 1200,
    thumbnails: "./assets/img/laptop1.jpg",
    code: "laptop-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Tablet",
    description: "A nice tablet",
    price: 800,
    thumbnails: "./assets/img/tablet1.jpg",
    code: "tablet-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Printer",
    description: "A nice printer",
    price: 500,
    thumbnails: "./assets/img/printer1.jpg",
    code: "printer-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Backpack",
    description: "A nice backpack",
    price: 80,
    thumbnails: "./assets/img/backpack1.jpg",
    code: "backpack-1",
    stock: 7
})

await new ProductManager().addProduct({
    title: "Mousepad",
    description: "A nice mousepad",
    price: 20,
    thumbnails: "./assets/img/mousepad1.jpg",
    code: "mousepad-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Webcam",
    description: "A nice webcam",
    price: 100,
    thumbnails: "./assets/img/webcam1.jpg",
    code: "webcam-1",
    stock: 10
})

await new ProductManager().addProduct({
    title: "Microphone",
    description: "A nice microphone",
    price: 150,
    thumbnails: "./assets/img/microphone1.jpg",
    code: "microphone-1",
    stock: 10
})
*/
// Export of class ProductManager
export default ProductManager

// Test product for console error
// await new ProductManager(`Printer 2`, `A nice printer`, 500, `./assets/img/printer2.jpg`, `printer-1`, 10).addProduct()

// Test getProductsById without error
// await new ProductManager().getProductById(1)

// Test getProductsById with error
// await new ProductManager().getProductById(10)

// Test update product by ID
// await new ProductManager().updateProductById(1, { title: `A new Keyboard`, description: `A new mechanical keyboard`, price: 150, thumbnails: `./assets/img/keyboard2.jpg`, code: `keyboard-2`, stock: 10 })

// Test getProductsById with updated product
// await new ProductManager().getProductById(1)

// Test erase product by ID
// await new ProductManager().deleteProductById(2)

// Test getProducts without the erased product
// testGetProducts()

// await new ProductManager().getProductById(2)
