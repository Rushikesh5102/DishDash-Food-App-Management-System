import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import Platform from "./platform.model";
import Product from "./product.model";

class PlatformListing extends Model {
  public id!: number;
  public productId!: number;
  public platformId!: number;
  public price!: number;
  public deliveryFee!: number;
  public discountType!: "percentage" | "flat" | "none";
  public discountValue!: number;
  public etaMinutes!: number;
  public redirectUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      defaultValue: 0,
    },
    discountType: {
      type: DataTypes.ENUM("percentage", "flat", "none"),
      defaultValue: "none",
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    etaMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
    },
    redirectUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "platform_listings",
  }
);

//
// ✅ ASSOCIATIONS (VERY IMPORTANT)
//

PlatformListing.belongsTo(Platform, { foreignKey: "platformId" });
Platform.hasMany(PlatformListing, { foreignKey: "platformId" });

PlatformListing.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(PlatformListing, { foreignKey: "productId" });

export default PlatformListing;