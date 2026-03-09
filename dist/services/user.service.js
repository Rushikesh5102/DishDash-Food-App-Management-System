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
    const { firstName, lastName, email, password, phone, address, city, pincode } = userData;
    const userExists = yield user_model_1.default.findOne({ where: { email: email === null || email === void 0 ? void 0 : email.toLowerCase() } });
    if (userExists) {
        throw new Error('User already exists');
    }
    const user = yield user_model_1.default.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        city,
        pincode,
    });
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        pincode: user.pincode,
        token: generateToken(user.id),
    };
});
exports.registerUser = registerUser;
const loginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    const user = yield user_model_1.default.scope('withPassword').findOne({ where: { email: email === null || email === void 0 ? void 0 : email.toLowerCase() } });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            city: user.city,
            pincode: user.pincode,
            token: generateToken(user.id),
        };
    }
    throw new Error('Invalid credentials');
});
exports.loginUser = loginUser;
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByPk(Number(userId), {
        attributes: { exclude: ['password'] },
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.scope('withPassword').findByPk(Number(userId));
    if (!user) {
        throw new Error('User not found');
    }
    user.firstName = userData.firstName || user.firstName;
    user.lastName = userData.lastName || user.lastName;
    user.email = userData.email || user.email;
    user.phone = userData.phone || user.phone;
    user.address = userData.address || user.address;
    user.city = userData.city || user.city;
    user.pincode = userData.pincode || user.pincode;
    if (userData.password)
        user.password = userData.password;
    const updatedUser = yield user.save();
    return {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        city: updatedUser.city,
        pincode: updatedUser.pincode,
        token: generateToken(updatedUser.id),
    };
});
exports.updateUserProfile = updateUserProfile;
