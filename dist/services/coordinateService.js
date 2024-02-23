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
const axios_1 = __importDefault(require("axios"));
const coordinateService = {
    getAdressCoordinate: (adresse) => __awaiter(void 0, void 0, void 0, function* () {
        let error;
        let latitude;
        let longitude;
        try {
            const response = yield axios_1.default.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: adresse,
                    format: 'json',
                    limit: 1
                },
                headers: {
                    'User-Agent': 'node.js'
                }
            });
            const data = response.data;
            if (data.length > 0) {
                longitude = parseFloat(data[0].lon);
                latitude = parseFloat(data[0].lat);
            }
            else {
                // Fallback coordinates (Tour Eiffel)
                longitude = 2.294492;
                latitude = 48.858384;
            }
        }
        catch (err) {
            error = "Erreur lors de la récupération des coordonnées";
        }
        return {
            error,
            longitude,
            latitude
        };
    })
};
exports.default = coordinateService;
