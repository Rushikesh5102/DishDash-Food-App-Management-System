USE dishdash_food_app;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS redirection;
DROP TABLE IF EXISTS pricecomparison;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS platforms;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------
-- USERS
-- --------------------------------------------------

CREATE TABLE users (
  user_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150)
);

INSERT INTO users VALUES
(1,'Rahul Sharma','rahul@gmail.com'),
(2,'Priya Mehta','priya@gmail.com'),
(3,'Amit Patil','amit@gmail.com'),
(4,'Sneha Kulkarni','sneha@gmail.com'),
(5,'Aditya Deshmukh','aditya@gmail.com');

-- --------------------------------------------------
-- PLATFORMS
-- --------------------------------------------------

CREATE TABLE platforms (
  platform_id INT PRIMARY KEY,
  platform_name VARCHAR(100)
);

INSERT INTO platforms VALUES
(1,'Swiggy'),
(2,'Zomato'),
(3,'EatSure'),
(4,'Magicpin'),
(5,'Dunzo');

-- --------------------------------------------------
-- PRODUCTS
-- --------------------------------------------------

CREATE TABLE products (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(150),
  category VARCHAR(100)
);

INSERT INTO products VALUES
(1,'Chicken Biryani','Biryani'),
(2,'Veg Biryani','Biryani'),
(3,'Mutton Biryani','Biryani'),
(4,'Butter Chicken','North Indian'),
(5,'Paneer Butter Masala','North Indian'),
(6,'Dal Makhani','North Indian'),
(7,'Margherita Pizza','Pizza'),
(8,'Farmhouse Pizza','Pizza'),
(9,'Veg Burger','Fast Food'),
(10,'Chicken Burger','Fast Food'),
(11,'Hakka Noodles','Chinese'),
(12,'Veg Manchurian','Chinese'),
(13,'Chicken Fried Rice','Chinese'),
(14,'Paneer Tikka','Starter'),
(15,'Chicken Tikka','Starter');

-- --------------------------------------------------
-- PRICE COMPARISON
-- --------------------------------------------------

CREATE TABLE pricecomparison (
  comparison_id INT PRIMARY KEY,
  product_id INT,
  platform_id INT,
  price FLOAT,
  discount FLOAT,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (platform_id) REFERENCES platforms(platform_id)
);

INSERT INTO pricecomparison VALUES
(1,1,1,260,20),
(2,1,2,249,25),
(3,1,3,255,30),
(4,1,4,245,15),
(5,1,5,265,10),

(6,2,1,180,20),
(7,2,2,170,25),
(8,2,3,175,30),
(9,2,4,165,15),
(10,2,5,185,10),

(11,3,1,340,15),
(12,3,2,329,20),
(13,3,3,335,25),
(14,3,4,320,10),
(15,3,5,345,5),

(16,7,1,199,15),
(17,7,2,189,20),
(18,7,3,195,25),
(19,7,4,180,10),
(20,7,5,205,5),

(21,9,1,140,10),
(22,9,2,130,15),
(23,9,3,135,20),
(24,9,4,125,10),
(25,9,5,145,5);

-- --------------------------------------------------
-- REDIRECTION
-- --------------------------------------------------

CREATE TABLE redirection (
  redirect_id INT PRIMARY KEY,
  comparison_id INT,
  redirect_url VARCHAR(300),
  FOREIGN KEY (comparison_id) REFERENCES pricecomparison(comparison_id)
);

INSERT INTO redirection VALUES
(1,1,'https://swiggy.com/chicken-biryani'),
(2,2,'https://zomato.com/chicken-biryani'),
(3,3,'https://eatsure.com/chicken-biryani'),
(4,4,'https://magicpin.in/chicken-biryani'),
(5,5,'https://dunzo.com/chicken-biryani'),

(6,6,'https://swiggy.com/veg-biryani'),
(7,7,'https://zomato.com/veg-biryani'),

(8,11,'https://swiggy.com/mutton-biryani'),
(9,12,'https://zomato.com/mutton-biryani'),

(10,16,'https://swiggy.com/margherita-pizza'),
(11,17,'https://zomato.com/margherita-pizza'),

(12,21,'https://swiggy.com/veg-burger'),
(13,22,'https://zomato.com/veg-burger');