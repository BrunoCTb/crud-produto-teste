const products = require('../data/products');

// get all
function getProducts(req, res) {
    res.json(products);
}

// get BYD
function getProductById(req, res) {
    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    res.json(product);
}

// post
function createProduct(req, res) {
    const { user, description, quantity, price } = req.body;

    const product = {
        id: products.length + 1,
        registrationDate: new Date(),
        user,
        description,
        quantity,
        price
    };

    products.push(product);

    res.status(201).json(product);
}

// upd
function updateProduct(req, res) {
    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    const { user, description, quantity, price } = req.body;

    product.user = user;
    product.description = description;
    product.quantity = quantity;
    product.price = price;

    res.json(product);
}

// delete
function deleteProduct(req, res) {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    products.splice(productIndex, 1);

    res.status(204).send();
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};