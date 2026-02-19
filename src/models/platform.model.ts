import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Platform extends Model {
  public id!: number;
  public platform_name!: string;
  public service_area!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Platform.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  platform_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  service_area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'platforms',
});

export default Platform;
