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
exports.sequelize = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// MongoDB Connection
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }
        yield mongoose_1.default.connect(mongoURI);
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error('MongoDB connection error:', err instanceof Error ? err.message : String(err));
        process.exit(1);
    }
});
// MySQL Connection (Sequelize)
const sequelize = new sequelize_1.Sequelize(process.env.MYSQL_DATABASE || 'food_delivery_mysql', process.env.MYSQL_USER || 'root', process.env.MYSQL_PASSWORD || 'password', {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Set to true to see SQL queries in console
});
exports.sequelize = sequelize;
const connectMySQL = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('MySQL connected with Sequelize');
        // await sequelize.sync({ force: false }); // Use force: true to drop existing tables
        // console.log('All models were synchronized successfully.');
    }
    catch (err) {
        console.error('MySQL connection error:', err instanceof Error ? err.message : String(err));
        process.exit(1);
    }
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectMongoDB();
    yield connectMySQL();
});
exports.default = connectDB;
