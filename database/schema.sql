CREATE DATABASE IF NOT EXISTS product_crud;

USE product_crud;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);