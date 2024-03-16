import pool from "../db.js";

class Signature {
  static async findByUserId(userId) {
    const { rows } = await pool.query(
      "SELECT * FROM signatures WHERE user_id = $1",
      [userId]
    );
    return rows.length > 0 ? rows : null;
  }

  static async create(userId, contractId, signatureHash) {
    const { rows } = await pool.query(
      "INSERT INTO signatures (user_id, contract_id, signature_hash) VALUES ($1, $2, $3) RETURNING *",
      [userId, contractId, signatureHash]
    );
    return rows.length > 0 ? rows[0] : null;
  }
}

export default Signature;
