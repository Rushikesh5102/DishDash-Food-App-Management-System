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
exports.updateUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, address } = userData;
    const userExists = yield user_model_1.default.findOne({ where: { email } });
    if (userExists) {
        throw new Error('User already exists');
    }
    const user = yield user_model_1.default.create({
        name,
        email,
        password,
        address,
    });
    if (user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            token: generateToken(user.id),
        };
    }
    else {
        throw new Error('Invalid user data');
    }
});
exports.registerUser = registerUser;
const loginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    const user = yield user_model_1.default.findOne({ where: { email } });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        };
    }
    else {
        throw new Error('Invalid credentials');
    }
});
exports.loginUser = loginUser;
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByPk(userId, { attributes: { exclude: ['password'] } });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByPk(userId);
    if (user) {
        user.name = userData.name || user.name;
        user.email = userData.email || user.email;
        user.address = userData.address || user.address;
        if (userData.password) {
            user.password = userData.password;
        }
        const updatedUser = yield user.save();
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            address: updatedUser.address,
            token: generateToken(updatedUser.id),
        };
    }
    else {
        throw new Error('User not found');
    }
});
exports.updateUserProfile = updateUserProfile;
