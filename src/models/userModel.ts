import { pool } from '../database/pool';
import Model from './models';

class UserModel extends Model{
  public id: number;
  public name: string;
  public email: string;
  public password: Date;

  constructor(id: number, name: string, email: string, password: Date) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }


  // Méthode pour insérer un utilisateur
  public static async insertUser(name: string, email: string, password: string): Promise<void> {
    const sql = 'INSERT INTO "utilisateur" (name, email, password) VALUES ($1, $2, $3)';
    try {
      await pool.query(sql, [name, email, password]);
      console.log('Utilisateur inséré avec succès.');
    } catch (error: unknown) { // Annoter l'erreur avec le type unknown
      if (error instanceof Error) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de l\'insertion de l\'utilisateur');
      }
      throw error;
    }
  }

  // Méthode pour supprimer un utilisateur par son ID
  public static async deleteUserById(id: number): Promise<void> {
    const sql = 'DELETE FROM "utilisateur" WHERE id = $1';
    try {
      await pool.query(sql, [id]);
      console.log(`Utilisateur avec l'ID ${id} supprimé avec succès.`);
    } catch (error: unknown) { // Annoter l'erreur avec le type unknown
      if (error instanceof Error) {
        console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, error.message);
      } else {
        console.error(`Une erreur inconnue est survenue lors de la suppression de l'utilisateur avec l'ID ${id}`);
      }
      throw error;
    }
  }

  public static async getUserById(id: number): Promise<UserModel | null> {
    const sql = 'SELECT * FROM "utilisateur" WHERE id = $1';
    try {
      const result = await pool.query(sql, [id]);
      const user: UserModel | null = result.rows[0] || null;
      return user;
    } catch (error: unknown) { // Annoter l'erreur avec le type unknown
      if (error instanceof Error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la récupération de l\'utilisateur');
      }
      throw error;
    }
  }

  public static async getAllUsers(): Promise<UserModel[]> {
    const sql = 'SELECT * FROM "utilisateur"';
    try {
      const result = await pool.query(sql);
      const users: UserModel[] = result.rows;
      return users;
    } catch (error: unknown) { // Annoter l'erreur avec le type unknown
      if (error instanceof Error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la récupération des utilisateurs');
      }
      throw error;
    }
  }


  
  
}

export default UserModel;