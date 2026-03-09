import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Favorite extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public platformId!: number;
  public savedPrice!: number;
  public savedDeliveryFee!: number;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    platformId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    savedPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    savedDeliveryFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'favorites',
    timestamps: true,
    indexes: [{ unique: true, fields: ['userId', 'productId', 'platformId'] }],
  }
);

export default Favorite;
