import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Product from './product.model';
import PriceComparison from './priceComparison.model';

class Redirection extends Model {
  public id!: number;
  public redirection_url!: string;
  public productId!: number;
  public priceComparisonId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Redirection.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  redirection_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'redirections',
});

// Associations
Redirection.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Redirection, { foreignKey: 'productId' });

Redirection.belongsTo(PriceComparison, { foreignKey: 'priceComparisonId' });
PriceComparison.hasMany(Redirection, { foreignKey: 'priceComparisonId' });

export default Redirection;
