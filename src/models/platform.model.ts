import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Platform extends Model {
  public id!: number;
  public name!: string;
  public logoUrl!: string | null;
  public serviceArea!: string;
}

Platform.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serviceArea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'platforms',
    timestamps: true,
  }
);

export default Platform;
