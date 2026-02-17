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
exports.deletePriceComparison = exports.updatePriceComparison = exports.getPriceComparisonById = exports.getPriceComparisons = exports.createPriceComparison = void 0;
const priceComparison_model_1 = __importDefault(require("../models/priceComparison.model"));
const createPriceComparison = (priceComparisonData) => __awaiter(void 0, void 0, void 0, function* () {
    const priceComparison = new priceComparison_model_1.default(priceComparisonData);
    return yield priceComparison.save();
});
exports.createPriceComparison = createPriceComparison;
const getPriceComparisons = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield priceComparison_model_1.default.find({}).populate('user').populate('platform');
});
exports.getPriceComparisons = getPriceComparisons;
const getPriceComparisonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield priceComparison_model_1.default.findById(id).populate('user').populate('platform');
});
exports.getPriceComparisonById = getPriceComparisonById;
const updatePriceComparison = (id, priceComparisonData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield priceComparison_model_1.default.findByIdAndUpdate(id, priceComparisonData, { new: true });
});
exports.updatePriceComparison = updatePriceComparison;
const deletePriceComparison = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield priceComparison_model_1.default.findByIdAndDelete(id);
});
exports.deletePriceComparison = deletePriceComparison;
