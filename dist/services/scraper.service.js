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
exports.fetchPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchPrices = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post('http://localhost:8000/scrape', {
            item: productName,
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching prices from Python scraper:', error);
        // Check for specific error conditions if possible, e.g., network error
        // For now, a general check that implies server might be down
        if (axios_1.default.isAxiosError(error) && error.code === 'ECONNREFUSED') {
            throw new Error('Scraper Unavailable: Could not connect to the scraping service.');
        }
        throw new Error('Failed to fetch prices: An unexpected error occurred.');
    }
});
exports.fetchPrices = fetchPrices;
