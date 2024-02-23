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
const informationsModel_1 = __importDefault(require("../models/informationsModel"));
const coordinateService_1 = __importDefault(require("../services/coordinateService"));
class UserAndExpenseController {
    // Récupérer toutes les informations
    static getAllInformations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const informations = yield informationsModel_1.default.getAllInformations();
                res.status(200).json(informations);
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la récupération des informations' });
            }
        });
    }
    // Récupérer une information par ID
    static getInformationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const information = yield informationsModel_1.default.getInformationById(Number(id));
                if (information) {
                    res.status(200).json(information);
                }
                else {
                    res.status(404).json({ message: 'Information non trouvée' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la récupération de l’information' });
            }
        });
    }
    // Ajouter une information
    static createInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, description, adresse, longitude, latitude, image, type, note, horaires, site, open } = req.body;
            if (longitude == null || latitude == null) {
                try {
                    const coordinates = yield coordinateService_1.default.getAdressCoordinate(adresse);
                    if (coordinates.error) {
                        res.status(500).json({ error: coordinates.error });
                    }
                    longitude = coordinates.longitude;
                    latitude = coordinates.latitude;
                }
                catch (error) {
                    res.status(500).json({ error: "Erreur lors de la récupération des coordonnées" });
                }
            }
            try {
                const newInformation = yield informationsModel_1.default.createInformation({
                    name,
                    description,
                    adresse,
                    longitude,
                    latitude,
                    image,
                    type,
                    note,
                    horaires,
                    site,
                    open,
                    id: 0
                });
                res.status(201).json(newInformation);
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de l’ajout de l’information' });
            }
        });
    }
    // Modifier une information
    static updateInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, description, adresse, longitude, latitude, image, type, note, horaires, site, open } = req.body;
            try {
                const updatedInformation = yield informationsModel_1.default.updateInformation({
                    id: Number(id),
                    name,
                    description,
                    adresse,
                    longitude,
                    latitude,
                    image,
                    type,
                    note,
                    horaires,
                    site,
                    open
                });
                if (updatedInformation) {
                    res.status(200).json({ message: 'Information modifiée' });
                }
                else {
                    res.status(404).json({ message: 'Information non trouvée' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la modification de l’information' });
            }
        });
    }
    // Supprimer une information
    static deleteInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedInformation = yield informationsModel_1.default.deleteInformation(Number(id));
                if (deletedInformation) {
                    res.status(200).json({ message: 'Information supprimée' });
                }
                else {
                    res.status(404).json({ message: 'Information non trouvée' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la suppression de l’information' });
            }
        });
    }
}
exports.default = UserAndExpenseController;
