"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlatform = exports.updatePlatform = exports.getPlatformById = exports.getPlatforms = exports.createPlatform = void 0;
const platformService = __importStar(require("../services/platform.service"));
const createPlatform = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const platform = yield platformService.createPlatform(req.body);
        res.status(201).json(platform);
    }
    catch (error) {
        next(error);
    }
});
exports.createPlatform = createPlatform;
const getPlatforms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const platforms = yield platformService.getPlatforms();
        res.json(platforms);
    }
    catch (error) {
        next(error);
    }
});
exports.getPlatforms = getPlatforms;
const getPlatformById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const platform = yield platformService.getPlatformById(parseInt(req.params.id));
        if (platform) {
            res.json(platform);
        }
        else {
            res.status(404).json({ message: 'Platform not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getPlatformById = getPlatformById;
const updatePlatform = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const platform = yield platformService.updatePlatform(parseInt(req.params.id), req.body);
        if (platform) {
            res.json(platform);
        }
        else {
            res.status(404).json({ message: 'Platform not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updatePlatform = updatePlatform;
const deletePlatform = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCount = yield platformService.deletePlatform(parseInt(req.params.id));
        if (deletedCount > 0) {
            res.json({ message: 'Platform removed' });
        }
        else {
            res.status(404).json({ message: 'Platform not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deletePlatform = deletePlatform;
