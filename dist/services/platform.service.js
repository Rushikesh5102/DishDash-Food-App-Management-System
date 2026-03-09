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
    return platform_model_1.default.create(platformData);
});
exports.createPlatform = createPlatform;
const getPlatforms = () => __awaiter(void 0, void 0, void 0, function* () {
    return platform_model_1.default.findAll({ order: [['createdAt', 'DESC']] });
});
exports.getPlatforms = getPlatforms;
const getPlatformById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return platform_model_1.default.findByPk(Number(id));
});
exports.getPlatformById = getPlatformById;
const updatePlatform = (id, platformData) => __awaiter(void 0, void 0, void 0, function* () {
    const [affectedCount] = yield platform_model_1.default.update(platformData, { where: { id: Number(id) } });
    if (affectedCount > 0) {
        return platform_model_1.default.findByPk(Number(id));
    }
    return null;
});
exports.updatePlatform = updatePlatform;
const deletePlatform = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return platform_model_1.default.destroy({ where: { id: Number(id) } });
});
exports.deletePlatform = deletePlatform;
