-- Insert Platforms
INSERT INTO platforms (name, logoUrl, serviceArea)
VALUES
('Swiggy', 'https://logo.clearbit.com/swiggy.com', 'Pune'),
('Zomato', 'https://logo.clearbit.com/zomato.com', 'Pune');

-- Insert Restaurants
INSERT INTO restaurants (name, location, cuisineType)
VALUES
('Biryani House', 'Pune', 'Indian'),
('Burger Point', 'Pune', 'Fast Food');

-- Insert Products
INSERT INTO products (restaurantId, name, category, imageUrl)
VALUES
(1, 'Chicken Biryani', 'Main Course', 'biryani.jpg'),
(2, 'Veg Burger', 'Fast Food', 'burger.jpg');

-- Insert Platform Listings
INSERT INTO platformListings
(productId, platformId, price, deliveryFee, discountType, discountValue, etaMinutes, rating, redirectUrl)
VALUES
(1, 1, 250, 30, 'percentage', 10, 35, 4.3, 'https://swiggy.com'),
(1, 2, 240, 25, 'flat', 20, 30, 4.1, 'https://zomato.com'),
(2, 1, 120, 20, 'none', 0, 25, 4.0, 'https://swiggy.com'),
(2, 2, 110, 15, 'percentage', 5, 20, 4.2, 'https://zomato.com');
