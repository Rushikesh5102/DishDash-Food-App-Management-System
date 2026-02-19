import Product from './Product';
import Price from './Price';

const setupAssociations = () => {
  Product.hasMany(Price, {
    foreignKey: 'productId',
    as: 'prices',
  });

  Price.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
  });
};

export default setupAssociations;
