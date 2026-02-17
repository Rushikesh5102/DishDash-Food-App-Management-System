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
exports.deletePlatform = exports.updatePlatform = exports.getPlatformById = exports.getPlatforms = exports.createPlatform = void 0;
const platform_model_1 = __importDefault(require("../models/platform.model"));
const createPlatform = (platformData) => __awaiter(void 0, void 0, void 0, function* () {
    const platform = new platform_model_1.default(platformData);
    return yield platform.save();
});
exports.createPlatform = createPlatform;
const getPlatforms = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield platform_model_1.default.find({});
});
exports.getPlatforms = getPlatforms;
const getPlatformById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield platform_model_1.default.findById(id);
});
exports.getPlatformById = getPlatformById;
const updatePlatform = (id, platformData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield platform_model_1.default.findByIdAndUpdate(id, platformData, { new: true });
});
exports.updatePlatform = updatePlatform;
const deletePlatform = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield platform_model_1.default.findByIdAndDelete(id);
});
exports.deletePlatform = deletePlatform;
