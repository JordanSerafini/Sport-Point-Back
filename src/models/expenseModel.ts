import { pool } from '../database/pool';
import Model from './models';

class ExpenseModel extends Model {
    name: string;
    amount: number;
    date: Date;
    comment: string;
    category: string;
    utilisateur_id: number;

    constructor(name: string, amount: number, date: Date, comment: string, category: string, utilisateur_id: number) {
        super();
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.comment = comment;
        this.category = category;
        this.utilisateur_id = utilisateur_id;
    }

    public static async insertExpense(name: string, amount: number, date: Date, comment: string, category: string, utilisateur_id: number): Promise<void> {
        const sql = 'INSERT INTO "expense" (name, amount, date, comment, category, utilisateur_id) VALUES ($1, $2, $3, $4, $5, $6)';
        try {
            await pool.query(sql, [name, amount, date, comment, category, utilisateur_id]);
            console.log('Dépense insérée avec succès.');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erreur lors de l\'insertion de la dépense:', error.message);
            } else {
                console.error('Une erreur inconnue est survenue lors de l\'insertion de la dépense');
            }
            throw error;
        }
    }

    public static async deleteExpenseById(id: number): Promise<void> {
        const sql = 'DELETE FROM "expense" WHERE id = $1';
        try {

            await pool.query(sql, [id]);
            console.log(`Dépense avec l'ID ${id} supprimée avec succès.`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Erreur lors de la suppression de la dépense avec l'ID ${id}:`, error.message);
            } else {
                console.error(`Une erreur inconnue est survenue lors de la suppression de la dépense avec l'ID ${id}`);
            }
            throw error;
        }
    }

    public static async getExpenseById(id: number): Promise<ExpenseModel | null> {
        const sql = 'SELECT * FROM "expense" WHERE id = $1';
        try {
            const result = await pool.query(sql, [id]);
            const expense: ExpenseModel | null = result.rows[0] || null;
            return expense;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erreur lors de la récupération de la dépense:', error.message);
            } else {
                console.error('Une erreur inconnue est survenue lors de la récupération de la dépense');
            }
            throw error;
        }
    }

    public static async getAllExpense(): Promise<ExpenseModel[]> {
        const sql = 'SELECT * FROM "expense"';
        try {
            const result = await pool.query(sql);
            const expenses: ExpenseModel[] = result.rows;
            return expenses;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erreur lors de la récupération des dépenses:', error.message);
            } else {
                console.error('Une erreur inconnue est survenue lors de la récupération des dépenses');
            }
            throw error;
        }
    }
    
}

export default ExpenseModel;
