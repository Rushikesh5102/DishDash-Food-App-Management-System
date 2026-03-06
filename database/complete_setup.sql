-- ========================================
-- DishDash Complete Database Setup
-- Drop and recreate everything
-- ========================================

-- Drop existing database if it exists
DROP DATABASE IF EXISTS food_delivery;

-- Create fresh database
CREATE DATABASE food_delivery;
USE food_delivery;

-- ========================================
-- DishDash Food App Management System
-- Database Schema
-- ========================================

-- 1️⃣ Platforms Table
CREATE TABLE platforms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    logoUrl VARCHAR(255),
    serviceArea VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

-- 2️⃣ Restaurants Table
CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    cuisineType VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3️⃣ Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurantId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    imageUrl VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (restaurantId)
        REFERENCES restaurants(id)
        ON DELETE CASCADE
);

-- 4️⃣ Platform Listings Table (Junction Table)
CREATE TABLE platform_listings (
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

    FOREIGN KEY (productId)
        REFERENCES products(id)
        ON DELETE CASCADE,

    FOREIGN KEY (platformId)
        REFERENCES platforms(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_product_platform 
        UNIQUE (productId, platformId),

    CONSTRAINT chk_price CHECK (price > 0),
    CONSTRAINT chk_eta CHECK (etaMinutes > 0)
);

-- Indexes
CREATE INDEX idx_product_name ON products(name);
CREATE INDEX idx_restaurant_name ON restaurants(name);
CREATE INDEX idx_platform_id ON platform_listings(platformId);
CREATE INDEX idx_product_id ON platform_listings(productId);

-- ========================================
-- DishDash Sample Data
-- ========================================

-- Insert Platforms
INSERT INTO platforms (name, logoUrl, serviceArea)
VALUES
('Swiggy', 'https://logo.clearbit.com/swiggy.com', 'Pune'),
('Zomato', 'https://logo.clearbit.com/zomato.com', 'Pune'),
('Eatsure', 'https://logo.clearbit.com/eatsure.com', 'Pune'),
('Maginpin', 'https://logo.clearbit.com/maginpin.com', 'Pune'),
('Dunzo', 'https://logo.clearbit.com/dunzo.com', 'Pune');

-- Insert Restaurants
INSERT INTO restaurants (name, location, cuisineType)
VALUES
('Biryani House', 'Pune', 'Indian'),
('Burger Point', 'Pune', 'Fast Food'),
('Pizza Palace', 'Pune', 'Italian'),
('Sushi Bar', 'Pune', 'Asian');

-- Insert Products
INSERT INTO products (restaurantId, name, category, imageUrl)
VALUES
(1, 'Chicken Biryani', 'Main Course', 'https://images.unsplash.com/photo-1563821661-8ac94b63c57f?w=400&h=300&fit=crop'),
(2, 'Veg Burger', 'Fast Food', 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop'),
(3, 'Margherita Pizza', 'Pizza', 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop'),
(4, 'Salmon Sushi Roll', 'Sushi', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop');

-- Insert Platform Listings
INSERT INTO platform_listings
(productId, platformId, price, deliveryFee, discountType, discountValue, etaMinutes, rating, redirectUrl)
VALUES
(1, 1, 250, 30, 'percentage', 10, 35, 4.3, 'https://swiggy.com'),
(1, 2, 240, 25, 'flat', 20, 30, 4.1, 'https://zomato.com'),
(1, 3, 245, 28, 'percentage', 8, 32, 4.2, 'https://eatsure.com'),
(1, 4, 260, 32, 'percentage', 12, 40, 4.0, 'https://maginpin.com'),
(1, 5, 255, 35, 'flat', 15, 38, 4.1, 'https://dunzo.com'),
(2, 1, 120, 20, 'none', 0, 25, 4.0, 'https://swiggy.com'),
(2, 2, 110, 15, 'percentage', 5, 20, 4.2, 'https://zomato.com'),
(2, 3, 115, 18, 'percentage', 7, 22, 4.1, 'https://eatsure.com'),
(2, 4, 125, 22, 'flat', 10, 28, 3.9, 'https://maginpin.com'),
(2, 5, 120, 25, 'percentage', 5, 30, 4.0, 'https://dunzo.com'),
(3, 1, 350, 40, 'percentage', 15, 40, 4.4, 'https://swiggy.com'),
(3, 2, 340, 35, 'flat', 30, 35, 4.3, 'https://zomato.com'),
(3, 3, 345, 38, 'percentage', 12, 38, 4.2, 'https://eatsure.com'),
(3, 4, 360, 42, 'percentage', 10, 45, 4.1, 'https://maginpin.com'),
(3, 5, 355, 45, 'flat', 25, 42, 4.2, 'https://dunzo.com'),
(4, 1, 450, 50, 'percentage', 20, 45, 4.5, 'https://swiggy.com'),
(4, 2, 440, 45, 'flat', 50, 40, 4.4, 'https://zomato.com'),
(4, 3, 445, 48, 'percentage', 15, 42, 4.3, 'https://eatsure.com'),
(4, 4, 460, 52, 'percentage', 18, 50, 4.2, 'https://maginpin.com'),
(4, 5, 455, 55, 'flat', 40, 48, 4.3, 'https://dunzo.com');

-- Verify data
SELECT 'Platforms' as table_name, COUNT(*) as count FROM platforms
UNION ALL
SELECT 'Restaurants', COUNT(*) FROM restaurants
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Platform Listings', COUNT(*) FROM platform_listings;
