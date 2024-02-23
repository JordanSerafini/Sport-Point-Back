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
const pool_1 = require("../database/pool");
const models_1 = __importDefault(require("./models"));
class InformationModel extends models_1.default {
    constructor(id, name, email, adresse, password, longitude, latitude, image, type, note, horaires, site, open) {
        super();
        this.id = id;
        this.name = name;
        this.description = email;
        this.adresse = adresse;
        this.longitude = longitude;
        this.latitude = latitude;
        this.image = image;
        this.type = type;
        this.note = note;
        this.horaires = horaires;
        this.site = site;
        this.open = open;
    }
    // Méthode récupérer toutes les informations
    static getAllInformations() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM "informations"';
            try {
                const result = yield pool_1.pool.query(sql);
                const informations = result.rows;
                return informations;
            }
            catch (error) { // Annoter l'erreur avec le type unknown
                if (error instanceof Error) {
                    console.error('Erreur lors de la récupération des informations:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la récupération des informations');
                }
                throw error;
            }
        });
    }
    // Méthode récupérer une information par son id
    static getInformationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM "informations" WHERE id = $1';
            try {
                const result = yield pool_1.pool.query(sql, [id]);
                const information = result.rows[0];
                return information;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Erreur lors de la récupération de l\'information:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la récupération de l\'information');
                }
                throw error;
            }
        });
    }
    // Méthode créer une information
    static createInformation(information) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO "informations" (name, description, adresse, longitude, latitude, image, type, note, horaires, site, open) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
            try {
                const result = yield pool_1.pool.query(sql, [information.name, information.description, information.adresse, information.longitude, information.latitude, information.image, information.type, information.note, information.horaires, information.site, information.open]);
                const newInformation = result.rows[0];
                return newInformation;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Erreur lors de la création de l\'information:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la création de l\'information');
                }
                throw error;
            }
        });
    }
    // Méthode mettre à jour une information
    static updateInformation(information) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'UPDATE "informations" SET name = $1, description = $2, adresse = $3, longitude = $4, latitude = $5, image = $6, type = $7, note = $8, horaires = $9, site = $10, open = $11 WHERE id = $12 RETURNING *';
            try {
                const result = yield pool_1.pool.query(sql, [information.name, information.description, information.adresse, information.longitude, information.latitude, information.image, information.type, information.note, information.horaires, information.site, information.open, information.id]);
                const updatedInformation = result.rows[0];
                return updatedInformation;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Erreur lors de la mise à jour de l\'information:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la mise à jour de l\'information');
                }
                throw error;
            }
        });
    }
    // Méthode supprimer une information
    static deleteInformation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM "informations" WHERE id = $1 RETURNING *';
            try {
                const result = yield pool_1.pool.query(sql, [id]);
                const deletedInformation = result.rows[0];
                return deletedInformation;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Erreur lors de la suppression de l\'information:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la suppression de l\'information');
                }
                throw error;
            }
        });
    }
}
exports.default = InformationModel;
