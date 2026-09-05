const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('public'));

const products = [];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});