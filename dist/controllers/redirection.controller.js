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
exports.deleteRedirection = exports.updateRedirection = exports.getRedirectionById = exports.getRedirections = exports.createRedirection = void 0;
const redirectionService = __importStar(require("../services/redirection.service"));
const createRedirection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redirection = yield redirectionService.createRedirection(req.body);
        res.status(201).json(redirection);
    }
    catch (error) {
        next(error);
    }
});
exports.createRedirection = createRedirection;
const getRedirections = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redirections = yield redirectionService.getRedirections();
        res.json(redirections);
    }
    catch (error) {
        next(error);
    }
});
exports.getRedirections = getRedirections;
const getRedirectionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redirection = yield redirectionService.getRedirectionById(req.params.id);
        if (redirection) {
            res.json(redirection);
        }
        else {
            res.status(404).json({ message: 'Redirection not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getRedirectionById = getRedirectionById;
const updateRedirection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redirection = yield redirectionService.updateRedirection(req.params.id, req.body);
        if (redirection) {
            res.json(redirection);
        }
        else {
            res.status(404).json({ message: 'Redirection not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateRedirection = updateRedirection;
const deleteRedirection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redirection = yield redirectionService.deleteRedirection(req.params.id);
        if (redirection) {
            res.json({ message: 'Redirection removed' });
        }
        else {
            res.status(404).json({ message: 'Redirection not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRedirection = deleteRedirection;
