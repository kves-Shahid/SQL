import { pool } from '../config/db.js';

// Create a new course
export const createCourse = async (instructor_id, title, description, category, language, price, status = 'draft') => {
  const [result] = await pool.query(
    `INSERT INTO course (instructor_id, title, description, category, language, price, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
    [instructor_id, title, description, category, language, price, status]
  );
  return result.insertId; // return the inserted course ID
};

// Update an existing course
export const updateCourse = async (course_id, title, description, category, language, price, status) => {
  await pool.query(
    `UPDATE course
     SET title = ?, description = ?, category = ?, language = ?, price = ?, status = ?
     WHERE course_id = ?`,
    [title, description, category, language, price, status, course_id]
  );
};

// Delete a course
export const deleteCourse = async (course_id) => {
  await pool.query(
    `DELETE FROM course WHERE course_id = ?`,
    [course_id]
  );
};

// Fetch all courses (published)
export const fetchPublishedCourses = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM course WHERE status = "published"`
  );
  return rows;
};

// Fetch course by ID
export const fetchCourseById = async (course_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM course WHERE course_id = ?`,
    [course_id]
  );
  return rows[0] || null;
};

// Optional: fetch all courses (admin or instructor view)
export const getCourses = async () => {
  const [rows] = await pool.query(`SELECT * FROM course`);
  return rows;
};
