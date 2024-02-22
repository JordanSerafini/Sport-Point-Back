import { Request, Response } from 'express';
import InformationModel from '../models/informationsModel';

class UserAndExpenseController {

    // Récupérer toutes les informations
    public static async getAllInformations(req: Request, res: Response): Promise<void> {
        console.log("informations");

        try {
            const informations = await InformationModel.getAllInformations();
            res.status(200).json(informations);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des informations' });
        }
    }
    // Récupérer une information par ID
    public static async getInformationById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const information = await InformationModel.getInformationById(Number(id));
            if (information) {
                res.status(200).json(information);
            } else {
                res.status(404).json({ message: 'Information non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération de l’information' });
        }
    }
    // Ajouter une information
    public static async createInformation(req: Request, res: Response): Promise<void> {
        const { name, description, adresse, longitude, latitude, image, type, note, horaires, site, open } = req.body;
        try {
          const newInformation = await InformationModel.createInformation({
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
        } catch (error) {
          res.status(500).json({ error: 'Erreur lors de l’ajout de l’information' });
        }
      }
    // Modifier une information
    public static async updateInformation(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, description, adresse, longitude, latitude, image, type, note, horaires, site, open } = req.body;
        try {
            const updatedInformation = await InformationModel.updateInformation({
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
            } else {
                res.status(404).json({ message: 'Information non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la modification de l’information' });
        }
    }
    // Supprimer une information
    public static async deleteInformation(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deletedInformation = await InformationModel.deleteInformation(Number(id));
            if (deletedInformation) {
                res.status(200).json({ message: 'Information supprimée' });
            } else {
                res.status(404).json({ message: 'Information non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression de l’information' });
        }
    }

    
}

export default UserAndExpenseController;
