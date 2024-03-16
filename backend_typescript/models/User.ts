import pool from "../db.ts";

interface UserRow {
  user_id: string; // Adjust according to your table, ensure the type is correct
  wallet_address: string; // Similarly, adjust per your database schema
  // Add additional properties as needed
}

class User {
  static async findById(id: string): Promise<UserRow | undefined> {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    return rows.length > 0 ? (rows[0] as UserRow) : undefined;
  }

  static async create(walletAddress: string): Promise<UserRow> {
    const { rows } = await pool.query(
      "INSERT INTO users (wallet_address) VALUES ($1) RETURNING *",
      [walletAddress]
    );
    return rows[0] as UserRow; // Assumes there will always be a row returned
  }

  // Add more methods as needed
}

export default User;
