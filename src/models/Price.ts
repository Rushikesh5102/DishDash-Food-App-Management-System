import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Price extends Model {
  public id!: number;
  public productId!: number;
  public platform!: string;
  public price!: number;
  public timestamp!: Date;
}

Price.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'prices',
    timestamps: false, // We'll manage timestamp manually
  }
);

export default Price;
