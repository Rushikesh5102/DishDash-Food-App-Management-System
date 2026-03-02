SELECT * FROM platforms;
SELECT * FROM restaurants;
SELECT * FROM products;
SELECT * FROM platformListings;

SELECT 
    r.name AS restaurant,
    p.name AS product,
    pl.name AS platform,
    l.price,
    l.deliveryFee,
    l.discountType,
    l.discountValue,
    l.etaMinutes,
    l.rating
FROM platformListings l
JOIN products p ON l.productId = p.id
JOIN restaurants r ON p.restaurantId = r.id
JOIN platforms pl ON l.platformId = pl.id;

CREATE VIEW dishdash_price_comparison AS
SELECT 
    r.name AS restaurant,
    p.name AS product,
    pl.name AS platform,
    l.price,
    l.deliveryFee,
    l.discountType,
    l.discountValue,
    l.etaMinutes,
    l.rating
FROM platformListings l
JOIN products p ON l.productId = p.id
JOIN restaurants r ON p.restaurantId = r.id
JOIN platforms pl ON l.platformId = pl.id;

SELECT * FROM dishdash_price_comparison;
