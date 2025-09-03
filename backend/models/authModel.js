import { pool } from '../config/db.js';

// Check if student/instructor exists
export const checkUserExists = async (role, email) => {
  const table = role === 'student' ? 'student' : 'instructor';
  const [rows] = await pool.query(`SELECT 1 FROM ${table} WHERE email = ?`, [email]);
  return rows.length > 0;
};

// Check if admin exists
export const checkAdminExists = async (email) => {
  const [rows] = await pool.query(`SELECT 1 FROM admin WHERE email = ?`, [email]);
  return rows.length > 0;
};

// Register student or instructor
export const registerUser = async (role, user_name, password, email, phone_no, f_name, l_name) => {
  if (role === 'student') {
    await pool.query(
      `INSERT INTO student (user_name, password, email, phone_no, f_name, l_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_name, password, email, phone_no, f_name, l_name]
    );
  } else if (role === 'instructor') {
    const full_name = `${f_name} ${l_name}`;
    await pool.query(
      `INSERT INTO instructor (user_name, password, email, full_name)
       VALUES (?, ?, ?, ?)`,
      [user_name, password, email, full_name]
    );
  }
};

// Register admin
export const registerAdmin = async (user_name, password, email) => {
  await pool.query(
    `INSERT INTO admin (user_name, password, email)
     VALUES (?, ?, ?)`,
    [user_name, password, email]
  );
};

// Fetch student/instructor by email
export const fetchUserByEmail = async (role, email) => {
  const table = role === 'student' ? 'student' : 'instructor';
  const [rows] = await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email]);
  return rows[0] || null;
};

// Fetch admin by email
export const fetchAdminByEmail = async (email) => {
  const [rows] = await pool.query(`SELECT * FROM admin WHERE email = ?`, [email]);
  return rows[0] || null;
};
