const products = require('../data/products');

// get
function getProducts(req, res) {
    res.json(products);
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

module.exports = {
    getProducts,
    createProduct
};