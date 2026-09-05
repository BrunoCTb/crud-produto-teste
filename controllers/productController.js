const connection = require('../database/connection');

async function getProducts(req, res) {
    try {
        const [products] = await connection.query(`
            SELECT
                id,
                registration_date AS registrationDate,
                user,
                description,
                quantity,
                price
            FROM products
            ORDER BY id ASC
        `);

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching products'
        });
    }
}

async function createProduct(req, res) {
    try {
        const { user, description, quantity, price } = req.body;

        const [result] = await connection.query(
            `INSERT INTO products (user, description, quantity, price)
             VALUES (?, ?, ?, ?)`,
            [user, description, quantity, price]
        );

        const [products] = await connection.query(
            'SELECT * FROM products WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json(products[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating product'
        });
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        const [products] = await connection.query(`
            SELECT
                id,
                registration_date AS registrationDate,
                user,
                description,
                quantity,
                price
            FROM products
            WHERE id = ?
        `, [id]);

        if (products.length === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json(products[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching product'
        });
    }
}

async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const { user, description, quantity, price } = req.body;

        const [result] = await connection.query(
            `UPDATE products
             SET user = ?, description = ?, quantity = ?, price = ?
             WHERE id = ?`,
            [user, description, quantity, price, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        const [products] = await connection.query(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );

        res.json(products[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error updating product'
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const [result] = await connection.query(
            'DELETE FROM products WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error deleting product'
        });
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};