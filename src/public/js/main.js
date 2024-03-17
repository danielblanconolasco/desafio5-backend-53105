    console.log("Conectado")

    const socket = io()

    let products =[]

    //Receive the products from the server
    socket.on("products", (data) => {
        products = data
        renderProducts(data)
        return products
    })
    
    // Function to render real time products using socket.io
    const renderProducts = (products) => {
        const productsContainer = document.getElementById('products-container')
        productsContainer.innerHTML = ''

        products.forEach(product => {
            const productDiv = document.createElement('div')
            productDiv.className = 'col'
            productDiv.innerHTML = `
                <div class=card>
                <div class=card-body>
                    <!-- <img src="" class="card-img-top" alt="...">-->
                    <h5 class=card-title>${product.title}</h5>
                    <p class=card-text">${product.description}</p>
                    <p>${product._id}</p>
                    <p>${product.price}</p>
                    <button type="button" class="btn btn-danger">Delete from inventory</button>
                </div>
                </div>
                `
            productsContainer.appendChild(productDiv)

            // Event listener for deleting a product
            productDiv.querySelector('button').addEventListener('click', () => {
                deleteProduct(product._id)
            })
        })
    }

    // Function to delete a product
    const deleteProduct = (id) => {
        socket.emit("deleteProduct", id)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product deleted successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }

    // Event listener for adding a product
    document.getElementById('addProduct').addEventListener('click', () => {
        addProduct()
    })

    const addProduct = () => {
        const product = {
            title: document.getElementById('productTitle').value,
            description: document.getElementById('productDescription').value,
            price: document.getElementById('productPrice').value,
            thumbnail: [],
            code: document.getElementById('productCode').value,
            stock: document.getElementById('productStock').value,
            status: document.getElementById('productStatus').value === 'true',
            category: document.getElementById('productCategory').value,
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category) {
            console.log(`Please fill all the fields`)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields',
            })
            return
        }
        if (isNaN(product.price) || isNaN(product.stock)) {
            console.log(`Price and stock must be numbers`)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Price and stock must be numbers',
            })
            return
        }
        if (product.price <= 0 || product.stock <= 0) {
            console.log(`Price and stock must be greater than 0`)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Price and stock must be greater than 0',

            })
            return
        }
        if (product.status !== true && product.status !== false) {
            console.log(`Status must be true or false`)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Status must be true or false',
            })
            return
        }

        if (products.some(existingProduct => existingProduct.code === product.code)) {
            console.log(`Product code already exists`)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Product code already exists',
            })
            return
        }
        // Function to add the product to server Database
        socket.emit('addProduct', product)

        // Show a success message
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product added successfully',
            showConfirmButton: false,
            timer: 1500,
            text: `Product ${product.title} added successfully`
        })
        console.log(product)

        // Clear the form
        document.getElementById('productTitle').value = ''
        document.getElementById('productDescription').value = ''
        document.getElementById('productPrice').value = ''
        document.getElementById('productCode').value = ''
        document.getElementById('productStock').value = ''
        document.getElementById('productStatus').value = ''
    }