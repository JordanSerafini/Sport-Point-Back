"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 5000;
// Setting up environment variables
dotenv_1.default.config();
// Create express application
const app = (0, express_1.default)();
// CORS
const corsOptions = {
    origin: ["http://localhost:5173", "https://sportpoint.netlify.app", "sportpoint.netlify.app"]
};
app.use((0, cors_1.default)());
// Setting the middleware to serve static files
app.use(express_1.default.static("public"));
app.use(express_1.default.static("node_modules"));
// Setting the middleware to manage POST data
// Middleware is a function that runs between the request and the response
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Routes settings
app.use("/", routes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
