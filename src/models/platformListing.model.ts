import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class PlatformListing extends Model {
  public id!: number;
  public productId!: number;
  public platformId!: number;
  public price!: number;
  public deliveryFee!: number;
  public discountType!: 'percentage' | 'flat' | 'none';
  public discountValue!: number;
  public etaMinutes!: number;
  public rating!: number;
  public redirectUrl!: string;
}

PlatformListing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    platformId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deliveryFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    discountType: {
      type: DataTypes.ENUM('percentage', 'flat', 'none'),
      allowNull: false,
      defaultValue: 'none',
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    etaMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: true,
      defaultValue: 0,
    },
    redirectUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'platform_listings',
    timestamps: true,
    updatedAt: false,
    indexes: [{ unique: true, fields: ['productId', 'platformId'] }],
  }
);

export default PlatformListing;
