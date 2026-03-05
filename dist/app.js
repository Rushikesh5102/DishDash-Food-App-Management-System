"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const platform_routes_1 = __importDefault(require("./routes/platform.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const restaurant_routes_1 = __importDefault(require("./routes/restaurant.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/users', user_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/platforms', platform_routes_1.default);
app.use('/api/orders', order_routes_1.default);
app.use('/api/restaurants', restaurant_routes_1.default);
app.use(error_middleware_1.default);
exports.default = app; // This allows server.ts to use it
