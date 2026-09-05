const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('public'));

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});