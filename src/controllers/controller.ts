import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import ExpenseModel from '../models/expenseModel';

class UserAndExpenseController {
    // Ajouter un nouvel utilisateur
    public static async addUser(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;
        try {
            await UserModel.insertUser(name, email, password);
            res.status(201).json({ message: 'Utilisateur créé avec succès' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
        }
    }

    // Récupérer tous les utilisateurs
    public static async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        }
    }

    // Ajouter une nouvelle dépense
    public static async addExpense(req: Request, res: Response): Promise<void> {
        const { name, amount, date, comment, category, utilisateur_id } = req.body;
        try {
            await ExpenseModel.insertExpense(name, amount, date, comment, category, utilisateur_id);
            res.status(201).json({ message: 'Dépense ajoutée avec succès' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de l’ajout de la dépense' });
        }
    }

    // Supprimer une dépense par ID
    public static async deleteExpense(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await ExpenseModel.deleteExpenseById(Number(id));
            res.status(200).json({ message: 'Dépense supprimée avec succès' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression de la dépense' });
        }
    }

    // Récupérer une dépense par ID
    public static async getExpenseById(req: Request, res: Response): Promise<void> {
        try {
            const expense = await ExpenseModel.getExpenseById(Number());
            if (expense) {
                res.status(200).json(expense);
            } else {
                res.status(404).json({ message: 'Dépense non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération de la dépense' });
        }
    }

    // Récupérer toutes les dépenses
    public static async getAllExpense(req: Request, res: Response): Promise<void> {
        try {
            const expenses = await ExpenseModel.getAllExpense();
            res.status(200).json(expenses);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des dépenses' });
        }
    }
}

export default UserAndExpenseController;
