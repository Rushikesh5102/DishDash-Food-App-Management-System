"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
class User extends sequelize_1.Model {
    comparePassword(enteredPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(enteredPassword, this.password);
        });
    }
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
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    pincode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    profileImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://via.placeholder.com/150',
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    lastLogin: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            user.password = yield bcryptjs_1.default.hash(user.password, salt);
        }),
        beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.changed('password')) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                user.password = yield bcryptjs_1.default.hash(user.password, salt);
            }
        }),
    },
    scopes: {
        withPassword: {
            attributes: { include: ['password'] },
        },
    },
});
exports.default = User;
