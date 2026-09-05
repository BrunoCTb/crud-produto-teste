const express = require('express');
const productRoutes = require('./routes/productRoutes');
const connection = require('./database/connection');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.use('/api/products', productRoutes);

connection.query('SELECT 1')
    .then(() => {
        console.log('MySQL connected successfully');
    })
    .catch(error => {
        console.error('MySQL connection failed:', error);
    });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});