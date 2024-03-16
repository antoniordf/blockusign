import pool from "../db.js";

class Contract {
  static async findById(id) {
    const { rows } = await pool.query(
      "SELECT * FROM contracts WHERE contract_id = $1",
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  static async create(userId, contractText) {
    const { rows } = await pool.query(
      "INSERT INTO contracts (user_id, contract_text) VALUES ($1, $2) RETURNING *",
      [userId, contractText]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  // Count how many unique users have signed the contract
  static async countSignatures(contractId) {
    const { rows } = await pool.query(
      "SELECT COUNT(DISTINCT user_id) FROM signatures WHERE contract_id = $1",
      [contractId]
    );
    return rows.length > 0 ? rows[0].count : 0; // Returns the count of unique signatories
  }

  // List all unique users who have signed the contract
  static async listSignatories(contractId) {
    const { rows } = await pool.query(
      "SELECT u.* FROM users u INNER JOIN signatures s ON u.user_id = s.user_id WHERE s.contract_id = $1",
      [contractId]
    );
    return rows; // Returns an array of user objects who have signed the contract
  }
}

export default Contract;
