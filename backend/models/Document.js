import pool from "../db.js";

class Document {
  static async findById(id) {
    const { rows } = await pool.query(
      "SELECT * FROM documents WHERE document_id = $1",
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  static async create(userId, documentText, signers) {
    const { rows } = await pool.query(
      "INSERT INTO documents (user_id, document_text, signers) VALUES ($1, $2, $3) RETURNING *",
      [userId, documentText, signers]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  // Count how many unique users have signed the contract
  static async countSignatures(documentId) {
    const { rows } = await pool.query(
      "SELECT COUNT(DISTINCT user_id) FROM signatures WHERE document_id = $1",
      [documentId]
    );
    return rows.length > 0 ? rows[0].count : 0; // Returns the count of unique signatories
  }

  // List all unique users who have signed the contract
  static async listSignatories(documentId) {
    const { rows } = await pool.query(
      "SELECT u.* FROM users u INNER JOIN signatures s ON u.user_id = s.user_id WHERE s.document_id = $1",
      [documentId]
    );
    return rows; // Returns an array of user objects who have signed the contract
  }
}

export default Document;
