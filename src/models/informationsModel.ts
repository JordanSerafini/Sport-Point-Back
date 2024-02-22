import { pool } from '../database/pool';
import Model from './models';

class InformationModel extends Model{
  public id: number;
  public name: string;
  public description: string;
  public adresse: string;
  public longitude: number;
  public latitude: number;
  public image: string;
  public type: string;
  public note: number;
  public horaires: string;
  public site: string;
  public open: boolean;

  constructor(id: number, name: string, email: string, adresse: string, password: string, longitude: number, latitude: number, image: string, type: string, note: number, horaires: string, site: string, open: boolean) {
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
  public static async getAllInformations(): Promise<InformationModel[]> {
    const sql = 'SELECT * FROM "informations"';
    try {
      const result = await pool.query(sql);
      const informations: InformationModel[] = result.rows;
      return informations;
    } catch (error: unknown) { // Annoter l'erreur avec le type unknown
      if (error instanceof Error) {
        console.error('Erreur lors de la récupération des informations:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la récupération des informations');
      }
      throw error;
    }
  }
  // Méthode récupérer une information par son id
  public static async getInformationById(id: number): Promise<InformationModel> {
    const sql = 'SELECT * FROM "informations" WHERE id = $1';
    try {
      const result = await pool.query(sql, [id]);
      const information: InformationModel = result.rows[0];
      return information;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la récupération de l\'information:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la récupération de l\'information');
      }
      throw error;
    }
  }
  // Méthode créer une information
  public static async createInformation(information: InformationModel): Promise<InformationModel> {
    const sql = 'INSERT INTO "informations" (name, description, adresse, longitude, latitude, image, type, note, horaires, site, open) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
    try {
      const result = await pool.query(sql, [information.name, information.description, information.adresse, information.longitude, information.latitude, information.image, information.type, information.note, information.horaires, information.site, information.open]);
      const newInformation: InformationModel = result.rows[0];
      return newInformation;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la création de l\'information:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la création de l\'information');
      }
      throw error;
    }
  }
  // Méthode mettre à jour une information
  public static async updateInformation(information: InformationModel): Promise<InformationModel> {
    const sql = 'UPDATE "informations" SET name = $1, description = $2, adresse = $3, longitude = $4, latitude = $5, image = $6, type = $7, note = $8, horaires = $9, site = $10, open = $11 WHERE id = $12 RETURNING *';
    try {
      const result = await pool.query(sql, [information.name, information.description, information.adresse, information.longitude, information.latitude, information.image, information.type, information.note, information.horaires, information.site, information.open, information.id]);
      const updatedInformation: InformationModel = result.rows[0];
      return updatedInformation;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la mise à jour de l\'information:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la mise à jour de l\'information');
      }
      throw error;
    }
  }
  // Méthode supprimer une information
  public static async deleteInformation(id: number): Promise<InformationModel> {
    const sql = 'DELETE FROM "informations" WHERE id = $1 RETURNING *';
    try {
      const result = await pool.query(sql, [id]);
      const deletedInformation: InformationModel = result.rows[0];
      return deletedInformation;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la suppression de l\'information:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la suppression de l\'information');
      }
      throw error;
    }
  }
  

  
  
}

export default InformationModel;