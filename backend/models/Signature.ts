import pool from "../db.ts";

interface SignatureRow {
  user_id: string;
  contract_id: string;
  signature_hash: string;
  // Add additional fields as needed, matching the structure of your 'signatures' table
}

class Signature {
  static async findByUserId(userId: string): Promise<SignatureRow[] | null> {
    const { rows } = await pool.query(
      "SELECT * FROM signatures WHERE user_id = $1",
      [userId]
    );
    return rows.length > 0 ? (rows as SignatureRow[]) : null;
  }

  static async create(
    userId: string,
    documentId: number,
    signatureHash: string
  ): Promise<SignatureRow | null> {
    const { rows } = await pool.query(
      "INSERT INTO signatures (user_id, document_id, signature_hash) VALUES ($1, $2, $3) RETURNING *",
      [userId, documentId, signatureHash]
    );
    return rows.length > 0 ? (rows[0] as SignatureRow) : null;
  }
}

export default Signature;
