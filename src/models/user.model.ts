import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public address!: string;
  public city!: string;
  public pincode!: string;
  public profileImage!: string;
  public isActive!: boolean;
  public lastLogin!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to compare password
  async comparePassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  // Method to get public profile (without password)
  getPublicProfile() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      city: this.city,
      pincode: this.pincode,
      profileImage: this.profileImage,
      isActive: this.isActive,
      createdAt: this.createdAt,
    };
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(100),
  },
  lastName: {
    type: DataTypes.STRING(100),
  },
  phone: {
    type: DataTypes.STRING(15),
  },
  address: {
    type: DataTypes.STRING(255),
  },
  city: {
    type: DataTypes.STRING(100),
  },
  pincode: {
    type: DataTypes.STRING(10),
  },
  profileImage: {
    type: DataTypes.STRING(255),
    defaultValue: 'https://via.placeholder.com/150',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  lastLogin: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user: User) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user: User) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

export default User;
