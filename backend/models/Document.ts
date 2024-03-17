import pool from "../db.ts";

interface DocumentRow {
  document_id: string; // Adjust based on your actual column names and types
  user_id: string;
  document_text: string;
  signers: string; // Change the types according to your actual data structure
}

interface UserRow {
  user_id: string; // Add other user properties as required, matching your database
  // e.g., username: string;
}

class Document {
  static async findById(id: string): Promise<DocumentRow | null> {
    const { rows } = await pool.query(
      "SELECT * FROM documents WHERE document_id = $1",
      [id]
    );
    return rows.length > 0 ? (rows[0] as DocumentRow) : null;
  }

  static async create(
    userId: string,
    documentText: string,
    signers: string[]
  ): Promise<DocumentRow | null> {
    const { rows } = await pool.query(
      "INSERT INTO documents (user_id, document_text, signers) VALUES ($1, $2, $3) RETURNING *",
      [userId, documentText, signers]
    );
    return rows.length > 0 ? (rows[0] as DocumentRow) : null;
  }

  static async countSignatures(documentId: number): Promise<number> {
    const { rows } = await pool.query(
      "SELECT COUNT(DISTINCT user_id) FROM signatures WHERE document_id = $1",
      [documentId]
    );
    // Ensure the returned count is interpreted as a number
    return rows.length > 0 ? parseInt((rows[0] as any).count) : 0;
  }

  static async listSignatories(documentId: number): Promise<UserRow[]> {
    const { rows } = await pool.query(
      "SELECT u.* FROM users u INNER JOIN signatures s ON u.user_id = s.user_id WHERE s.document_id = $1",
      [documentId]
    );
    return rows as UserRow[];
  }
}

export default Document;
