-- ==============================
-- DishDash Food App Management System
-- Database Schema
-- ==============================

-- Create Platforms Table
CREATE TABLE IF NOT EXISTS platforms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    logoUrl VARCHAR(255),
    serviceArea VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

-- Create Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    cuisineType VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurantId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    imageUrl VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (restaurantId) REFERENCES restaurants(id)
        ON DELETE CASCADE
);

-- Junction Table: Platform Listings
CREATE TABLE IF NOT EXISTS platformListings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    platformId INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    deliveryFee DECIMAL(10,2) DEFAULT 0.00,
    discountType ENUM('percentage','flat','none') DEFAULT 'none',
    discountValue DECIMAL(10,2) DEFAULT 0.00,
    etaMinutes INT DEFAULT 30,
    rating DECIMAL(2,1),
    redirectUrl VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (productId) REFERENCES products(id)
        ON DELETE CASCADE,

    FOREIGN KEY (platformId) REFERENCES platforms(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_product_platform UNIQUE (productId, platformId),
    CONSTRAINT chk_price CHECK (price > 0),
    CONSTRAINT chk_eta CHECK (etaMinutes > 0)
);

-- Indexing for performance
CREATE INDEX idx_product_name ON products(name);
CREATE INDEX idx_restaurant_name ON restaurants(name);
CREATE INDEX idx_platform_id ON platformListings(platformId);
CREATE INDEX idx_product_id ON platformListings(productId);
