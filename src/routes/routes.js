"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controllers/controller"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Routes pour les informations
router.get('/informations', controller_1.default.getAllInformations);
router.get('/informations/:id', controller_1.default.getInformationById);
router.post('/informations', controller_1.default.createInformation);
router.put('/informations/:id', controller_1.default.updateInformation);
router.delete('/informations/:id', controller_1.default.deleteInformation);
exports.default = router;
