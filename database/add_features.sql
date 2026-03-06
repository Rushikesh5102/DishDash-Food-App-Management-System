-- ========================================
-- DishDash Enhanced Features
-- Add authentication, favorites, order history, ratings, notifications
-- ========================================

USE food_delivery;

-- ================================================
-- 1️⃣ USERS TABLE (Authentication)
-- ================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    phone VARCHAR(15),
    address VARCHAR(255),
    city VARCHAR(100),
    pincode VARCHAR(10),
    profileImage VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    lastLogin DATETIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_createdAt (createdAt)
);

-- ================================================
-- 2️⃣ FAVORITES/WISHLIST TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    productId INT NOT NULL,
    platformId INT NOT NULL,
    savedPrice DECIMAL(10,2),
    savedDeliveryFee DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (platformId) REFERENCES platforms(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_user_product_platform (userId, productId, platformId),
    INDEX idx_userId (userId),
    INDEX idx_productId (productId)
);

-- ================================================
-- 3️⃣ ORDER HISTORY TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    productId INT,
    platformId INT,
    restaurantId INT,
    platformName VARCHAR(100),
    restaurantName VARCHAR(255),
    productName VARCHAR(255),
    price DECIMAL(10,2),
    deliveryFee DECIMAL(10,2),
    totalPrice DECIMAL(10,2),
    discount DECIMAL(10,2),
    status ENUM('pending','confirmed','delivered','cancelled') DEFAULT 'pending',
    orderDate DATETIME,
    deliveryDate DATETIME,
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY (platformId) REFERENCES platforms(id) ON DELETE SET NULL,
    FOREIGN KEY (restaurantId) REFERENCES restaurants(id) ON DELETE SET NULL,
    
    INDEX idx_userId (userId),
    INDEX idx_status (status),
    INDEX idx_orderDate (orderDate),
    INDEX idx_deliveryDate (deliveryDate)
);

-- ================================================
-- 4️⃣ RATINGS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    orderId INT,
    productId INT,
    platformId INT,
    restaurantId INT,
    ratingType ENUM('product','platform','restaurant','delivery') DEFAULT 'product',
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    helpful INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE SET NULL,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY (platformId) REFERENCES platforms(id) ON DELETE SET NULL,
    FOREIGN KEY (restaurantId) REFERENCES restaurants(id) ON DELETE SET NULL,
    
    INDEX idx_userId (userId),
    INDEX idx_ratingType (ratingType),
    INDEX idx_rating (rating)
);

-- ================================================
-- 5️⃣ NOTIFICATIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    orderId INT,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notificationType ENUM('order','promotion','review','general') DEFAULT 'general',
    isRead BOOLEAN DEFAULT FALSE,
    actionUrl VARCHAR(255),
    icon VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    readAt DATETIME,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE SET NULL,
    
    INDEX idx_userId (userId),
    INDEX idx_isRead (isRead),
    INDEX idx_createdAt (createdAt)
);

-- ================================================
-- 6️⃣ PRICE TRACKING TABLE (Optional - for price history)
-- ================================================
CREATE TABLE IF NOT EXISTS price_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    platformId INT NOT NULL,
    price DECIMAL(10,2),
    deliveryFee DECIMAL(10,2),
    discount DECIMAL(10,2),
    discountType VARCHAR(50),
    rating DECIMAL(2,1),
    trackedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (platformId) REFERENCES platforms(id) ON DELETE CASCADE,
    
    INDEX idx_productId (productId),
    INDEX idx_platformId (platformId),
    INDEX idx_trackedAt (trackedAt)
);

-- ================================================
-- INDEXES FOR BETTER PERFORMANCE
-- ================================================
ALTER TABLE favorites ADD INDEX IF NOT EXISTS idx_userId (userId);
ALTER TABLE orders ADD INDEX IF NOT EXISTS idx_userId (userId);
ALTER TABLE orders ADD INDEX IF NOT EXISTS idx_status (status);
ALTER TABLE ratings ADD INDEX IF NOT EXISTS idx_userId (userId);
ALTER TABLE notifications ADD INDEX IF NOT EXISTS idx_userId (userId);
ALTER TABLE notifications ADD INDEX IF NOT EXISTS idx_isRead (isRead);

-- ================================================
-- SAMPLE DATA FOR NEW FEATURES
-- ================================================

-- Insert sample user
INSERT INTO users (email, password, firstName, lastName, phone, address, city, pincode, isActive)
VALUES 
('user@example.com', '$2b$10$xEkDLxSZrFpP.CLVMG1tVu8q3.FzlM5F8qEqJ7yBnKjT9Z6K5O9K6', 'John', 'Doe', '9876543210', '123 Main St', 'Pune', '411001', TRUE),
('demo@example.com', '$2b$10$xEkDLxSZrFpP.CLVMG1tVu8q3.FzlM5F8qEqJ7yBnKjT9Z6K5O9K6', 'Jane', 'Smith', '9876543211', '456 Oak Ave', 'Pune', '411002', TRUE);

-- Sample favorites (products on different platforms)
INSERT INTO favorites (userId, productId, platformId, savedPrice, savedDeliveryFee)
SELECT 1, p.id, pl.platformId, pl.price, pl.deliveryFee
FROM products p
JOIN platform_listings pl ON p.id = pl.productId
LIMIT 5;

-- Sample order history
INSERT INTO orders (userId, productId, platformId, restaurantId, platformName, restaurantName, productName, price, deliveryFee, totalPrice, discount, status, orderDate, deliveryDate)
SELECT 
    1,
    p.id,
    pl.platformId,
    p.restaurantId,
    plat.name,
    r.name,
    p.name,
    pl.price,
    pl.deliveryFee,
    (pl.price + pl.deliveryFee - COALESCE(pl.discountValue, 0)),
    COALESCE(pl.discountValue, 0),
    'delivered',
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 30) DAY),
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 25) DAY)
FROM products p
JOIN platform_listings pl ON p.id = pl.productId
JOIN platforms plat ON pl.platformId = plat.id
JOIN restaurants r ON p.restaurantId = r.id
LIMIT 5;

-- Sample ratings
INSERT INTO ratings (userId, orderId, productId, platformId, restaurantId, ratingType, rating, review)
SELECT 
    1,
    o.id,
    o.productId,
    o.platformId,
    o.restaurantId,
    'product',
    FLOOR(RAND() * 4 + 2),
    'Great product and fast delivery!'
FROM orders o
WHERE o.userId = 1
LIMIT 3;

-- Sample notifications
INSERT INTO notifications (userId, orderId, title, message, notificationType, isRead, actionUrl, icon)
VALUES
(1, (SELECT id FROM orders LIMIT 1), 'Order Delivered', 'Your order has been successfully delivered!', 'order', FALSE, '/orders', '✓'),
(1, NULL, 'New Deals Available', 'Check out today\'s special discounts!', 'promotion', TRUE, '/orders', '🎉'),
(1, NULL, 'Rate Your Experience', 'Tell us about your recent order', 'review', FALSE, '/settings', '⭐');
