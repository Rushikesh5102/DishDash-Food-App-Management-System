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
exports.deleteRedirection = exports.updateRedirection = exports.getRedirectionById = exports.getRedirections = exports.createRedirection = void 0;
const redirection_model_1 = __importDefault(require("../models/redirection.model"));
const createRedirection = (redirectionData) => __awaiter(void 0, void 0, void 0, function* () {
    const redirection = new redirection_model_1.default(redirectionData);
    return yield redirection.save();
});
exports.createRedirection = createRedirection;
const getRedirections = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield redirection_model_1.default.find({}).populate('product').populate('priceComparison');
});
exports.getRedirections = getRedirections;
const getRedirectionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redirection_model_1.default.findById(id).populate('product').populate('priceComparison');
});
exports.getRedirectionById = getRedirectionById;
const updateRedirection = (id, redirectionData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redirection_model_1.default.findByIdAndUpdate(id, redirectionData, { new: true });
});
exports.updateRedirection = updateRedirection;
const deleteRedirection = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redirection_model_1.default.findByIdAndDelete(id);
});
exports.deleteRedirection = deleteRedirection;
