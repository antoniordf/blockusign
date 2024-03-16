import pool from "../db.js";

class User {
  static async findById(id) {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    return rows[0];
  }

  static async create(walletAddress) {
    const { rows } = await pool.query(
      "INSERT INTO users (wallet_address) VALUES ($1) RETURNING *",
      [walletAddress]
    );
    return rows[0];
  }

  // Add more methods as needed
}

export default User;
