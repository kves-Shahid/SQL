
import { pool } from '../config/db.js';

export const createReview = async (course_id, student_id, rating, comment) => {
  const [rows] = await pool.query(
    `INSERT INTO review (course_id, student_id, rating, comment, reviewed_at)
     VALUES (?, ?, ?, ?, NOW())`,
    [course_id, student_id, rating, comment]
  );
  return rows;
};

export const getReviewsForCourse = async (course_id) => {
  const [rows] = await pool.query(
    `SELECT r.*, s.f_name, s.l_name 
     FROM review r 
     JOIN student s ON r.student_id = s.student_id 
     WHERE r.course_id = ?`,
    [course_id]
  );
  return rows;
};
