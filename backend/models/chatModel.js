
import { pool } from '../config/db.js';

/*
  Insert a new chat message
  student_id can be null if the message is from instructor (optional)
 */
export const insertMessage = async (module_id, student_id, message) => {
  const [rows] = await pool.query(
    `INSERT INTO chat_message (module_id, student_id, message, created_at)
     VALUES (?, ?, ?, NOW())`,
    [module_id, student_id, message]
  );
  return rows;
};

/*
  Get all chat messages for a module
  Ordered by created_at
 */
export const getMessagesByModule = async (module_id) => {
  const [rows] = await pool.query(
    `SELECT cm.*, s.f_name AS student_fname, s.l_name AS student_lname
     FROM chat_message cm
     LEFT JOIN student s ON cm.student_id = s.student_id
     WHERE cm.module_id = ?
     ORDER BY cm.created_at`,
    [module_id]
  );
  return rows;
};
