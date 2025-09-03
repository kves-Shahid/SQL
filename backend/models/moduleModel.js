import { pool } from '../config/db.js';

export const createModule = async (course_id, title, description, position) => {
  const [result] = await pool.query(
    `INSERT INTO module (course_id, title, description, position, created_at)
     VALUES (?, ?, ?, ?, NOW())`,
    [course_id, title, description, position]
  );
  return result.insertId;
};

export const getModulesByCourse = async (course_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM module WHERE course_id = ? ORDER BY position',
    [course_id]
  );
  return rows;
};
